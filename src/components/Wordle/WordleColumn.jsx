import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { deepEqual } from "fast-equals";
import anime from "animejs";

class WordleColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hintsOnDisplay: [], animationStage: -1, newWord: false };
    this.timeSinceLastUpdate = undefined;
    this.update = false;
  }

  componentDidUpdate = (prevProps, prevState) => {
    const [compareA, compareB] = [
      prevProps.wordle.pastGuesses,
      this.props.wordle.pastGuesses,
    ];

    if (compareA.length != compareB.length) this.update = true;

    clearTimeout(this.timeSinceLastUpdate);

    this.timeSinceLastUpdate = undefined;
    this.timeSinceLastUpdate = setTimeout(() => {
      if (this.update) {
        const { wordle, wordleIndex, letterIndex, fullsized } = this.props;
        const hints = wordle.wordles[wordleIndex].hints;
        const hintsAtPos = hints.filter((hint) => hint.position == letterIndex);
        // this.setState({ hintsOnDisplay: hintsAtPos });
        setTimeout(() => {
          const correct = hintsAtPos.filter((hint) => hint.type == "correct");
          if (correct.length !== 0) {
            this.setState({ hintsOnDisplay: correct, animationStage: 1 });
          } else {
            this.setState({ hintsOnDisplay: hintsAtPos, animationStage: 0 });
          }
        }, 1000 * letterIndex);
        this.update = false;
      }
    }, 10);
  };

  onAnimationEnd = () => {
    if (this.state.animationStage === 0) this.setState({ animationStage: -1 });
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

// const WordleColumn = ({ wordleIndex, letterIndex, fullsized }) => {
//   // const { wordles, input, pastGuesses } = useSelector((state) => state.wordle);
//   // const hints = wordles[wordleIndex].hints;
//   // const hintsAtPos = hints.filter((hint) => hint.position == letterIndex);
//   // const classes = classNames("wordle-col", (hintsAtPos[0] || {}).type);
//   const classes = classNames("wordle-col");
//   const [hintsOnDisplay, setHintsOnDisplay] = useState([]);

//   console.log("1");

//   const letterOrBright = (letter = "", hints = []) => {
//     const classes = classNames((hints[0] || {}).type, {
//       tile: fullsized,
//       "wordle-brights-container": !fullsized,
//     });

//     const childClasses = classNames({
//       letter: fullsized,
//       "wordle-brights": !fullsized,
//     });

//     return (
//       <div className={classes}>
//         <div className={childClasses}>{letter}</div>
//       </div>
//     );
//   };

//   return (
//     <div className={classes}>
//       <div className="hints">
//         {hintsOnDisplay.map((hint, hintIndex) => {
//           if (letterIndex == hint.position) {
//             return (
//               <span className={hint.type} key={`hint-index-${hintIndex}`}>
//                 {hint.letter}
//               </span>
//             );
//           }
//         })}
//       </div>
//       {letterOrBright(".", [])}
//       {/* {letterOrBright(input[letterIndex], hintsOnDisplay)} */}
//     </div>
//   );
// };

// export default WordleColumn;
