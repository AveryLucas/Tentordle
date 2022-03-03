import React from "react";
import { v4 as uuidv4 } from "uuid";

class SelectedWordle extends React.Component {
  constructor(props) {
    super(props);
  }

  renderColumn(hints = "", status = "") {
    return (
      <div key={uuidv4()} className="wordle-col">
        <div className="hints">
          {hints.split("").map((letter) => {
            return <span>{letter}</span>;
          })}
        </div>
        <div className="tile">
          <span className="letter"></span>
        </div>
      </div>
    );
  }

  // range = (num) => this.randomInbetween(-num, num);

  // randomInbetween = (min, max) =>
  //   Math.floor(Math.random() * (max - min + 1) + min);

  render() {
    return (
      <div className="wordle">
        <div className="wordle-container">
          <div className="wordle-hints-container">
            {this.renderColumn("F", "A")}
            {this.renderColumn("A")}
            {this.renderColumn("D")}
            {this.renderColumn("GSA")}
            {this.renderColumn("S")}
          </div>
        </div>
      </div>
    );
  }
}

export default SelectedWordle;
