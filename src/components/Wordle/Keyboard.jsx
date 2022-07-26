import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import hints from "../../helpers/hints";

const Keyboard = () => {
  const { pastGuesses, wordles, selected } = useSelector(
    (state) => state.wordle,
  );

  const renderLetter = (letter) => {
    const { incorrect, misplaced, correct } = hints.getHintTypes(
      pastGuesses,
      wordles[selected],
      letter,
    );

    const classes = classNames("keyboard-letter", {
      wide: ["Enter", "Back"].indexOf(letter) !== -1,
      incorrect,
      misplaced,
      correct,
    });

    return (
      <span className={classes} key={uuidv4()}>
        <div className="letter">{letter}</div>
      </span>
    );
  };

  const renderKeyboard = () => {
    const rows = ["QWERTYUIOP", "ASDFGHJKL", "1ZXCVBNM2"];

    return rows.map((row, index) => {
      return (
        <div key={uuidv4()}>
          {row.split("").map((letter) => {
            if (letter == "1") return renderLetter("Enter");
            if (letter == "2") return renderLetter("Back");
            return renderLetter(letter);
          })}
        </div>
      );
    });
  };

  return (
    <div id="keyboard" key={uuidv4()}>
      {renderKeyboard()}
    </div>
  );
};

export default Keyboard;
