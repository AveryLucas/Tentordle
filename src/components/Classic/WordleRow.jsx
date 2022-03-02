import React from "react";
import { v4 as uuidv4 } from "uuid";
// import "../css/wordle.css";

class WordleRow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidUpdate(prevProps, prevState) {}

  shouldComponentUpdate(prevProps) {
    // console.log(prevProps);
    // Deny updates if this wordle is solved...
    return !this.props.is_locked || this.props.word != prevProps.word;
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
    let word = this.props.word || "";
    if (word.length !== 5) word += " ".repeat(5 - word.length);
    return (
      <div className="row">
        {this.doop(word, this.props.correct_word).map((tile) => {
          return (
            <div key={uuidv4()} className={`tile ${tile.className}`}>
              <span className="letter">{tile.letter}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default WordleRow;
