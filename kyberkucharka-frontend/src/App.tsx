import { Link } from "react-router-dom";
import { User } from "../../common-interfaces/interfaces";
import { getUserFromCookies } from "./functions/cookieHelper";
import { useState } from "react";
import Login from "./userPages/Login";

function Header() {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

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
        // refresh, so the disappearance of cookies becomes visible
        window.location.reload();
      } else {
        console.error(
          `Error while logging out somehow: ${json.message}, ${json.error}`
        );
      }
    });
  }

  function createProfileCard(user: User | undefined) {
    return (
      <>
        <Link to={`/user/${user?.username}`}>{user?.display_name}</Link>

        <button
          className="kyberbutton-small"
          type="button"
          onClick={sendLogout}
        >
          Odhlásiť sa
        </button>
      </>
    );
  }

  return (
    <>
      <nav>
        <Link className="mainLogo" to="/">
          Kyberkuchárka
        </Link>
        <div id="userDiv">
          {getUserFromCookies() == null ? (
            <>
              <div>
                <button
                  className="kyberbutton-small"
                  type="button"
                  onClick={() => setIsLoggingIn(true)}
                >
                  prihlásiť sa
                </button>
              </div>
              <div>
                <div className="kyberbutton-small">
                  <Link
                    style={{
                      marginLeft: 0,
                      display: "block",
                      transform:
                        "translateY(calc(0.4vw * var(--main-recipe-size)))",
                    }}
                    to={"/register"}
                  >
                    registrovať sa
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>{createProfileCard(getUserFromCookies())}</>
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
    <>
      <Header></Header>
      <div>{children}</div>
    </>
  );
}

export default App;
