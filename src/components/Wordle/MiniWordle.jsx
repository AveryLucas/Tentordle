import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import HintHelper from "../../helpers/hints";

const MiniWordle = ({ index }) => {
  const { pastGuesses, wordles } = useSelector((state) => state.wordle);

  const renderColumn = (hints = []) => {
    hints = hints.length == 0 ? ["N/A"] : hints;
    let type = "";
    return (
      <div className="wordle-col" key={uuidv4()}>
        <div className="hints">
          {hints.map((hint) => {
            if (hint != "N/A") {
              type = hint.type;
              return (
                <span className={hint.type} key={uuidv4()}>
                  {hint.letter}
                </span>
              );
            } else
              return (
                <span key={uuidv4()} style={{ opacity: 0 }}>
                  0
                </span>
              );
          })}
        </div>
        <div className={`wordle-brights ${type}`}>
          <div />
        </div>
      </div>
    );
  };

  const renderAllColumns = () => {
    const correctWord = wordles[index];
    const hints = HintHelper.getAllHints(pastGuesses, correctWord);

    return correctWord
      .split("")
      .map((letter, index) =>
        renderColumn(hints.filter((hint) => hint.at_pos == index)),
      );
  };

  return (
    <div
      className="mini-wordle"
      style={{ background: index % 2 !== 0 ? "#F2F4FF" : ":D" }}
    >
      <div className="wordle-container">
        <p className="wordle-title">{index + 1}</p>
        <div className="wordle-hints-container">{renderAllColumns()}</div>
      </div>
    </div>
  );
};

export default MiniWordle;
