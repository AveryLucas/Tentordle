import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import "../css/wordle.min.css";
import Wordle from "./Wordle/Wordle";
import Keyboard from "./Wordle/Keyboard";

import {
  submitRandomGuess,
  submitInput,
  addToInput,
  backspace,
  setSelected,
  modifySelected,
  reset,
  updateHints,
} from "../reducers/wordleSlice";

const Game = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress);
    return () => document.removeEventListener("keydown", onKeyPress);
  }, []);

  const onKeyPress = (event) => {
    switch (true) {
      case event.key === "Backspace":
        dispatch(backspace());
        if (event.ctrlKey) dispatch(reset());
        break;
      case event.key === "Enter":
        if (event.ctrlKey) dispatch(submitRandomGuess());
        else dispatch(submitInput());
        dispatch(updateHints());
        break;
      case event.key === "ArrowDown":
        dispatch(modifySelected(1));
        break;
      case event.key === "ArrowUp":
        dispatch(modifySelected(-1));
        break;
      case "1234567890".indexOf(event.key) != -1:
        dispatch(setSelected(Number(event.key)));
        break;
      default:
        dispatch(addToInput(event.key));
        break;
    }
  };

  const { wordles, selected } = useSelector((state) => state.wordle);

  return (
    <div id="game">
      <div className="wordle-group">
        {wordles.map((word, index) => {
          return <Wordle key={uuidv4()} fullsized={false} index={index} />;
        })}
      </div>
      <div id="selected">
        <Wordle index={selected} />
        <Keyboard />
      </div>
    </div>
  );
};

export default Game;
