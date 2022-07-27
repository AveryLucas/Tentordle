import { createSlice } from "@reduxjs/toolkit";
import dictionary from "../words.json";
import { getAllHints } from "../helpers/hints";

const randomWord = () =>
  dictionary[Math.floor(Math.random() * dictionary.length)].toUpperCase();

const generateWordle = () => ({
  word: randomWord(),
  queue: [],
  hints: [{}],
});

const initialState = {
  input: "",
  pastGuesses: [],
  wordles: [
    generateWordle(),
    generateWordle(),
    generateWordle(),
    generateWordle(),
    generateWordle(),
  ],
  selected: 0,
};

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

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
      state.selected = clamp(payload, 0, 4);
    },
    modifySelected: (state, { payload }) => {
      state.selected = clamp(state.selected + payload, 0, 4);
    },
    reset: (state) => {
      state.wordles = [
        generateWordle(),
        generateWordle(),
        generateWordle(),
        generateWordle(),
        generateWordle(),
      ];

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
} = wordleSlice.actions;

export default wordleSlice.reducer;
