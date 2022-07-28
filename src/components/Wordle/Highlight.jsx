import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Highlight = () => {
  const { selected } = useSelector((state) => state.wordle);
  const [number, setNumber] = useState(0);
  useEffect(() => setTimeout(() => setNumber(0), 10), []);

  const wordle = document.querySelectorAll(".mini-wordle")[selected] || {};

  return (
    <div
      className={`highlight`}
      style={{
        top: wordle.offsetTop,
        left: wordle.offsetLeft,
        height: `${wordle.offsetHeight}px`,
      }}
    />
  );
};

export default Highlight;
