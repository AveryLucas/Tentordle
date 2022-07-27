import React from "react";

const Highlight = ({ index = 0 }) => {
  const wordle = document.querySelectorAll(".mini-wordle")[index];
  const styles = {
    top: wordle.offsetTop,
    left: wordle.offsetLeft,
    height: `${wordle.offsetHeight}px`,
  };

  return <div className={`highlight`} style={styles} />;
};

export default Highlight;
