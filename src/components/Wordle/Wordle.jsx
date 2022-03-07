import React from "react";
import { v4 as uuidv4 } from "uuid";
import HintHelper from "../../helpers/hints";
import anime from "animejs";

class Wordle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wobble: 0
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
    return (correct_word || ".....").split("").map((letter, index) =>
      this.renderColumn(
        this.props.input[index],
        hints.filter((hint) => hint.at_pos == index)
      )
    );
  };

  setWobble(wobble) {
    this.setState({ wobble });
  }

  render() {
    return (
      <div
        className={`wordle`}
        onClick={() => this.setWobble(1)}
        onAnimationEnd={() => this.setWobble(0)}
        wobble={this.state.wobble}
      >
        <div className="wordle-container">
          <div className="wordle-hints-container">
            {this.renderAllColumns()}
          </div>
        </div>
        <div className="doop"></div>
        <div className="doop t2"></div>
      </div>
    );
  }
}

export default Wordle;
