import { createSlice } from "@reduxjs/toolkit";
import dictionary from "../words.json";

const randomWord = () =>
  dictionary[Math.floor(Math.random() * dictionary.length)].toUpperCase();

const initialState = {
  input: "",
  pastGuesses: [],
  wordles: [
    randomWord(),
    randomWord(),
    randomWord(),
    randomWord(),
    randomWord(),
  ],
  selected: 0,
};

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export const wordleSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
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
        randomWord(),
        randomWord(),
        randomWord(),
        randomWord(),
        randomWord(),
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
} = wordleSlice.actions;

export default wordleSlice.reducer;
