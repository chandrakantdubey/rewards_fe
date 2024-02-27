export const removeToken = () => {
  sessionStorage.removeItem("loginToken");
  window.location.replace(`http://${window.location.host}/login`);
};
