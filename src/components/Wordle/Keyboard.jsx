import React from "react";
import { v4 as uuidv4 } from "uuid";

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
  }

  renderLetter(text, is_wide = false, isIncorrect = false) {
    const classNames = [
      "keyboard-letter",
      is_wide ? "wide" : "",
      isIncorrect ? "incorrect" : "",
    ]
      .join(" ")
      .trim();

    return (
      <span className={classNames} key={uuidv4()}>
        <div className="letter">{text}</div>
      </span>
    );
  }

  ezClassNames(...args) {
    let output = [];
    args.forEach((className) => {
      if (typeof className == "string") output.push(className);
      else if (Array.isArray(className)) {
        if (className[1]) output.push(className[0]);
      }
    });

    return output.join(" ").trim();
  }

  renderKeyboard() {
    const rows = ["QWERTYUIOP", "ASDFGHJKL", "1ZXCVBNM2"];

    const getHintType = (target, index) => {
      const pastGuessLetters = getPastGuessLetters().filter(
        ({ letter }) => letter == target,
      );
      if (pastGuessLetters.length === 0) return false;

      // Check if letter was guessed correctly and in the right spot
      if (
        pastGuessLetters.filter(({ letter, index }) => {
          const index2 = this.props.correct_word.indexOf(target);
          return index2 !== -1 && index == index2;
        }).length
      ) {
        return "correct";
      }
      // Check if letter was guessed but was put in the wrong spot
      if (
        pastGuessLetters.filter(
          ({ letter }) => this.props.correct_word.indexOf(target) !== -1,
        ).length
      ) {
        return "misplaced";
      }
      // Check if letter is simply incorrect
      if (
        pastGuessLetters.filter(
          ({ letter }) => this.props.correct_word.indexOf(target) === -1,
        ).length
      ) {
        return "incorrect";
      }
      return "";
    };

    const getPastGuessLetters = () =>
      Array.from(
        new Set(
          this.props.past_guesses
            .map((guess) =>
              guess.split("").map((letter, index) => ({ letter, index })),
            )
            .flat(),
        ),
      );

    return rows.map((row, index) => {
      return (
        <div key={uuidv4()}>
          {row.split("").map((letter) => {
            if (letter == "1") return this.renderLetter("Enter", true);
            if (letter == "2") return this.renderLetter("Back", true);

            const classNames = this.ezClassNames(
              "keyboard-letter",
              ["wide", letter == "1"],
              getHintType(letter, index),
            );

            return (
              <span className={classNames} key={uuidv4()}>
                <div className="letter">{letter}</div>
              </span>
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
