import "./App.css";
import { Link } from "react-router-dom";
import { User } from "../../common-interfaces/interfaces";
import { useCookies, CookiesProvider } from "react-cookie";
import { serverURL } from "./main";

function Header() {
  const [userCookie, _setUserCookie, _removeUserCookie] = useCookies(
    ["userData"],
    {}
  );

  function sendLogout() {
    fetch(`${serverURL}/auth/logout/`, {
      method: "POST",
      body: JSON.stringify(userCookie.userData),
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

  function createProfileCard(user: User) {
    return (
      <>
        <div>{user.display_name}</div>
        <div>
          <button type="button" onClick={sendLogout}>
            Odhlásiť sa
          </button>
        </div>
      </>
    );
  }

  return (
    <nav>
      <Link className="mainLogo" to="/">
        Kyberkuchárka
      </Link>
      <div id="userDiv">
        {userCookie.userData == null ? (
          <>
            <div>
              <Link to={"/login"}>prihlásiť sa</Link>
            </div>
            <div>
              <Link to={"/register"}>registrovať sa</Link>
            </div>
          </>
        ) : (
          <div>{createProfileCard(userCookie.userData as User)}</div>
        )}
      </div>
    </nav>
  );
}

function App({ children }: any) {
  return (
    <CookiesProvider>
      <Header></Header>
      <div>{children}</div>
    </CookiesProvider>
  );
}

export default App;
