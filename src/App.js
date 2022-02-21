// import logo from "./logo.svg";
import "./App.css";

import Wordle from "./components/Wordle";
import WordleGroup from "./components/WordleGroup";

function App() {
  return (
    <div className="App">
      {/* <Wordle /> */}
      <WordleGroup />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
