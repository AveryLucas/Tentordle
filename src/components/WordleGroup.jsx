import React from "react";
import Wordle from "./Wordle";

class WordleGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guess: "",
      past_guesses: [
        "DENSE",
        "LIGHT",
        "MOUNT",
        "BRITT",
        "BRITT",
        // "BRITT",
        // "BRITT",
        "BRITT",
        "FRUIT"
      ],
      word_length: 5,
      max_guesses: 10,
      doop: 1
    };
  }

  onKeyPress = (ev) => {
    const { guess, word_length, past_guesses } = this.state;

    if (
      ev.key.match(/^[A-Za-z]+$/) &&
      guess.length < word_length &&
      ev.key.length == 1
    ) {
      this.setState({ guess: this.state.guess + ev.key.toUpperCase() });
    }
    if (ev.key == "Backspace") {
      this.setState({ guess: this.state.guess.substring(0, guess.length - 1) });
    }
    if (ev.key == "Enter") {
      this.setState({ past_guesses: [...past_guesses, guess], guess: "" });
    }
    if (ev.key == "/") {
      this.setState({ doop: this.state.doop + 1 });
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPress);
  }

  render() {
    const { past_guesses, guess, max_guesses } = this.state;
    return (
      <div id="wordle-group">
        {/* <p>{guess}</p> */}
        <Wordle
          key={this.state.doop}
          prev_attempts={past_guesses}
          cur_attempt={guess}
          max_attempts={max_guesses}
        />
      </div>
    );
  }
}

export default WordleGroup;
