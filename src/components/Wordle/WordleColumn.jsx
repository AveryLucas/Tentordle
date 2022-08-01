import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { connect, useSelector, useDispatch } from "react-redux";
import { deepEqual } from "fast-equals";

class WordleColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hintsOnDisplay: [], animationStage: -1, newWord: false };
    this.update = false;
    this.timeSinceLastUpdate = undefined;
    this.stopAnimationStageUpdates = false;
    this.previousHints = [];
    this.word = "";
  }

  updateHints = () => {
    this.update = false;
    const { wordle, wordleIndex, letterIndex, fullsized } = this.props;
    const hints = wordle.wordles[wordleIndex].hints;
    const hintsAtPos = hints.filter(
      (hint) => hint.position == letterIndex && hint.type !== "incorrect",
    );
    const correct = hintsAtPos.filter((hint) => hint.type == "correct");

    if (this.stopAnimationStageUpdates) return;

    // if (!fullsized && correct.length !== 0) {
    //   this.setState({ hintsOnDisplay: correct, animationStage: 3 });
    // } else {
    if (hintsAtPos.length == 0 || deepEqual(hintsAtPos, this.previousHints)) {
      this.setState({ hintsOnDisplay: hintsAtPos, animationStage: 1 });
    } else {
      this.setState({ hintsOnDisplay: hintsAtPos, animationStage: 0 });
    }
    // }
  };

  componentDidMount = () => {
    if (this.props.wordle.wordles[this.props.wordleIndex]) {
      this.word = this.props.wordle.wordles[this.props.wordleIndex].word;
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.wordleIndex == -1) return;

    const { wordle, wordleIndex, letterIndex, fullsized } = this.props;
    const hints = wordle.wordles[wordleIndex].hints;
    const hintsAtPos = hints.filter((hint) => hint.position == letterIndex);

    if (this.word !== this.props.wordle.wordles[this.props.wordleIndex].word) {
      this.stopAnimationStageUpdates = false;
      this.word = this.props.wordle.wordles[this.props.wordleIndex].word;
      this.setState({ animationStage: -1, hintsOnDisplay: hintsAtPos });
      this.updateHints();
    }

    const [compareA, compareB] = [
      prevProps.wordle.pastGuesses,
      this.props.wordle.pastGuesses,
    ];

    if (compareA.length != compareB.length) {
      this.previousHints = hintsAtPos;
      this.update = true;
    }

    clearTimeout(this.timeSinceLastUpdate);
    this.timeSinceLastUpdate = undefined;
    this.timeSinceLastUpdate = setTimeout(() => {
      if (this.update) this.updateHints();
    }, 10);
  };

  onAnimationEnd = () => {
    switch (this.state.animationStage) {
      case 0:
      case 1:
        this.setState({ animationStage: -1 });
        break;
      case 3:
        this.stopAnimationStageUpdates = true;
        break;
    }
  };

  renderLetterOrBright = (letter = "", hints = []) => {
    const { fullsized } = this.props;

    const classes = classNames((hints[0] || {}).type, {
      tile: fullsized,
      "wordle-brights-container": !fullsized,
    });
    const childClasses = classNames({
      letter: fullsized,
      "wordle-brights": !fullsized,
    });
    return (
      <div className={classes}>
        <div className={childClasses}>{letter}</div>
      </div>
    );
  };

  render() {
    const { hintsOnDisplay, animationStage } = this.state;
    const { letterIndex, wordleIndex } = this.props;
    const { input, wordles } = this.props.wordle;

    // console.log(wordles[wordleIndex]);

    const classes = classNames("wordle-col", (hintsOnDisplay[0] || {}).type);

    return (
      <div
        className={classes}
        animation-stage={animationStage}
        onAnimationEnd={this.onAnimationEnd}
      >
        <div className="hints">
          {hintsOnDisplay.map((hint, hintIndex) => {
            if (letterIndex == hint.position) {
              return (
                <span className={hint.type} key={`hint-index-${hintIndex}`}>
                  {hint.letter}
                </span>
              );
            }
          })}
        </div>
        {this.renderLetterOrBright(input[letterIndex], hintsOnDisplay)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wordle: state.wordle,
});

export default connect(mapStateToProps)(WordleColumn);
