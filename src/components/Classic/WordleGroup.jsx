import React from "react";
import Wordle from "./Wordle";
import words from "../../words.json";
import { v4 as uuidv4 } from "uuid";

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
    return (
      <div id="wordle-group">
        {new Array(num_of_wordles).fill("").map((val, index) => {
          return (
            <Wordle
              key={uuidv4()}
              cur_attempt={input || ""}
              past_guesses={past_guesses || []}
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
