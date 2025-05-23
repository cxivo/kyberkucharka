import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Popup() {
  const [
    thatSillyDialogCookie,
    setThatSillyDialogCookie,
    _removeThatSillyDialogCookie,
  ] = useCookies(["sillyData"], {});
  const [doRender, setDoRender] = useState<boolean>(false);

  const navigate = useNavigate();

  function okayStopShowingMeThisDialog() {
    setDoRender(false);
    setThatSillyDialogCookie("sillyData", true, {
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  useEffect(() => {
    if (thatSillyDialogCookie.sillyData == null) {
        setDoRender(true);
    }
  }, []);

  return (
    <>
      {doRender && (
        <dialog className="popup" open>
          <h2>Táto stránka obsahuje cookies</h2>
          <p>
            Presnejšie, recepty na ne! Upečte si nejaké aj vy!
            </p>
            <div>
            <button
            className="kyberbutton"
              type="button"
              onClick={() => {
                okayStopShowingMeThisDialog();
                navigate(
                  `/search?` +
                    new URLSearchParams({
                      requiredTags: `[7]`, // id of the cookies tag
                    })
                );
              }}
            >
              Ukáž cookies!
            </button>
            <button className="kyberbutton" type="button" onClick={okayStopShowingMeThisDialog}>
              Choď preč
            </button>
          
          </div>
        </dialog>
      )}
    </>
  );
}
