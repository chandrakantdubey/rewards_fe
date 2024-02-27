import { createSlice } from "@reduxjs/toolkit";

const lightTheme = {
  bgTheme: "g10",
  contentTheme: "white",
};

const darkTheme = {
  bgTheme: "g100",
  contentTheme: "g90",
};

let themeSlice = createSlice({
  name: "theme",
  initialState: localStorage.getItem("darkTheme") ? darkTheme : lightTheme,
  reducers: {
    setDarkTheme: () => {
      localStorage.setItem("darkTheme", "true");
      return darkTheme;
    },
    setLightTheme: () => {
      localStorage.removeItem("darkTheme");
      return lightTheme;
    },
  },
});

export const { setDarkTheme, setLightTheme } = themeSlice.actions;

export default themeSlice;
