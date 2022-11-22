import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../css/wordle.min.css";
import Wordle from "./Wordle/Wordle";
import Keyboard from "./Wordle/Keyboard";
import Highlight from "./Wordle/Highlight";

import {
  submitRandomGuess,
  submitInput,
  addToInput,
  backspace,
  setSelected,
  modifySelected,
  reset,
  updateHints,
  keyWatcher,
} from "../reducers/wordleSlice";

const Game = () => {
  const dispatch = useDispatch();
  const { wordles, selected, solved } = useSelector((state) => state.wordle);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    document.addEventListener("wheel", onWheel);
    wordles.forEach((wordle) => console.log(wordle.word));
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("wheel", onWheel);
    };
  }, []);

  const onWheel = (event) => dispatch(modifySelected(Math.sign(event.deltaY)));

  const onKeyUp = (event) => dispatch(keyWatcher(event));

  const onKeyDown = (event) => {
    if (event.repeat) return;
    
    switch (true) {
      case event.key === "Backspace":
        dispatch(backspace());
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
        dispatch(setSelected(Number(event.key) - 1));
        break;
      default:
        // console.log(event.type);
        dispatch(keyWatcher(event));
        dispatch(addToInput(event.key));
        break;
    }
  };

  if (Object.keys(solved).length == 5) {
    // console.log("DONE");
  }

  return (
    <div id="game">
      {/* <div className="wordle-group">
        {wordles.map((wordle, index) => {
          return (
            <Wordle
              key={wordle.id}
              index={index}
              fullsized={false}
              renderWordleQueue={true}
            />
          );
        })}
      </div> */}
      <div id="selected">
        <div id="header">
          <h1>nine-tordle</h1>
          <p>Well that was just embarrasing</p>
        </div>
        <Wordle index={selected} />
        <Keyboard />
      </div>
      <Highlight />
    </div>
  );
};

export default Game;
