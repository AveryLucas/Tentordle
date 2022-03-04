import React from "react";
import HintHelper from "../../helpers/hints";

class MiniWordle extends React.Component {
  constructor(props) {
    super(props);
  }

  renderColumn(hints = []) {
    return (
      <div className="wordle-col">
        <div className="hints">
          {hints.map((hint) => {
            return <span className={hint.type}>{hint.letter}</span>;
          })}
        </div>
        <div className={`wordle-brights`}>
          <div />
        </div>
      </div>
    );
  }

  renderAllColumns = () => {
    const { past_guesses, correct_word } = this.props;
    const hints = HintHelper.getAllHints(past_guesses, correct_word);
    return correct_word
      .split("")
      .map((letter, index) =>
        this.renderColumn(hints.filter((hint) => hint.at_pos == index))
      );
  };

  range = (num) => this.randomInbetween(-num, num);

  randomInbetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  render() {
    return (
      <div className="mini-wordle">
        <div className="wordle-container">
          <p className="wordle-title">{this.props.index}</p>
          <div className="wordle-hints-container">
            {this.renderAllColumns()}
          </div>
        </div>
        <div
          className="highlight"
          style={{ display: this.props.renderBackdrop ? "block" : "none" }}
        />
      </div>
    );
  }
}

export default MiniWordle;
