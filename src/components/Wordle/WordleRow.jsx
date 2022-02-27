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

  renderTile(index, letter) {
    const { correct_word, is_locked } = this.props;

    function getClassName() {
      if (!is_locked) {
        if (letter.trim() != "") {
          return "occupied";
        } else {
          return "empty";
        }
      } else {
        // console.log()
        if (letter.trim() != "") {
          if (correct_word[index] == letter) {
            return "correct";
          } else if (correct_word.split("").indexOf(letter) != -1) {
            return "misplaced";
          } else {
            return "incorrect";
          }
        } else {
          return "empty";
        }
      }
    }

    return (
      <div key={uuidv4()} className={`tile ${getClassName()}`}>
        <span className="letter">{letter}</span>
      </div>
    );
  }

  render() {
    let word = this.props.word || "";
    if (word.length !== 5) word += " ".repeat(5 - word.length);
    return (
      <div className="row">
        {word.split("").map((letter, index) => this.renderTile(index, letter))}
      </div>
    );
  }
}

export default WordleRow;
