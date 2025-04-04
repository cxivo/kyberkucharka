// dark magic, do not touch, you might spontaneously combust
export function getJWT() {
  const b = document.cookie.match("(^|;)\\s*token\\s*=\\s*([^;]+)");
  return b ? b.pop() : ""; //localStorage.getItem("token");
}