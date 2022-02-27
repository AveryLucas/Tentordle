import React from "react";
import Wordle from "./Wordle";
import words from "../../words.json";
// import animateScrollTo from "animated-scroll-to";
// import { useStoreState, useStoreActions } from "easy-peasy";
// import { observer } from "mobx-react-lite";
// import { makeObservable, observable, computed, action, flow } from "mobx";
// import { observer } from "mobx-react-lite";
// import scroll from "scroll";
// import page from "scroll-doc";
// var page = require('scroll-doc')()

class WordleGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correct_words:
        this.props.words ||
        new Array(this.props.ammount || 1)
          .fill("")
          .map(
            (word) =>
              words[Math.floor(Math.random() * this.props.word_length || 5)]
          )
    };
  }

  render() {
    const { past_guesses, input, num_of_wordles } = this.props;
    console.log(past_guesses);
    return (
      <div id="wordle-group">
        {new Array(num_of_wordles).fill("").map((val, index) => {
          return (
            <Wordle
              cur_attempt={input || ""}
              prev_attempts={past_guesses || []}
              show_on_screen={8}
              render_remaining_attempts={true}
              correct_word={this.state.correct_words[index].toUpperCase()}
            />
          );
        })}
      </div>
    );
  }
}

export default WordleGroup;
