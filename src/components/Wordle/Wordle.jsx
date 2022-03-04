import React from "react";
import { v4 as uuidv4 } from "uuid";
import HintHelper from "../../helpers/hints";

class SelectedWordle extends React.Component {
  constructor(props) {
    super(props);
  }

  renderColumn(letter = "", hints = []) {
    return (
      <div key={uuidv4()} className="wordle-col">
        <div className="hints">
          {hints.map((hint) => {
            return <span className={hint.type}>{hint.letter}</span>;
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
    const hints = HintHelper.getAllHints(past_guesses, correct_word);
    return correct_word.split("").map((letter, index) =>
      this.renderColumn(
        this.props.input[index],
        hints.filter((hint) => hint.at_pos == index)
      )
    );
  };

  render() {
    return (
      <div className={`wordle ${this.props.mini ? "mini" : ""}`}>
        <div className="wordle-container">
          <div className="wordle-hints-container">
            {this.renderAllColumns()}
          </div>
        </div>
      </div>
    );
  }
}

export default SelectedWordle;
