import React from "react";
import words from "../words.json";
import "../css/wordle.min.css";
import MiniWordle from "./Wordle/MiniWordle";
import Wordle from "./Wordle/Wordle";
import Keyboard from "./Wordle/Keyboard";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      past_guesses: [this.getRandomWord()],
      words: new Array(10).fill(null).map((word) => this.getRandomWord())
    };
  }

  onKeyPress = (ev) => {
    const { input, word_length, past_guesses, remaining_guesses } = this.state;

    if (
      ev.key.match(/^[A-Za-z]+$/) &&
      input.length < 5 &&
      ev.key.length === 1
    ) {
      this.setState({ input: this.state.input + ev.key.toUpperCase() });
    }
    if (ev.key === "Backspace") {
      this.setState({
        input: this.state.input.substring(0, input.length - 1)
      });
    }
    if (ev.key === "Enter") {
      this.setState({
        // past_guesses: [...past_guesses, input],
        past_guesses: [
          ...past_guesses,
          input === ""
            ? words[Math.floor(Math.random() * words.length)].toUpperCase()
            : input
        ],
        input: ""
      });
    }
  };

  getRandomWord = () =>
    words[Math.floor(Math.random() * words.length)].toUpperCase();

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPress);
  }

  render() {
    return (
      <div id="game">
        <div className="wordle-group">
          {new Array(10).fill("").map((val, i) => {
            return (
              <MiniWordle
                index={i}
                renderBackdrop={i == 0}
                past_guesses={this.state.past_guesses}
                correct_word={this.state.words[i]}
              />
            );
          })}
          {/* <Wordle /> */}
        </div>
        <div id="selected">
          <Wordle
            input={this.state.input}
            past_guesses={this.state.past_guesses}
            correct_word={this.state.words[0]}
          />
          <Keyboard />
        </div>
      </div>
    );
  }
}

export default Game;
