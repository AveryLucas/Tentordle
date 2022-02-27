import React from "react";
import WordleGroup from "./Wordle/WordleGroup";
import WordleHeader from "./Wordle/WordleHeader";
import Keyboard from "./Wordle/Keyboard";
import animateScrollTo from "animated-scroll-to";
import words from "../words.json";
import "../css/wordle.css";
// import WordleHistory from "./Wordle/WordleHistory";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      past_guesses: ["ROUND"],
      word_length: 5,
      remaining_guesses: 22,
      num_of_wordles: 10,
      words: new Array(10).fill(null).map((word) => this.getRandomWord()),
      closest_wordle: 0
    };
    this.scrollCooldown = undefined;
  }

  onKeyPress = (ev) => {
    console.log(ev.key);
    const { input, word_length, past_guesses, remaining_guesses } = this.state;

    if (
      ev.key.match(/^[A-Za-z]+$/) &&
      input.length < word_length &&
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
          words[Math.floor(Math.random() * words.length)].toUpperCase()
        ],
        input: "",
        remaining_guesses: remaining_guesses - 1
      });
    }
    if (ev.key == "ArrowLeft") {
      this.scrollToNextWordle(-1, 0);
    }
    if (ev.key == "ArrowRight") {
      this.scrollToNextWordle(1, 0);
    }
    if ("1234567890".indexOf(ev.key) != -1) {
      this.scrollToWordle(ev.key);
    }
  };

  getWordlePositions = () => {
    // Get difference between two numbers
    var difference = (a, b) => b - a;

    // Return list of wordles with relevant numbers
    return Array.from(document.querySelectorAll(".wordle")).map((el, i) => {
      const offset = el.offsetLeft + el.offsetWidth / 2;
      const scrollTo = offset - window.innerWidth / 2;
      return {
        offset,
        scrollTo,
        diff: difference(window.scrollX, scrollTo),
        word: this.state.words[i],
        index: i,
        element: el
      };
    });
  };

  // Get wordles sorted by distance to center of screen.
  getSortedWordlePositions = () => {
    // Get and sort wordles by distance from current scroll position
    return this.getWordlePositions().sort(
      (a, b) => Math.abs(a.diff) - Math.abs(b.diff)
    );
  };

  scrollToNearestWordle = () => {
    const sortedWordles = this.getSortedWordlePositions();
    // Of the sorted wordles, move to the closest one.
    animateScrollTo([sortedWordles[0].scrollTo, 0], {
      elementToScroll: window,
      cancelOnUserAction: false
    });
  };

  scrollToNextWordle = (dir = 0, speed = 500) => {
    const sortedWordles = this.getSortedWordlePositions();
    // Of the sorted wordles, get the next closest one in our direction.
    const closest_wordle = sortedWordles.find(
      (position) => Math.sign(Math.floor(position.diff)) == dir
    );

    // If there is a wordle in our chosen direction, move to it.
    if (closest_wordle) {
      // Don't do anything if we're already there...
      if (closest_wordle.diff !== 0) {
        animateScrollTo([closest_wordle.scrollTo, 0], {
          elementToScroll: window,
          cancelOnUserAction: false,
          speed,
          minDuration: 0
        });
      }
    }
  };

  scrollToWordle = (num = 1) => {
    const wordles = this.getWordlePositions();

    // Hacky way to make 0 == 10 and 1 == 0
    num = num - 1;
    num = num == -1 ? 9 : num;

    try {
      animateScrollTo([wordles[num].scrollTo, 0], {
        elementToScroll: window,
        cancelOnUserAction: false,
        speed: 0,
        minDuration: 0
      });
      // window.scrollTo([wordles[num].scrollTo, null]);
    } catch (err) {
      console.log(err);
    }
  };

  onWheel = (ev) => {
    // ev.preventDefault();
    animateScrollTo([window.scrollX + ev.deltaY * 3, 0], {
      elementToScroll: window,
      cancelOnUserAction: false
    });
  };

  onScroll = (ev) => {
    this.startScrollTimer();
    const closest_wordle = this.getSortedWordlePositions()[0].index;
    if (closest_wordle != this.state.closest_wordle) {
      this.setState({ closest_wordle });
    }
  };

  startScrollTimer() {
    this.stopScrollTimer();
    this.scrollCooldown = setTimeout(() => {
      this.scrollToNearestWordle();
      console.log("ad");
    }, 500);
  }

  stopScrollTimer() {
    if (this.scrollCooldown != undefined) {
      clearTimeout(this.scrollCooldown);
      this.scrollCooldown = undefined;
    }
  }

  getRandomWord = () =>
    words[Math.floor(Math.random() * words.length)].toUpperCase();

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyPress);
    document.addEventListener("wheel", this.onWheel);
    document.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPress);
    document.removeEventListener("wheel", this.onWheel);
    document.removeEventListener("scroll", this.onScroll);
  }

  render() {
    const { past_guesses, input, remaining_guesses, num_of_wordles, words } =
      this.state;
    // console.log(past_guesses.slice(past_guesses.length - 2))
    return (
      <div id="game">
        <WordleGroup
          num_of_wordles={num_of_wordles}
          past_guesses={past_guesses.slice(
            past_guesses.length - Math.min(past_guesses.length, 7)
          )}
          input={input}
          words={words}
        />
        <WordleHeader
          remaining_guesses={remaining_guesses}
          closest_wordle={this.state.closest_wordle}
          history={past_guesses}
          words={words}
        />
        <Keyboard
          closest_wordle={this.state.closest_wordle}
          past_guesses={past_guesses}
          words={words}
        />
      </div>
    );
  }
}

export default Game;
