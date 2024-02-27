import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./redux/store";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./auth/authConfig";
const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <MsalProvider instance={msalInstance}>
    <Provider store={store}>
      <App />
    </Provider>
  </MsalProvider>
  // </React.StrictMode>
);
