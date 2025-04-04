import "./App.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav>
      <Link className="mainLogo" to="/">
        Kyberkuchárka
      </Link>
      <div id="userDiv">
        <div>
          <Link to={"/login"}>prihlásiť sa</Link>
        </div>
        <div>
          <Link to={"/register"}>registrovať sa</Link>
        </div>
      </div>
    </nav>
  );
}

function App({ children }: any) {
  return (
    <>
      <Header></Header>
      <div>{children}</div>
    </>
  );
}

export default App;
