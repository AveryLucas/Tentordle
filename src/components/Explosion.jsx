import React from "react";

class Explosion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { init: false, doop: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ doop: true });
    }, this.props.delay || 100);
  }

  randomInbetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
  range = (num) => this.randomInbetween(-num, num);

  ratio = (num_1, num_2) => {
    for (let num = num_2; num > 1; num--) {
      if (num_1 % num == 0 && num_2 % num == 0) {
        num_1 = num_1 / num;
        num_2 = num_2 / num;
      }
    }
    return [num_1, num_2, num_1 > num_2 ? num_1 / num_2 : num_2 / num_1];
  };

  render() {
    const {
      width,
      height,
      size,
      borderRadius,
      speed,
      background,
      behind,
      top,
      left,
      easing
    } = this.props;
    console.log(this.ratio(width, height));
    return (
      <div
        className="explosion"
        style={{
          position: "fixed",
          top: `${top || 500}px`,
          left: `${left || 500}px`,
          width: `${width || size || 100}px`,
          height: `${height || size || 100}px`,
          transform: "translate(-50%, -50%)",
          borderRadius: `${borderRadius || 100}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `${background || "red"}`
        }}
      >
        <div
          style={{
            width: `${this.state.doop ? width || size || 100 : 0}px`,
            height: `${this.state.doop ? height || size || 100 : 0}px`,
            borderRadius: `${borderRadius || 100}px`,
            transition: `all ${speed || 1000}ms ${easing || "linear"}`,
            background: `${behind || "white"}`,
            border: `${this.state.doop ? 3 : 0}px solid white`
          }}
        ></div>
      </div>
    );
  }
}

export default Explosion;
