import "./App.css";
import { Link } from "react-router-dom";
import { User } from "../../common-interfaces/interfaces";
import { serverURL } from "./main";
import { getUserFromCookies } from "./functions/cookieHelper";

function Header() {
  function sendLogout() {
    fetch(`${serverURL}/auth/logout/`, {
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
        <div>{user?.display_name}</div>
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
        {getUserFromCookies() == null ? (
          <>
            <div>
              <Link to={"/login"}>prihlásiť sa</Link>
            </div>
            <div>
              <Link to={"/register"}>registrovať sa</Link>
            </div>
          </>
        ) : (
          <div>{createProfileCard(getUserFromCookies())}</div>
        )}
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
