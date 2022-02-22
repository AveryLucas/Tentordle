import React from "react";
import Wordle from "./Wordle";
import words from "../words.json";

class WordleGroup extends React.Component {
  constructor(props) {
    super(props);
    const num_of_wordles = 10;
    this.state = {
      guess: "",
      past_guesses: [],
      word_length: 5,
      max_guesses: 22,
      num_of_wordles,
      finished: 0,
      references: [],
      correct_words: new Array(num_of_wordles)
        .fill("")
        .map((word) => words[Math.floor(Math.random() * words.length)])
    };
  }

  onKeyPress = (ev) => {
    const { guess, word_length, past_guesses } = this.state;
    this.setState({ doop: Math.random() * 1000000 });

    if (
      ev.key.match(/^[A-Za-z]+$/) &&
      guess.length < word_length &&
      ev.key.length === 1
    ) {
      this.setState({ guess: this.state.guess + ev.key.toUpperCase() });
    }
    if (ev.key === "Backspace") {
      this.setState({ guess: this.state.guess.substring(0, guess.length - 1) });
    }
    if (ev.key === "Enter") {
      this.setState({ past_guesses: [...past_guesses, guess], guess: "" });
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPress);
  }

  render() {
    const { past_guesses, guess, max_guesses, num_of_wordles } = this.state;

    return (
      <div id="wordle-group">
        {new Array(num_of_wordles).fill("").map((val, index) => {
          // console.log(words[Math.floor(Math.random() * words.length)]);
          return (
            <Wordle
              cur_attempt={guess}
              prev_attempts={past_guesses}
              max_attempts={max_guesses}
              render_remaining_attempts={false}
              correct_word={this.state.correct_words[index].toUpperCase()}
            />
          );
        })}
      </div>
    );
  }
}

export default WordleGroup;
