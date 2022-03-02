import React from "react";
import WordleRow from "./WordleRow";
import { v4 as uuidv4 } from "uuid";
import hints from "../../helpers/hints.js";

class Wordle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { wordle_active: true, hints: [], last: "" };
  }

  // I know this is bad but the alternative isn't yet clear to me yet. Maybe moving hint logic to WordleGroup file?
  // I'll think about it after I finish the zoomout overlay component
  componentDidMount() {
    this.setState({
      hints: hints.getAllHints(
        this.props.past_guesses,
        this.props.correct_word,
        this.state.hints
      )
    });
  }

  // Deny updates if this wordle is solved...
  shouldComponentUpdate(prevProps) {
    return !this.props.past_guesses.includes(this.props.correct_word);
  }

  isGameOver() {
    const { past_guesses, correct_word } = this.props;
    if (this.state.wordle_active) {
      if (past_guesses[past_guesses.length - 1] === correct_word) {
        return true;
      }
    }
    return false;
  }

  renderRemainingAttempts() {
    const { cur_attempt, show_on_screen, correct_word } = this.props;
    if (show_on_screen - (this.getDisplayGuesses().length + 1) >= 0) {
      return [
        ...new Array(show_on_screen - this.getDisplayGuesses().length).fill("")
      ].map((empty, index) => {
        if (index === 0 && !this.isGameOver()) {
          return (
            <WordleRow
              word={cur_attempt}
              correct_word={correct_word}
              is_locked={false}
              key={uuidv4()}
            />
          );
        } else {
          if (this.props.render_remaining_attempts != false) {
            return (
              <WordleRow
                word={""}
                correct_word={correct_word}
                is_locked={true}
                key={uuidv4()}
              />
            );
          }
        }
      });
    }
  }

  renderPositionalHints() {
    // For each letter check if a past guess has a letter in that spot
    return this.props.correct_word.split("").map((letter, index) => {
      try {
        let at_index = this.state.hints.filter((hint) => hint.at_pos === index);
        if (at_index.length > 0) {
          return (
            <div>
              {at_index.map((hint) => {
                return <span className={hint.type}>{hint.letter}</span>;
              })}
            </div>
          );
        } else {
          return (
            <div>
              <span style={{ opacity: 0 }}>:)</span>
            </div>
          );
        }
      } catch (err) {
        return (
          <div>
            <span style={{ color: "red" }}>ERR</span>
          </div>
        );
      }
    });
  }

  getDisplayGuesses = () =>
    this.props.past_guesses.slice(
      this.props.past_guesses.length -
        Math.min(this.props.past_guesses.length, 8)
    );

  render() {
    return (
      <div className="wordle">
        <div className="row-hints">{this.renderPositionalHints()}</div>
        {this.getDisplayGuesses().map((attempt) => {
          return (
            <WordleRow
              word={attempt}
              correct_word={this.props.correct_word}
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
