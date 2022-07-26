import React from "react";
import { v4 as uuidv4 } from "uuid";
import HintHelper from "../../helpers/hints";

class Wordle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wobble: 0,
    };
  }

  renderColumn(letter = "", hints = []) {
    hints = hints.length == 0 ? ["N/A"] : hints;
    return (
      <div key={uuidv4()} className="wordle-col">
        <div className="hints">
          {hints.map((hint) => {
            if (hint == "N/A") return <span style={{ opacity: 0 }}>:]</span>;
            else return <span className={hint.type}>{hint.letter}</span>;
          })}
        </div>
        <div className={`tile ${letter != "" ? "occupied" : ""}`}>
          <span className={`letter`}>{letter}</span>
        </div>
      </div>
    );
  }

  renderAllColumns = () => {
    const { past_guesses, correct_word } = this.props;
    const hints = HintHelper.getAllHints(past_guesses, correct_word || ".....");
    return (correct_word || ".....").split("").map((letter, index) => {
      const currentLetter = this.props.input[index] || "";
      const hintsAtPos = hints.filter((hint) => hint.at_pos == index);

      return (
        <div key={`wordle_col_${index}`} className="wordle-col">
          <div className="hints">
            {hintsAtPos.map((hint, index) => {
              if (hint !== "N/A")
                return (
                  <span key={`hint_letter_${index}`} className={hint.type}>
                    {hint.letter}
                  </span>
                );
            })}
          </div>
          <div className={`tile ${currentLetter != "" ? "occupied" : ""}`}>
            <span className={`letter`}>{currentLetter}</span>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div
        className={`wordle`}
        onClick={() => this.setWobble(1)}
        onAnimationEnd={() => this.setWobble(0)}
        wobble={this.state.wobble}
      >
        <div className="doop">
          <div></div>
        </div>
        <div className="wordle-container">
          <div className="wordle-hints-container">
            {this.renderAllColumns()}
          </div>
        </div>
        <div className="doop">
          <div></div>
        </div>
      </div>
    );
  }
}

export default Wordle;
