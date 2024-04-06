import logo from "./logo.svg";
import "./App.css";
import { getRecipes } from "./recipe/communication";

function App() {
  const recipes = getRecipes();

  return (
    <div className="App">
      <header className="App-header">
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
      </header>
      <ul>{recipes}</ul>
    </div>
  );
}

export default App;
