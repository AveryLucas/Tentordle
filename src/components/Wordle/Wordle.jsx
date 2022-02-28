import React from "react";
import WordleRow from "./WordleRow";
import { v4 as uuidv4 } from "uuid";

class Wordle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { wordle_active: true, hints: [] };
  }

  componentDidMount() {
    // console.log([[...this.props.past_guesses]].shift());
    this.setState({
      hints: this.getAllHints(
        this.props.past_guesses,
        this.props.correct_word,
        [...this.state.hints].reverse()
      )
    });
  }

  componentWillUnmount() {}

  componentDidUpdate(prevProps, prevState) {}

  shouldComponentUpdate(prevProps) {
    // Deny updates if this wordle is solved...
    return !this.props.past_guesses.includes(this.props.correct_word);
  }

  isGameOver() {
    const { past_guesses, show_on_screen, correct_word } = this.props;
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
      });
    }
  }

  findRepeatingLetters(word) {
    // Code ripped from Pratap Sharma on stackoverflow
    let letters = word.split("");
    let letterMap = {};

    for (let i = 0; i < letters.length; i++) {
      let currentLetterCount = letterMap[letters[i]];
      let count = currentLetterCount ? currentLetterCount : 0;
      letterMap[letters[i]] = count + 1;
    }
    return letterMap;
  }

  getAllIndexes(arr, val) {
    var indexes = [];
    for (let i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
    return indexes;
  }

  getAllHints(guesses, word, prev_hints = []) {
    let output = [...prev_hints];
    guesses.forEach((guess) => {
      word.split("").map((letter, index) => {
        output = this.getHintsAtPos([guess], word, index, output);
      });
    });
    return output;
  }

  getHintsAtPos(guesses, word, at_pos, prev_hints = []) {
    let output = [...prev_hints];

    const isHintThere = (letter, at_pos, type, hints) => {
      let temp = hints || output;
      if (letter) temp = temp.filter((hint) => hint.letter === letter);
      if (at_pos) temp = temp.filter((hint) => hint.at_pos === at_pos);
      if (type) temp = temp.filter((hint) => hint.type === type);
      return temp.length;
    };

    // Are there guesses with the right letter in position?
    if (guesses.findIndex((guess) => guess[at_pos] === word[at_pos]) !== -1) {
      // Check if this hint is already there first
      if (!isHintThere(word[at_pos], at_pos, "correct")) {
        output = output.filter((hint) => {
          // return isHintThere(word[at_pos], at_pos, "correct");
          return (
            (hint.letter !== word[at_pos] && hint.at_pos !== at_pos) ||
            hint.type === "correct"
          );
        });
        output.push({ letter: word[at_pos], at_pos, type: "correct" });
      }
    }
    // Are there guesses with the right letter in wrong position?
    else {
      guesses
        .filter((guess) => word.indexOf(guess[at_pos]) !== -1)
        .forEach((guess) => {
          console.log(
            guess[at_pos],
            isHintThere(guess[at_pos], undefined, "correct"),
            this.findRepeatingLetters(word)[word[at_pos]]
          );
          if (
            !isHintThere(guess[at_pos], at_pos, "misplaced") &&
            isHintThere(guess[at_pos], undefined, "correct") !==
              this.findRepeatingLetters(word)[guess[at_pos]]
          ) {
            output.push({ letter: guess[at_pos], at_pos, type: "misplaced" });
          }
        });
    }

    return output;
  }

  renderPositionalHints() {
    const { past_guesses, correct_word, show_on_screen, cur_attempt } =
      this.props;

    let hints = this.state.hints;
    // For each letter check if a past guess has a letter in that spot
    return correct_word.split("").map((letter, index) => {
      try {
        let at_index = hints.filter((hint) => hint.at_pos === index);
        return (
          <div>
            {at_index.map((hint) => {
              return <span className={hint.type}>{hint.letter}</span>;
            })}
          </div>
        );
      } catch (err) {
        return (
          <div>
            <span style={{ opacity: 0 }}>0</span>
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
    const { past_guesses, correct_word, show_on_screen, cur_attempt } =
      this.props;
    // this.getAllHints(past_guesses, correct_word);
    // console.log(correct_word);
    return (
      <div className="wordle">
        <div className="row-hints">{this.renderPositionalHints()}</div>
        {this.getDisplayGuesses().map((attempt) => {
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
