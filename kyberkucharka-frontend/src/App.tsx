import { Link } from "react-router-dom";
import { User } from "../../common-interfaces/interfaces";
import { useState } from "react";
import Login from "./userPages/Login";
import { CookiesProvider, useCookies } from "react-cookie";
import Popup from "./Popup";

function Header() {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [userCookie, _setUserCookie, _removeUserCookie] = useCookies(
    ["userData"],
    {}
  );

  function sendLogout() {
    fetch(`/api/auth/logout/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include", // this is VERY NEEDED, so the server sends us a cookie (we want cookies)
    }).then(async (response: Response) => {
      const json = await response.json();

      if (response.ok) {
        console.log(json);
      } else {
        console.error(
          `Error while logging out somehow: ${json.message}, ${json.error}`
        );
      }
    });
  }

  function loginRegisterCard() {
    return (
      <>
        <div>
          <button
            className="kyberbutton"
            type="button"
            onClick={() => setIsLoggingIn(true)}
          >
            prihlásiť sa
          </button>
        </div>

        <Link to={"/register"} className="no-rotate">
          <button className="kyberbutton" type="button">
            registrovať sa
          </button>
        </Link>
      </>
    );
  }

  function createProfileCard(user: User | undefined) {
    return (
      <>
        <div className="userpage-link">
          <Link to={`/user/${user?.username}`}>
            <img src="/user.png" alt="ikona používateľa" height="40px"></img>
            <p>{user?.display_name}</p>
          </Link>
        </div>
        <button className="kyberbutton" type="button" onClick={sendLogout}>
          odhlásiť sa
        </button>
      </>
    );
  }

  return (
    <>
      <nav>
        <Link to="/" className="logo-link">
          <img src="/logo.png" alt="Kyberkuchárka" className="logo"></img>
        </Link>
        <div className="links">
          {userCookie.userData?.is_admin && (
            <div>
              <Link to="/tag-list">
                <img
                  src="/tags-list.png"
                  alt="Správa tagov"
                  height="40px"
                ></img>
              </Link>
              <Link to="/ingredient-list">
                <img
                  src="/ingredients-list.png"
                  alt="Správa ingrediencií"
                  height="40px"
                ></img>
              </Link>
              <Link to="/user-list">
                <img
                  src="/users-list.png"
                  alt="Správa užívateľov"
                  height="40px"
                ></img>
              </Link>
            </div>
          )}
          <Link to="/search">
            <img src="/search.png" alt="Hľadať" height="40px"></img>
          </Link>
          <Link to="/about">O projekte</Link>
          {userCookie.userData != null && (
            <Link to="/create">Vytvor recept</Link>
          )}
          {userCookie.userData == null ? (
            <>{loginRegisterCard()}</>
          ) : (
            <>{createProfileCard(userCookie.userData as User)}</>
          )}
        </div>
      </nav>
      {isLoggingIn ? (
        <Login
          suggestRegistering={true}
          closeCallback={() => {
            setIsLoggingIn(false);
          }}
        ></Login>
      ) : (
        ""
      )}
    </>
  );
}

function App({ children }: any) {
  return (
    <CookiesProvider>
      <Header></Header>
      <div>{children}</div>
      <Popup />
    </CookiesProvider>
  );
}

export default App;
