import React from "react";
import { v4 as uuidv4 } from "uuid";

class WordleHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  doop(word, correct_word) {
    const is_locked = this.props.is_locked;
    return word.split("").map((letter, index) => {
      if (!is_locked) {
        if (letter.trim() != "") {
          return { letter, className: "occupied" };
        } else {
          return { letter, className: "empty" };
        }
      } else {
        // This is a catch for wordle rows past the current guessing row early game
        if (word.trim() == "") {
          return { letter, className: "empty" };
        } else if (correct_word[index] == letter) {
          return { letter, className: "correct" };
        } else if (correct_word.split("").indexOf(letter) != -1) {
          return { letter, className: "misplaced" };
        } else {
          return { letter, className: "incorrect" };
        }
      }
    });
  }

  render() {
    const { history, closest_wordle } = this.props;
    // console.log(closest_wordle);
    return (
      <div id="wordle-header">
        <div id="wordle-history">
          {history.reverse().map((guess) => {
            return <div key={uuidv4()}>{guess}</div>;
          })}
        </div>
        <div id="wordle-title">
          <h1>Tentordle</h1>
          <p id="remaining-guesses">
            you've got <span>{this.props.remaining_guesses}</span> guesses
          </p>
        </div>
      </div>
    );
  }
}

export default WordleHeader;
