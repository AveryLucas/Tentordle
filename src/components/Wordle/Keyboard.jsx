import React from "react";
import { v4 as uuidv4 } from "uuid";
// import "../css/wordle.css";
// import WordleRow from "./WordleRow";

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidUpdate(prevProps, prevState) {}

  doop(letter, correct_word) {
    const { words, closest_wordle, past_guesses } = this.props;
    correct_word = words[closest_wordle];
    // Find a guess where the chosen letter is in the right spot
    if (
      past_guesses.findIndex(
        (guess) =>
          guess.indexOf(letter) !== -1 &&
          guess.indexOf(letter) === correct_word.indexOf(letter)
      ) !== -1
    ) {
      return { letter, className: "correct" };
    } else if (
      past_guesses.findIndex(
        (guess) =>
          guess.indexOf(letter) !== -1 && correct_word.indexOf(letter) !== -1
      ) != -1
    ) {
      console.log(correct_word, correct_word.split("").indexOf(letter), letter);
      return { letter, className: "misplaced" };
    } else if (
      past_guesses.findIndex(
        (guess) =>
          guess.indexOf(letter) !== -1 && correct_word.indexOf(letter) === -1
      ) !== -1 &&
      letter.length === 1
    ) {
      return { letter, className: "incorrect" };
    }
    return { letter, className: "" };
  }

  renderLetter(text, is_wide = false, onClick) {
    let key = this.doop(text);
    return (
      <span
        className={`keyboard-letter ${is_wide ? "wide" : ""} ${key.className}`}
        key={uuidv4()}
      >
        <div className="letter">{key.letter}</div>
      </span>
    );
  }

  renderKeyboard() {
    const rows = ["QWERTYUIOP", "ASDFGHJKL", "1ZXCVBNM2"];
    return rows.map((row, index) => {
      return (
        <div>
          {row.split("").map((letter) => {
            if (letter == "1") return this.renderLetter("Enter", true);
            if (letter == "2") return this.renderLetter("Back", true);
            return this.renderLetter(letter);
          })}
        </div>
      );
    });
  }

  render() {
    const { prev_attempts, correct_word, max_attempts, cur_attempt } =
      this.props;
    return (
      <div id="keyboard" key={uuidv4()}>
        {this.renderKeyboard()}
      </div>
    );
  }
}

export default Keyboard;
