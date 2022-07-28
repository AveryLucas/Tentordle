import { createSlice, current } from "@reduxjs/toolkit";
import dictionary from "../words.json";
import { getAllHints } from "../helpers/hints";
import { v4 as uuidv4 } from "uuid";

const randomWord = () =>
  dictionary[Math.floor(Math.random() * dictionary.length)].toUpperCase();

const generateWordle = () => ({
  id: uuidv4(),
  word: randomWord(),
  hints: [{}],
});

const generateWordleArr = (num) =>
  new Array(num).fill({}).map(() => generateWordle());

const initialState = {
  input: "",
  pastGuesses: [],
  lastGuess: "",
  wordles: generateWordleArr(5),
  queue: generateWordleArr(2),
  selected: 0,
};

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

let i = 0;
let interval = undefined;
// let hints = [];

export const wordleSlice = createSlice({
  name: "wordle",
  initialState,
  reducers: {
    updateHints: (state) => {
      for (var i = 0; i < state.wordles.length; i++) {
        state.wordles[i].hints = getAllHints(
          state.pastGuesses,
          state.wordles[i].word,
          state.wordles[i].hints,
        );
      }
    },
    updateHintsAtPosition: (state, { payload }) => {
      for (var i = 0; i < state.wordles.length; i++) {
        // Remove old hints at that position and that are proven to be not in the word.
        // Removing hints at position -1 because this is the easiest way to prevent adding duplicates.
        state.wordles[i].hints = state.wordles[i].hints.filter(
          (hint) => hint.position !== payload || hint.position === -1,
        );

        // Get updated hints and filter for only the ones at this position
        const newHints = getAllHints(
          state.pastGuesses,
          state.wordles[i].word,
          state.wordles[i].hints,
        ).filter((hint) => hint.position === payload || hint.position === -1);

        // Update state with new and old (but filtered) hints
        state.wordles[i].hints = [...newHints, ...state.wordles[i].hints];
      }
    },
    submitRandomGuess: (state) => {
      const rngWord = dictionary[Math.floor(Math.random() * dictionary.length)];
      state.pastGuesses.push(rngWord.toUpperCase());
      state.input = "";
    },
    submitInput: (state) => {
      if (state.input.length) {
        state.pastGuesses.push(state.input);
        state.input = "";
      }
    },
    addToInput: (state, { payload }) => {
      if (
        payload.match(/^[A-Za-z]+$/) &&
        payload.length === 1 &&
        state.input.length !== 5
      ) {
        state.input = state.input + payload.toUpperCase();
      }
    },
    backspace: (state) => {
      state.input = state.input.substring(0, state.input.length - 1);
    },
    setSelected: (state, { payload }) => {
      const { wordles } = state;
      state.selected = clamp(payload, 0, wordles.length - 1);
    },
    modifySelected: (state, { payload }) => {
      const { wordles, selected } = state;
      state.selected = clamp(selected + payload, 0, wordles.length - 1);
    },
    reset: (state) => {
      state.wordles = [
        generateWordle(),
        generateWordle(),
        generateWordle(),
        generateWordle(),
        generateWordle(),
      ];

      state.queue = [generateWordle()];
      state.pastGuesses = [];
    },
  },
});

export const {
  submitRandomGuess,
  submitInput,
  addToInput,
  backspace,
  setSelected,
  modifySelected,
  reset,
  updateHints,
  updateHintsAtPosition,
} = wordleSlice.actions;

export default wordleSlice.reducer;
