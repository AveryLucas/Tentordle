import React from "react";

class MiniWordle extends React.Component {
  constructor(props) {
    super(props);
    this.animator = undefined;
  }

  renderColumn(hints = "", status = "") {
    return (
      <div className="wordle-col">
        <div className="hints">
          {hints.split("").map((letter) => {
            return <span>{letter}</span>;
          })}
        </div>
        <div className={`wordle-brights ${status}`}>
          <div />
        </div>
      </div>
    );
  }

  range = (num) => this.randomInbetween(-num, num);

  randomInbetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  render() {
    return (
      <div className="mini-wordle">
        <div className="wordle-container">
          <p className="wordle-title">{this.props.index}</p>
          <div className="wordle-hints-container">
            {this.renderColumn("F", "A")}
            {this.renderColumn("A")}
            {this.renderColumn("D")}
            {this.renderColumn("GSA")}
            {this.renderColumn("S")}
          </div>
        </div>
        <div
          className="highlight"
          style={{ display: this.props.renderBackdrop ? "block" : "none" }}
        />
      </div>
    );
  }
}

export default MiniWordle;
