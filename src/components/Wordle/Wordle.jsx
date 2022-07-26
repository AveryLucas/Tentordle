import React from "react";
import { useSelector } from "react-redux";
import HintHelper from "../../helpers/hints";

const Wordle = () => {
  const { pastGuesses, wordles, selected, input } = useSelector(
    (state) => state.wordle,
  );

  const renderAllColumns = () => {
    const hints = HintHelper.getAllHints(pastGuesses, wordles[selected]);

    return wordles[selected].split("").map((letter, index) => {
      const currentLetter = input[index] || "";
      const hintsAtPos = hints.filter((hint) => hint.at_pos == index);

      return (
        <div key={`wordle_col_${index}`} className="wordle-col">
          <div className="hints">
            {hintsAtPos.map((hint, index) => {
              if (hint !== "N/A")
                return (
                  <span key={`hint_letter_${index}`} className={hint.type}>
                    {hint.letter}
                  </span>
                );
            })}
          </div>
          <div className={`tile ${currentLetter != "" ? "occupied" : ""}`}>
            <span className={`letter`}>{currentLetter}</span>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={`wordle`}>
      {/* <div className="doop">
        <div />
      </div> */}
      <div className="wordle-container">
        <div className="wordle-hints-container">{renderAllColumns()}</div>
      </div>
      {/* <div className="doop">
        <div />
      </div> */}
    </div>
  );
};

export default Wordle;
