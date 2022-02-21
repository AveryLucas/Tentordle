import React from "react";
import "../css/wordle.css";

class Wordle extends React.Component {
  constructor(props) {
    super(props);

    this.state = { correct_word: "TACIT", wordle_active: true };
  }

  componentDidMount() {
    // this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
  }

  componentDidUpdate(oldProps) {
    const { prev_attempts, max_attempts } = this.props;
    const { correct_word } = this.state;

    // Disable Wordle if...
    // Guessed Correct Word
    if (prev_attempts[prev_attempts.length - 1] == correct_word) {
      this.setState({ wordle_active: false });
    }
    // Ran out of attempts
    if (prev_attempts.length == max_attempts) {
      this.setState({ wordle_active: false });
    }
  }

  shouldComponentUpdate(oldProps) {
    return this.state.wordle_active;
  }

  renderTile(index, letter, is_locked) {
    const { correct_word, wordle_active } = this.state;
    // const word = this.state.word;

    function getClassName() {
      // console.log(letter);

      if (is_locked) {
        if (correct_word[index] == letter) {
          return "correct";
        } else if (correct_word.indexOf(letter) != -1) {
          return "misplaced";
        } else {
          return "incorrect";
        }
      } else {
        return "blank";
      }
    }

    return (
      <div className={`tile ${getClassName()}`}>
        <span className="letter">{letter}</span>
      </div>
    );
  }

  renderRow = (word, is_locked) => {
    if (word.length != 5) word += " ".repeat(5 - word.length);
    return (
      <div className="row">
        {word
          .split("")
          .map((letter, index) => this.renderTile(index, letter, is_locked))}
      </div>
    );
  };

  renderCurrentAttempt() {
    const { correct_word, wordle_active } = this.state;
    const { prev_attempts, cur_attempt, max_attempts } = this.props;
    if (
      prev_attempts[prev_attempts.length - 1] != correct_word &&
      wordle_active
    ) {
      return this.renderRow(cur_attempt, false);
    }
  }

  renderRemainingAttempts() {
    const { correct_word, wordle_active } = this.state;
    const { prev_attempts, cur_attempt, max_attempts } = this.props;
    // console.log(max_attempts - (prev_attempts.length + 1));
    if (max_attempts - (prev_attempts.length + 1) >= 0) {
      return [
        ...new Array(max_attempts - (prev_attempts.length + 1)).fill("")
      ].map((val, index) => {
        return this.renderRow("", false);
      });
    }
  }

  render() {
    const { prev_attempts, cur_attempt, max_attempts } = this.props;

    return (
      <div className="wordle">
        {prev_attempts.map((attempt) => {
          return this.renderRow(attempt, true);
        })}
        {this.renderCurrentAttempt()}
        {this.renderRemainingAttempts()}
      </div>
    );
  }
}

export default Wordle;
