import React from "react";
import { v4 as uuidv4 } from "uuid";
import "../css/wordle.css";
import WordleRow from "./WordleRow";

class Wordle extends React.Component {
  constructor(props) {
    super(props);

    this.state = { wordle_active: true };
  }

  componentDidMount() {
    console.log(this.props.correct_word);
  }

  componentWillUnmount() {}

  componentDidUpdate(prevProps, prevState) {
    if (this.isGameOver()) {
      this.setState({ wordle_active: false });
    }
  }

  shouldComponentUpdate(prevProps) {
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

  renderRemainingAttempts() {
    const { prev_attempts, cur_attempt, max_attempts, correct_word } =
      this.props;
    if (max_attempts - (prev_attempts.length + 1) >= 0) {
      return [...new Array(max_attempts - prev_attempts.length).fill("")].map(
        (empty, index) => {
          if (index === 0 && !this.isGameOver()) {
            return (
              <WordleRow
                word={cur_attempt}
                correct_word={correct_word}
                is_locked={false}
              />
            );
            // return this.renderRow(cur_attempt, false);
          } else {
            if (this.props.render_remaining_attempts != false) {
              return (
                <WordleRow
                  word={""}
                  correct_word={correct_word}
                  is_locked={true}
                  // active={wordle_active}
                />
              );
            }
          }
        }
      );
    }
  }

  render() {
    const { prev_attempts, correct_word, max_attempts, cur_attempt } =
      this.props;
    return (
      <div className="wordle">
        {prev_attempts.map((attempt) => {
          return (
            <WordleRow
              word={attempt}
              correct_word={correct_word}
              is_locked={true}
            />
          );
          // return this.renderRow(attempt, true);
        })}
        {this.renderRemainingAttempts()}
      </div>
    );
  }
}

export default Wordle;
