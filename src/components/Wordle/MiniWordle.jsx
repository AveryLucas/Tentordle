import React from "react";
import anime from "animejs";
// import WordleRow from "../Classic/WordleRow";
// import { v4 as uuidv4 } from "uuid";
// import hints from "../../helpers/hints.js";

class MiniWordle extends React.Component {
  constructor(props) {
    super(props);
    // this.pos = { x: 0, y: 0 };
    this.animator = undefined;
  }

  componentDidMount() {
    // if (this.props.renderBackdrop) {
    // }
  }

  componentWillUnmount() {
    // if (this.animator) this.animator.remove(".highlight");
  }

  // animateToRandom() {
  //   if (this.animator) this.animator.remove(".highlight");
  //   const pos = {
  //     x: document.querySelector(".highlight").style.left,
  //     y: document.querySelector(".highlight").style.top
  //   };
  //   this.animator = anime({
  //     targets: ".highlight",
  //     top: [pos.y, this.range(2)],
  //     left: [pos.x, this.range(2)],
  //     translateX: [-20, -20],
  //     translateY: [-20, -20],
  //     rotate: this.range(2),
  //     // left: this.range(10),
  //     easing: "easeInOutQuad",
  //     duration: 1500,
  //     delay: Math.random() * 1000,
  //     complete: (anim) => {
  //       this.animateToRandom();
  //     }
  //   });
  // }

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
