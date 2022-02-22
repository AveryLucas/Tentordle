import React from "react";
import { v4 as uuidv4 } from "uuid";
import "../css/wordle.css";

class WordleRow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidUpdate(prevProps, prevState) {}

  shouldComponentUpdate(prevProps) {
    // Deny updates if this wordle is solved...
    return !this.props.is_locked;
  }

  renderTile(index, letter) {
    const { correct_word, is_locked } = this.props;
    // console.log(is_locked)
    function getClassName() {
      if (!is_locked) {
        return "blank";
      } else {
        return "finished";
      }
      //   if (correct_word[index] === letter) {
      //     return "correct";
      //   } else if (correct_word.indexOf(letter) !== -1) {
      //     return "misplaced";
      //   } else {
      //     return "incorrect";
      //   }
      // } else if (is_locked) {
      // } else {
    }

    return (
      <div key={uuidv4()} className={`tile ${getClassName()}`}>
        {letter}
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
