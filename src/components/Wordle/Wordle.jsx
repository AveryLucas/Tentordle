import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";

const Wordle = ({ index, fullsized = true }) => {
  const { wordles, input } = useSelector((state) => state.wordle);

  const letterOrBright = (letter = "", hints = []) => {
    const classes = classNames((hints[0] || {}).type, {
      tile: fullsized,
      "wordle-brights-container": !fullsized,
    });

    const childClasses = classNames({
      letter: fullsized,
      "wordle-brights": !fullsized,
    });

    return (
      <div className={classes}>
        <div className={childClasses}>{letter}</div>
      </div>
    );
  };

  const renderAllColumns = () => {
    const { hints, word } = wordles[index];
    return word.split("").map((letter, letterIndex) => {
      const hintsAtPos = hints.filter((hint) => hint.position == letterIndex);
      return (
        <div className="wordle-col" key={`w_c_${letterIndex}`}>
          <div className="hints">
            {hintsAtPos.map((hint) => {
              if (letterIndex == hint.position)
                return (
                  <span key={uuidv4()} className={hint.type}>
                    {hint.letter}
                  </span>
                );
            })}
          </div>
          {letterOrBright(input[letterIndex], hintsAtPos)}
        </div>
      );
    });
  };

  const classes = classNames({ "mini-wordle": !fullsized, wordle: fullsized });

  return (
    <div className={classes}>
      {[wordles[index]].map((wordle, wordleIndex) => {
        return (
          <div className="wordle-container" key={`w_i_${wordleIndex}`}>
            <p className="wordle-title">{index + 1}</p>
            <div className="wordle-hints-container">{renderAllColumns()}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Wordle;
