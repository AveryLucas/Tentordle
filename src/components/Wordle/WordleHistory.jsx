import React from "react";
import WordleRow from "./WordleRow";
// import { v4 as uuidv4 } from "uuid";

class WordleHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { history } = this.props;
    return (
      <div id="wordle-history">
        {history
          .reverse()
          // .slice(history.length - Math.min(history.length, 7))
          .map((guess) => {
            return <div>{guess}</div>;
          })}
      </div>
    );
  }
}

export default WordleHistory;
