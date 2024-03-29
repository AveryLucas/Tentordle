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

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const generateNewState = () => ({
  input: "",
  pastGuesses: [],
  lastGuess: "",
  remainingGuesses: 10,
  wordles: generateWordleArr(1),
  queue: generateWordArr(10),
  solved: {},
  keysDown: {},
  selected: 0,
});

const initialState = generateNewState();

export const wordleSlice = createSlice({
  name: "wordle",
  initialState,
  reducers: {
    updateHints: (state) => {
      for (var i = 0; i < state.wordles.length; i++) {
        state.wordles[i].hints = getAllHints(
          state.pastGuesses,
          state.wordles[i].word,
        );
      }
    },
    moveWordleQueueToIndex: (state, { payload }) => {
      console.log(payload);
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
      const { wordles, solved } = state;
      const rngWord = dictionary[Math.floor(Math.random() * dictionary.length)];
      for (var i = 0; i < wordles.length; i++) {
        if (rngWord == wordles[i].word && !solved[rngWord])
          state.solved[rngWord] = 1;
      }

      state.pastGuesses.push(rngWord.toUpperCase());
      state.input = "";
    },
    submitInput: (state) => {
      const { wordles, input, solved } = state;
      if (input.length) {
        for (var i = 0; i < wordles.length; i++) {
          if (input == wordles[i].word && !solved[input])
            state.solved[input] = 1;
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
    keyWatcher: (state, { payload }) => {
      console.log(payload.repeat);

      if (payload.type == "keydown")
        state.keysDown = { ...state.keysDown, [payload.key.toUpperCase()]: 1 };

      if (payload.type == "keyup") {
        let temp = state.keysDown;
        delete temp[payload.key.toUpperCase()];
        state.keysDown = temp;
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
  },
});

export const {
  submitRandomGuess,
  submitInput,
  addToInput,
  backspace,
  setSelected,
  modifySelected,
  updateHints,
  moveWordleQueueToIndex,
  keyWatcher,
} = wordleSlice.actions;

export default wordleSlice.reducer;
