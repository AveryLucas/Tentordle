import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import hints from "../../helpers/hints";

import {
  submitInput,
  addToInput,
  backspace,
  updateHints,
} from "../../reducers/wordleSlice";

const Keyboard = () => {
  const dispatch = useDispatch();

  const { pastGuesses, wordles, selected } = useSelector(
    (state) => state.wordle,
  );

  const renderLetter = (letter) => {
    const hints = wordles[selected].hints;
    const hintsForLetter = hints.filter((hint) => hint.letter == letter);

    const classes = classNames({
      "keyboard-letter": 1,
      [(hintsForLetter[0] || [{}]).type]: 1,
      wide: ["Enter", "Back"].indexOf(letter) !== -1,
    });

    const onClick = () => {
      switch (letter) {
        case "Enter":
          dispatch(submitInput());
          dispatch(updateHints());
          break;
        case "Back":
          dispatch(backspace());
          break;
        default:
          dispatch(addToInput(letter));
      }
    };

    return (
      <button onClick={onClick} className={classes} key={uuidv4()}>
        <div className="letter">{letter}</div>
      </button>
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
