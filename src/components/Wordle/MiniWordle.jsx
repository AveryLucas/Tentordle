import React from "react";
import HintHelper from "../../helpers/hints";

class MiniWordle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doop: 0,
      height: undefined,
      opacity: 1,
      errorFix: 0,
    };
    this.ref = undefined;
  }

  componentDidMount() {
    this.setState({
      height: this.ref.offsetHeight,
    });
  }

  renderColumn(hints = []) {
    hints = hints.length == 0 ? ["N/A"] : hints;
    let type = "";
    return (
      <div className="wordle-col">
        {hints.map((hint) => {
          if (hint == "N/A") return <span style={{ opacity: 0 }}>:]</span>;
          type = hint.type;
          return <span className={hint.type}>{hint.letter}</span>;
        })}
        <div className={`wordle-brights ${type}`}>
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
        this.renderColumn(hints.filter((hint) => hint.at_pos == index)),
      );
  };

  range = (num) => this.randomInbetween(-num, num);

  randomInbetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  render() {
    return (
      <div
        className="mini-wordle"
        ref={(c) => (this.ref = c)}
        style={{
          height: `${this.state.height}px` || "auto",
          margin: this.state.height == 0 ? this.state.height : undefined,
        }}
      >
        <div
          className="wordle-container"
          style={{ opacity: this.state.opacity }}
        >
          <p className="wordle-title">{this.props.index + 1}</p>
          <div className="wordle-hints-container">
            {this.renderAllColumns()}
          </div>
        </div>
      </div>
    );
  }
}

export default MiniWordle;
