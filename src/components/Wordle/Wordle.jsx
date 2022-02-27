import React from "react";
import WordleRow from "./WordleRow";
import { v4 as uuidv4 } from "uuid";

class Wordle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { wordle_active: true };
  }

  componentDidMount() {}

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
    const { prev_attempts, show_on_screen, correct_word } = this.props;
    if (this.state.wordle_active) {
      // Correct Word Guessed
      if (prev_attempts[prev_attempts.length - 1] === correct_word) {
        return true;
      }
      // Ran out of attempts
      // if (prev_attempts.length === show_on_screen) {
      //   return true;
      // }
    }
    return false;
  }

  renderRemainingAttempts() {
    const { prev_attempts, cur_attempt, show_on_screen, correct_word } =
      this.props;
    if (show_on_screen - (prev_attempts.length + 1) >= 0) {
      return [...new Array(show_on_screen - prev_attempts.length).fill("")].map(
        (empty, index) => {
          if (index === 0 && !this.isGameOver()) {
            return (
              <WordleRow
                word={cur_attempt}
                correct_word={correct_word}
                is_locked={false}
                key={uuidv4()}
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
                  key={uuidv4()}
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
    const { prev_attempts, correct_word, show_on_screen, cur_attempt } =
      this.props;
    // console.log(prev_attempts);
    return (
      <div className="wordle">
        {prev_attempts.map((attempt) => {
          return (
            <WordleRow
              word={attempt}
              correct_word={correct_word}
              is_locked={true}
              key={uuidv4()}
            />
          );
        })}
        {this.renderRemainingAttempts()}
      </div>
    );
  }
}

export default Wordle;
