export const getToken = () => {
  return localStorage.getItem("loginToken") || "";
};
