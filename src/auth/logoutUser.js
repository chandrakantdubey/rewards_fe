import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";
import { useMsal } from "@azure/msal-react";

export const logoutUserHandler = async () => {
  const { instance } = useMsal();
  instance.logoutRedirect(msalConfig.auth.postLogoutRedirectUri);
  sessionStorage.clear();
  localStorage.clear();
};
