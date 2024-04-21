import { useState } from "react";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import { UserContext } from "./api/UserContext";
import UserList from "./pages/UserList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ErrorPage } from "./pages/error/ErrorPage";
import Home from "./pages/Home";
import logout from "./api/logout";
import { User } from "./interfaces/user";

export const serverAddress = "https://kyberkucharka-api.onrender.com";

function App() {
  //const userContext = useContext(UserContext);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") ?? "{}") as User
  ) as [User, any];

  let topPane;
  if (user.id) {
    topPane = (
      <div>
        <p>
          {user.id}: {user.name}
        </p>
        <button onClick={async () => await logout(setUser)}>Odhlásiť sa</button>
      </div>
    );
  } else {
    topPane = (
      <div>
        <Link to="/register">Registrácia</Link>
        &nbsp;
        <Link to="/login">Prihlásiť sa</Link>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div>
        <Link to="/">
          <h2>Kyberkuchárka</h2>
        </Link>
        <div id="user-auth">{topPane}</div>
        <div>
          <p>Helou!</p>
          <Link to="/users">Zoznam používateľov</Link>
          <Outlet />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <UserContext.Provider value={user}>
                <Home />
              </UserContext.Provider>
            }
          />
          <Route
            path="/login"
            element={
              <UserContext.Provider value={user}>
                <Login setUser={setUser} />
              </UserContext.Provider>
            }
          />
          <Route
            path="/users"
            element={
              <UserContext.Provider value={user}>
                <UserList />
              </UserContext.Provider>
            }
            errorElement={<ErrorPage />}
          />
          <Route
            path="/register"
            element={
              <UserContext.Provider value={user}>
                <Register setUser={setUser} />
              </UserContext.Provider>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

/*
    loader={async () => {
      return await getUsers();
    }} 
*/

export default App;
