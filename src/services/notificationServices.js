import notificationApi from "../api/notificationApi";

export const user_signup = (accounts, account) => {
  let userdaat = {};
  const usernotification_token = localStorage.getItem("notification_token");

  accounts.forEach((value) => {
    if (value.idTokenClaims.auth_time) {
      userdaat.login = new Date(
        value.idTokenClaims.auth_time * 1000
      ).toUTCString();
    }
    if (value.idTokenClaims.ProfileEdit_DateTime) {
      userdaat.profile_edit_time = new Date(
        value.idTokenClaims.ProfileEdit_DateTime * 1000
      ).toUTCString();
    }
    if (value.idTokenClaims.PasswordResetDateTime) {
      userdaat.PasswordResetDateTimeu = new Date(
        value.idTokenClaims.PasswordResetDateTime * 1000
      ).toUTCString();
    }
    if (value.idTokenClaims.ChangeMFAphnNo_DateTime) {
      userdaat.ChangeMFAphnNo_DateTimeuser = new Date(
        value.idTokenClaims.ChangeMFAphnNo_DateTime * 1000
      ).toUTCString();
    }
    if (value.idTokenClaims.ForgotPasswordDateTime) {
      userdaat.ForgotPasswordDateTime = new Date(
        value.idTokenClaims.ForgotPasswordDateTime * 1000
      ).toUTCString();
    }
    if (value.idTokenClaims.isForgotPassword) {
      userdaat.isForgotPasswords = value.idTokenClaims.isForgotPassword;
    }
  });
  if (userdaat) {
    notificationApi
      .post("/user_signup", {
        userid: account?.idTokenClaims?.sub,
        login_time: userdaat?.login,
        forgot_password_time: userdaat?.ForgotPasswordDateTime,
        change_password_time: userdaat?.PasswordResetDateTimeu,
        change_mfa_time: userdaat?.ChangeMFAphnNo_DateTimeuser,
        profile_edit_time: userdaat?.profile_edit_time,
        platform: "uvation rewards",
        forgot_password: userdaat.isForgotPasswords,
        token: usernotification_token || "",
        email: account?.idTokenClaims?.email,
      })
      .then((res) => {})
      .catch(() => {});
  }
};
