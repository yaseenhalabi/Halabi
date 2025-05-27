import { createSlice } from "@reduxjs/toolkit";

interface PopupBannerState {
  newContactIds: string[];
  visible: boolean;
}

const initialState: PopupBannerState = {
  newContactIds: [],
  visible: false,
};

const popupBannerSlice = createSlice({
  name: "popupBanner",
  initialState,
  reducers: {
    showNewContactsBanner: (state, action) => {
      state.newContactIds = action.payload;
      state.visible = true;
    },
    hideNewContactsBanner: (state) => {
      state.newContactIds = [];
      state.visible = false;
    },
  },
});

export const { showNewContactsBanner, hideNewContactsBanner } =
  popupBannerSlice.actions;
export default popupBannerSlice.reducer;
