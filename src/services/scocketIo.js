import { io } from "socket.io-client";
import { setDarkTheme, setLightTheme } from "../redux/theme/themeSlice";
import store from "../redux/store";
var socket = io.connect(import.meta.env.VITE_SOCKET_URL, {
  path: import.meta.env.VITE_SOCKET_PATH,
});
socket.on("connect", (i) => {
  let joinInterval = setInterval(() => {
    let socketAcureID = localStorage.getItem("azureId");
    if (
      socketAcureID &&
      socketAcureID != undefined &&
      socketAcureID != "Undefined" &&
      socketAcureID != "undefined"
    ) {
      socket.emit("join", { userid: socketAcureID });
      clearInterval(joinInterval);
    }
  }, 1000);
});

socket.on("changeCurrentTheme", (e) => {
  if(e.theme == "white") {
    store.dispatch(setLightTheme())
  }else{
    store.dispatch(setDarkTheme())
  }
});
export const switchThemeSocketEmitter = (theme) => {
  let socketAcureID = localStorage.getItem("azureId");
  socket.emit("changeTheme", {theme , userid: socketAcureID});
}

export default socket;
