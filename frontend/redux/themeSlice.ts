import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  index: 1,
  themes: [
    {
      name: "dark",
      background: "#000000",
      backgroundSecondary: "#141414",
      backgroundTertiary: "#202020",
      button: "#202020",
      smallTag: "#2d2b45",
      smallTagHighlighted: "#252338",
      text: {
        full: "#ffffff",
        semi: "#A6A6A6",
        muted: "#5B5B5B",
        semiFull: "#DBDBDB",
        error: "#FF453A",
        success: "#4bb543",
      },
    },
    {
      name: "light",
      background: "white",
      backgroundSecondary: "#F0F0F0",
      backgroundTertiary: "#E0E0E0",
      button: "#E9E9E9",
      smallTag: "#E9E9E9",
      smallTagHighlighted: "#dfdfdf",
      text: {
        full: "black",
        semi: "#666666",
        muted: "#333333",
        semiFull: "#333333",
        error: "#FF453A",
        success: "#4bb543",
      },
    },
  ],
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    setTheme: (state, action) => {
      switch (action.payload) {
        case "dark":
          state.index = 0;
          break;
        case "light":
          state.index = 1;
          break;
        default:
          state.index = 0;
          break;
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;
export { initialState as initialThemeState };
export default themeSlice.reducer;
