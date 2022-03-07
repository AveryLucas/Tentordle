import React from "react";
import HintHelper from "../../helpers/hints";

class MiniWordle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doop: 0,
      height: undefined,
      opacity: 1,
      errorFix: 0
    };
    this.ref = undefined;
  }

  componentDidMount() {
    this.setState({
      height: this.ref.offsetHeight
    });
  }

  renderColumn(hints = []) {
    hints = hints.length == 0 ? ["N/A"] : hints;
    return (
      <div className="wordle-col">
        <div className={`hints`}>
          {hints.map((hint) => {
            if (hint == "N/A") return <span style={{ opacity: 0 }}>:]</span>;
            else return <span className={hint.type}>{hint.letter}</span>;
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

  setDoop(doop) {
    this.setState({ doop });
  }

  render() {
    return (
      <div
        className="mini-wordle"
        ref={(c) => (this.ref = c)}
        style={{
          height: `${this.state.height}px` || "auto",
          margin: this.state.height == 0 ? this.state.height : undefined
        }}
        onClick={() => {
          this.setDoop(1);
        }}
        // onClick={() => this.props.removeWordleIndex(this.props.correct_word)}
        onAnimationEnd={() => {
          if (this.state.errorFix == 0) {
            this.setState({ errorFix: 1, doop: 0, opacity: 0 });
            setTimeout(() => {
              this.setState({ height: 0 });
            }, 500);
            setTimeout(() => {
              this.props.removeWordleIndex(this.props.correct_word);
            }, 1100);
          }
        }}
        doop={this.state.doop}
      >
        <div
          className="wordle-container"
          style={{ opacity: this.state.opacity }}
        >
          <p className="wordle-title">{this.props.index}</p>
          <div className="wordle-hints-container">
            {this.renderAllColumns()}
          </div>
        </div>
        <div className="highlight"></div>
      </div>
    );
  }
}

export default MiniWordle;
