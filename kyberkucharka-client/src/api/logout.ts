import { serverAddress } from "../App";

const logout = async (setUser: any) => {
  try {
    let res = await fetch(serverAddress + "/logout", {
      method: "POST",
      headers: [["Content-Type", "application/json"]],
      body: JSON.stringify({}),
    });
    let resJson = await res.json();
    if (res.status === 200) {
      localStorage.removeItem("user");
      setUser({});
    }
    console.log(resJson);
  } catch (err) {
    console.log(err);
  }
};

export default logout;
