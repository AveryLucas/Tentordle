import React from "react";
import { v4 as uuidv4 } from "uuid";

class WordleHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  doop(word, correct_word) {
    return word.split("").map((letter, index) => {
      // console.log(correct_word, letter, index, correct_word[index] == letter);
      if (correct_word[index] == letter) {
        return { letter, className: "correct" };
      } else if (correct_word.split("").indexOf(letter) != -1) {
        return { letter, className: "misplaced" };
      } else {
        return { letter, className: "incorrect" };
      }
    });
  }

  render() {
    const { history, closest_wordle, words, correct_word } = this.props;
    // console.log(words[closest_wordle]);
    // let closest = closest_wordle == undefined ? 0 : closest_wordle;
    // console.log(this.props.closest_wordle);
    return (
      <div id="wordle-header">
        <div id="wordle-history">
          {history.reverse().map((guess) => {
            return (
              <div>
                {this.doop(guess, words[closest_wordle]).map((tile) => {
                  return (
                    <span className={`letter ${tile.className}`}>
                      {tile.letter.toUpperCase()}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div id="wordle-title">
          <h1>Tentordle</h1>
          <p id="remaining-guesses">
            you've got <span>{this.props.remaining_guesses}</span> guesses
          </p>
        </div>
      </div>
    );
  }
}

export default WordleHeader;
