import { LogLevel } from "@azure/msal-browser";
const azuredomain_name = "uvationidentitydev.b2clogin.com";
const azuretenant_id = "c4780935-036d-4477-9903-71fb55c50c04";
const azureclient_id = "5259668d-1372-4e68-9eff-d68fb2e5d69c";

export const b2cPolicies = {
  names: {
    signUpSignIn: "B2C_1A_6_DEV_SIGNUP_SIGNIN",
    forgotPassword: "B2C_1A_DEMO1_PASSWORD_RESET",
    deactivate: "B2C_1A_10_DEV_DELETE_ACCOUNT",
    changePassword: "B2C_1A_9_DEV_EDIT_PASSWORD",
    editmfanumber: "B2C_1A_8_DEV_EDIT_MFAPHONENUMBER",
    profileUpdate: "B2C_1A_7_DEV_EDIT_PROFILE",
  },
  authorities: {
    signUpSignIn: {
      authority: `https://${azuredomain_name}/${azuretenant_id}/B2C_1A_6_DEV_SIGNUP_SIGNIN`,
    },
    forgotPassword: {
      authority: `https://${azuredomain_name}/${azuretenant_id}/B2C_1A_DEMO1_PASSWORD_RESET`,
    },
    changePassword: {
      authority: `https://${azuredomain_name}/${azuretenant_id}/B2C_1A_9_DEV_EDIT_PASSWORD`,
    },
    profileUpdate: {
      authority: `https://${azuredomain_name}/${azuretenant_id}/B2C_1A_7_DEV_EDIT_PROFILE`,
    },
    deactivate: {
      authority: `https://${azuredomain_name}/${azuretenant_id}/B2C_1A_10_DEV_DELETE_ACCOUNT`,
    },

    editmfanumber: {
      authority: `https://${azuredomain_name}/${azuretenant_id}/B2C_1A_8_DEV_EDIT_MFAPHONENUMBER`,
    },
  },
  authorityDomain: azuredomain_name,
};

export const msalConfig = {
  auth: {
    clientId: azureclient_id,
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: window.location.origin,
    postLogoutRedirectUri: `https://${azuredomain_name}/${azuretenant_id}b2c_1a_6_dev_signup_signin/oauth2/v2.0/logout?post_logout_redirect_uri=${window.location.origin}`,
    // Indicates the page to navigate after logout.
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            return;
          case LogLevel.Info:
            return;
          case LogLevel.Verbose:
            return;
          case LogLevel.Warning:
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: [
    "openid",
    "profile",
    "offline_access",
    `https://${azuretenant_id}/tasks-api/tasks.write`,
  ],
};
export const silentRequest = {
  scopes: ["openid", "profile", "offline_access"],
  //   loginHint: "example@domain.net",
};

export const protectedResources = {
  apiHello: {
    endpoint: "https://appsapi.uvation.com/identity/hello",
    scopes: [`https://${azuretenant_id}/tasks-api/tasks.read`],
    // e.g. api://xxxxxx/access_as_user
  },
};
