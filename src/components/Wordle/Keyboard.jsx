import React from "react";
// import { v4 as uuidv4 } from "uuid";
// import "../css/wordle.css";
// import WordleRow from "./WordleRow";

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidUpdate(prevProps, prevState) {}

  renderLetter(text, is_wide = false, onClick) {
    return (
      <span className={`keyboard-letter ${is_wide ? "wide" : ""}`}>
        <div className="letter">{text}</div>
      </span>
    );
  }

  renderKeyboard() {
    const rows = ["QWERTYUIOP", "ASDFGHJKL", "1ZXCVBNM2"];
    return rows.map((row, index) => {
      return (
        <div>
          {row.split("").map((letter) => {
            if (letter == "1") return this.renderLetter("Enter", true);
            if (letter == "2") return this.renderLetter("Back", true);
            return this.renderLetter(letter);
          })}
        </div>
      );
    });
  }

  render() {
    const { prev_attempts, correct_word, max_attempts, cur_attempt } =
      this.props;
    return <div id="keyboard">{this.renderKeyboard()}</div>;
  }
}

export default Keyboard;
