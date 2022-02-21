import React from "react";
import { v4 as uuidv4 } from "uuid";
import "../css/wordle.css";

class Wordle extends React.Component {
  constructor(props) {
    super(props);

    this.state = { wordle_active: true };
  }

  componentDidMount() {
    console.log(this.props.correct_word);
  }

  componentWillUnmount() {}

  componentDidUpdate(oldProps) {
    if (this.isGameOver()) {
      this.setState({ wordle_active: false });
    }
  }

  shouldComponentUpdate(oldProps) {
    // Deny updates if this wordle is solved...
    return !this.props.prev_attempts.includes(this.props.correct_word);
  }

  isGameOver() {
    const { prev_attempts, max_attempts, correct_word } = this.props;
    if (this.state.wordle_active) {
      // Correct Word Guessed
      if (prev_attempts[prev_attempts.length - 1] === correct_word) {
        return true;
      }
      // Ran out of attempts
      if (prev_attempts.length === max_attempts) {
        return true;
      }
    }
    return false;
  }

  renderTile(index, letter, is_locked) {
    const { wordle_active } = this.state;
    const { correct_word } = this.props;

    function getClassName() {
      if (is_locked) {
        if (correct_word[index] === letter) {
          return "correct";
        } else if (correct_word.indexOf(letter) !== -1) {
          return "misplaced";
        } else {
          return "incorrect";
        }
      } else if (!wordle_active) {
        return "finished";
      } else {
        return "blank";
      }
    }

    return (
      <div key={uuidv4()} className={`tile ${getClassName()}`}>
        <span className="letter">{letter}</span>
      </div>
    );
  }

  renderRow = (word, is_locked) => {
    if (word.length !== 5) word += " ".repeat(5 - word.length);
    return (
      <div key={uuidv4()} className="row">
        {word
          .split("")
          .map((letter, index) => this.renderTile(index, letter, is_locked))}
      </div>
    );
  };

  renderRemainingAttempts() {
    const { prev_attempts, cur_attempt, max_attempts } = this.props;
    if (max_attempts - (prev_attempts.length + 1) >= 0) {
      return [...new Array(max_attempts - prev_attempts.length).fill("")].map(
        (empty, index) => {
          if (index === 0 && !this.isGameOver()) {
            return this.renderRow(cur_attempt, false);
          } else {
            if (this.props.render_remaining_attempts != false) {
              return this.renderRow("", false);
            }
          }
        }
      );
    }
  }

  render() {
    const { prev_attempts, correct_word, max_attempts } = this.props;
    return (
      <div className="wordle">
        {prev_attempts.map((attempt) => {
          return this.renderRow(attempt, true);
        })}
        {this.renderRemainingAttempts()}
      </div>
    );
  }
}

export default Wordle;
