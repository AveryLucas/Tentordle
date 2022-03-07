import React from "react";
import dictionary from "../words.json";
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
      selected: 0,
      words: new Array(10).fill(null).map((word) => this.getRandomWord()),
      solved: []
    };
  }

  onKeyPress = (ev) => {
    const { input, past_guesses, selected } = this.state;

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
        past_guesses: [
          ...past_guesses,
          input === ""
            ? dictionary[
                Math.floor(Math.random() * dictionary.length)
              ].toUpperCase()
            : input
        ],
        input: ""
      });
    }

    if ("1234567890".indexOf(ev.key) != -1) {
      this.setState({ selected: Number(ev.key) });
    }

    if (ev.key === "ArrowDown") {
      this.setState({ selected: this.clamp(selected + 1, 0, 9) });
    }
    if (ev.key === "ArrowUp") {
      this.setState({ selected: this.clamp(selected - 1, 0, 9) });
    }
  };

  onWheel = (ev) => {
    this.setState({
      selected: this.clamp(this.state.selected + Math.sign(ev.deltaY), 0, 9)
    });
  };

  getRandomWord = () =>
    dictionary[Math.floor(Math.random() * dictionary.length)].toUpperCase();

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyPress);
    document.addEventListener("wheel", this.onWheel);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPress);
    document.removeEventListener("wheel", this.onWheel);
  }

  removeWordleIndex = (arg_word) => {
    const { solved, words } = this.state;
    const index = words.indexOf(arg_word);
    if (index !== -1) {
      this.setState({
        solved: Array.from(new Set([...solved, words[index].toUpperCase()])),
        words: words.filter((word) => word !== arg_word)
      });
    }
  };

  clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  getStyles() {
    const wordle =
      document.querySelectorAll(".mini-wordle")[this.state.selected || 0];

    try {
      return {
        top: wordle.offsetTop,
        left: wordle.offsetLeft,
        height: `${wordle.offsetHeight}px`,
        width: `${wordle.offsetWidth}px`
      };
    } catch (err) {
      return {};
    }
  }

  render() {
    return (
      <div id="game">
        <div className="highlight" style={this.getStyles()}></div>
        <div className="wordle-group">
          {this.state.words.map((word, i) => {
            return (
              <MiniWordle
                index={i}
                key={Math.floor(Math.random() * 99999999)}
                past_guesses={this.state.past_guesses}
                correct_word={word}
                removeWordleIndex={this.removeWordleIndex}
              />
            );
          })}
        </div>
        <div id="input-history">
          {this.state.past_guesses
            .reverse()
            .slice(0, 8)
            .map((guess, index) => (
              <div
                className="prev-input"
                style={{ opacity: (100 - (90 / 7) * index) / 100 }}
              >
                {guess}
              </div>
            ))}
        </div>
        <div id="selected">
          <Wordle
            input={this.state.input}
            past_guesses={this.state.past_guesses}
            correct_word={this.state.words[this.state.selected]}
          />
          <Keyboard
            past_guesses={this.state.past_guesses}
            correct_word={this.state.words[0]}
          />
        </div>
      </div>
    );
  }
}

export default Game;
