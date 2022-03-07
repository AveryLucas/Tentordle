import React from "react";
import { v4 as uuidv4 } from "uuid";

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
  }

  renderLetter(text, is_wide = false, isIncorrect = false) {
    return (
      <span
        className={`keyboard-letter ${is_wide ? "wide" : ""} ${
          isIncorrect ? "incorrect" : ""
        }`}
        key={uuidv4()}
      >
        <div className="letter">{text}</div>
      </span>
    );
  }

  renderKeyboard() {
    const isIncorrect = Array.from(
      new Set(
        this.props.past_guesses
          .map((guess) =>
            guess
              .split("")
              .filter(
                (letter) => this.props.correct_word || "".indexOf(letter) === -1
              )
          )
          .flat()
      )
    );
    const rows = ["QWERTYUIOP", "ASDFGHJKL", "1ZXCVBNM2"];
    return rows.map((row, index) => {
      return (
        <div>
          {row.split("").map((letter) => {
            if (letter == "1") return this.renderLetter("Enter", true);
            if (letter == "2") return this.renderLetter("Back", true);
            return this.renderLetter(
              letter,
              false,
              isIncorrect.indexOf(letter) !== -1
            );
          })}
        </div>
      );
    });
  }

  render() {
    return (
      <div id="keyboard" key={uuidv4()}>
        {this.renderKeyboard()}
      </div>
    );
  }
}

export default Keyboard;
