import "./App.css";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div id="common">
      <p>Helou!</p>
      <Link to="users">Zoznam používateľov</Link>
      <Outlet />
    </div>
  );
}

export default App;
