import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <p>Helou!</p>
      <Link to="/users">Zoznam používateľov</Link>
      <Outlet />
    </div>
  );
}

export default App;
