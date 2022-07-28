import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";

import { setSelected } from "../../reducers/wordleSlice";
import WordleColumn from "./WordleColumn";

const Wordle = ({ index, renderWordleQueue = false, fullsized = true }) => {
  const dispatch = useDispatch();
  const { wordles, input, queue, pastGuesses } = useSelector(
    (state) => state.wordle,
  );

  const renderAllColumns = () => {
    return wordles[index].word.split("").map((letter, letterIndex) => {
      return (
        <WordleColumn
          key={`w_c_${letterIndex}_hint`}
          fullsized={fullsized}
          wordleIndex={index}
          letterIndex={letterIndex}
        />
      );
    });
  };

  const renderWordleContainer = (word = "", index) => {
    return (
      <div className="wordle-container">
        <p className="wordle-title">{index + 1}</p>
        <div className="wordle-hints-container">{renderAllColumns()}</div>
      </div>
    );
  };

  const classes = classNames({ "mini-wordle": !fullsized, wordle: fullsized });

  return (
    <div
      id={wordles[index].id}
      className={classes}
      onClick={() => dispatch(setSelected(index))}
    >
      {renderWordleContainer(wordles[index].word, index)}
      {renderWordleContainer(uuidv4(), index)}
    </div>
  );
};

export default Wordle;
