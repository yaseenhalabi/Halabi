import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string[] = [];

const contactSnapshotsSlice = createSlice({
  name: "contactSnapshots",
  initialState,
  reducers: {
    setContactSnapshots: (state, action: PayloadAction<string[]>) => {
      return action.payload;
    },
    addContactIdToSnapshot: (state, action: PayloadAction<string>) => {
      if (!state.includes(action.payload)) {
        return [...state, action.payload];
      }
      return state;
    },
    removeContactIdFromSnapshot: (state, action: PayloadAction<string>) => {
      return state.filter((id) => id !== action.payload);
    },
    clearContactSnapshots: (state) => {
      return [];
    },
  },
});

export const {
  setContactSnapshots,
  addContactIdToSnapshot,
  removeContactIdFromSnapshot,
  clearContactSnapshots,
} = contactSnapshotsSlice.actions;

export default contactSnapshotsSlice.reducer;
