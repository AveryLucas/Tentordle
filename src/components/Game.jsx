import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../css/wordle.min.css";
import Wordle from "./Wordle/Wordle";
import Keyboard from "./Wordle/Keyboard";
import anime from "animejs";

import {
  submitRandomGuess,
  submitInput,
  addToInput,
  backspace,
  setSelected,
  modifySelected,
  reset,
  updateHints,
  updateHintsAtPosition,
} from "../reducers/wordleSlice";

import Highlight from "./Wordle/Highlight";

// let interval = undefined;

// const test = () => {
//   anime.remove([`.mini-wordle .wordle-col`, `.mini-wordle .wordle-col .hints`]);

//   anime({
//     targets: `.mini-wordle .wordle-col`,
//     opacity: [0.1, 1],
//     delay: anime.stagger(250, { grid: [5, 1], from: "first", axis: "x" }),
//   });

//   anime({
//     targets: `.mini-wordle .wordle-col .hints`,
//     scale: [0.5, 1],
//     delay: anime.stagger(250, { grid: [5, 1], from: "first", axis: "x" }),
//   });
// };

const Game = () => {
  const dispatch = useDispatch();
  const { wordles, selected } = useSelector((state) => state.wordle);

  useEffect(() => {
    document.addEventListener("keydown", onKeyPress);
    document.addEventListener("wheel", onWheel);
    wordles.forEach((wordle) => console.log(wordle.word));
    return () => {
      document.removeEventListener("keydown", onKeyPress);
      document.removeEventListener("wheel", onWheel);
    };
  }, []);

  const onWheel = (event) => dispatch(modifySelected(Math.sign(event.deltaY)));

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
        dispatch(setSelected(Number(event.key) - 1));
        break;
      default:
        dispatch(addToInput(event.key));
        break;
    }
  };

  return (
    <div id="game">
      <div className="wordle-group">
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
      </div>
      <div id="selected">
        <Wordle index={selected} />
        <Keyboard />
      </div>
      <Highlight />
    </div>
  );
};

export default Game;
