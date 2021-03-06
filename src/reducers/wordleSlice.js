import { createSlice, current } from "@reduxjs/toolkit";
import dictionary from "../words.json";
import { getAllHints } from "../helpers/hints";
import { v4 as uuidv4 } from "uuid";

const randomWord = () =>
  dictionary[Math.floor(Math.random() * dictionary.length)].toUpperCase();

const generateWordArr = (num) =>
  new Array(num).fill({}).map(() => randomWord());

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
  queue: generateWordArr(10),
  solved: {},
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
    moveWordleQueueToIndex: (state, { payload }) => {
      if (state.queue.length !== 0) {
        state.wordles[payload].word = state.queue.shift();
        // console.log(current(state.wordles[payload].word));
        state.wordles[payload].hints = getAllHints(
          state.pastGuesses,
          state.wordles[payload].word,
          [],
        );
      }
    },
    submitRandomGuess: (state) => {
      const rngWord = dictionary[Math.floor(Math.random() * dictionary.length)];
      for (var i = 0; i < state.wordles.length; i++) {
        if (rngWord == state.wordles[i].word && !state.solved[rngWord]) {
          state.solved[rngWord] = 1;
        }
      }

      state.pastGuesses.push(rngWord.toUpperCase());
      state.input = "";
    },
    submitInput: (state) => {
      if (state.input.length) {
        for (var i = 0; i < state.wordles.length; i++) {
          if (
            state.input == state.wordles[i].word &&
            !state.solved[state.input]
          ) {
            state.solved[state.input] = 1;
          }
        }

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
  moveWordleQueueToIndex,
} = wordleSlice.actions;

export default wordleSlice.reducer;
