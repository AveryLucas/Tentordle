import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";

import {
  setSelected,
  moveWordleQueueToIndex,
} from "../../reducers/wordleSlice";
import WordleColumn from "./WordleColumn";

const Wordle = ({ index, renderWordleQueue = false, fullsized = true }) => {
  const [lastWord, setLastWord] = useState("");
  const [animationStage, setAnimationStage] = useState(-1);
  const dispatch = useDispatch();
  const { wordles, pastGuesses, solved } = useSelector((state) => state.wordle);

  if (
    lastWord !== [...pastGuesses].reverse()[0] &&
    Object.keys(solved).length <= 5
  ) {
    setLastWord([...pastGuesses].reverse()[0]);
  }

  if (
    lastWord === wordles[index].word &&
    animationStage === -1 &&
    Object.keys(solved).length <= 5
  ) {
    setAnimationStage(0);
  }

  const onAnimationEnd = (event) => {
    if (event.animationName == "condenseWord") {
      setAnimationStage(1);
    }
    if (event.animationName == "translateXToZero") {
      dispatch(moveWordleQueueToIndex(index));
      setAnimationStage(-1);
    }
  };

  const renderAllColumns = (updateHints) => {
    return wordles[index].word.split("").map((letter, letterIndex) => {
      return (
        <WordleColumn
          key={`w_c_${letterIndex}_hint`}
          fullsized={fullsized}
          wordleIndex={updateHints ? index : -1}
          letterIndex={letterIndex}
        />
      );
    });
  };

  const renderWordleContainer = (updateHints = false) => {
    const classes = classNames("wordle-container", {
      "updating-hints": updateHints,
    });

    return (
      <div className={classes}>
        <p className="wordle-title">{index + 1}</p>
        <div className="wordle-hints-container">
          {renderAllColumns(updateHints)}
        </div>
      </div>
    );
  };

  const classes = classNames({ "mini-wordle": !fullsized, wordle: fullsized });

  return (
    <div
      id={wordles[index].id}
      className={classes}
      onClick={() => dispatch(setSelected(index))}
      animation-stage={animationStage}
      onAnimationEnd={onAnimationEnd}
    >
      {renderWordleContainer(false)}
      {renderWordleContainer(true)}
    </div>
  );
};

export default Wordle;
