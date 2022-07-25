import React from "react";
import { v4 as uuidv4 } from "uuid";
import HintHelper from "../../helpers/hints";
import Explosion from "../Explosion";

class Highlight extends React.Component {
  constructor(props) {
    super(props);
  }

  renderExplosion = () => {
    return (
      <Explosion
        // size={100}
        width={240}
        height={90}
        delay={500}
        easing={"ease-out"}
        background={"#D2FF52"}
        borderRadius={20}
        speed={1000}
        easing={"cubic-bezier(0.33, 1, 0.68, 1)"}
        top={500 + this.range(50)}
        left={500 + this.range(50)}
      />
    );
  };

  getStyles() {
    const wordle =
      document.querySelectorAll(".mini-wordle")[this.props.selected || 0];
    // console.log({ wordle });
    try {
      return {
        top: wordle.offsetTop,
        left: wordle.offsetLeft,
        height: `${wordle.offsetHeight}px`,
        width: `${wordle.offsetWidth}px`
      };
    } catch (err) {
      return {};
    }
  }

  render() {
    return <div className={`highlight`} style={this.getStyles()}></div>
  }
}

export default Highlight;
