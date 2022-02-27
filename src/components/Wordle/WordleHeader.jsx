import React from "react";

class WordleHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="wordle-header">
        <h1>Tentordle</h1>
        <p id="remaining-guesses">
          you've got <span>{this.props.remaining_guesses}</span> guesses
        </p>
      </div>
    );
  }
}

export default WordleHeader;
