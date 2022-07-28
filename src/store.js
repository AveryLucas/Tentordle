import { configureStore } from "@reduxjs/toolkit";
import wordleReducer from "./reducers/wordleSlice";

const thunk = require("redux-thunk").default;

export default configureStore({
  reducer: { wordle: wordleReducer },
  middleware: [thunk],
});
