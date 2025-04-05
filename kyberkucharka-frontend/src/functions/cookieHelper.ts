import { User } from "../../../common-interfaces/interfaces";

// code from Copilot, because I was betrayed by two libraries which felt like
// they could set random stupid cookies as they please (including a GeoIP one!!!)
// so I just yeeted them away as far as I could (from my disk, so not that far)
export function getCookie(name: string) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === name) {
        return JSON.parse(decodeURIComponent(value)); // Convert back to object
      }
    }
    return undefined; // If the cookie isn't found
  }


export function getUserFromCookies(): User | undefined {
    return getCookie("userData") as User;
}