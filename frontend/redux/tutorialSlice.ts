import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TutorialState {
  isCompleted: boolean;
  currentStep: number;
  tutorialContact: {
    name: string;
    tags: string[];
  } | null;
}

const initialState: TutorialState = {
  isCompleted: false,
  currentStep: 0,
  tutorialContact: null,
};

const tutorialSlice = createSlice({
  name: "tutorial",
  initialState,
  reducers: {
    setTutorialCompleted: (state, action: PayloadAction<boolean>) => {
      state.isCompleted = action.payload;
    },
    setTutorialStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setTutorialContact: (state, action: PayloadAction<{ name: string; tags: string[] }>) => {
      state.tutorialContact = action.payload;
    },
    resetTutorial: (state) => {
      state.currentStep = 0;
      state.tutorialContact = null;
    },
  },
});

export const {
  setTutorialCompleted,
  setTutorialStep,
  setTutorialContact,
  resetTutorial,
} = tutorialSlice.actions;

export default tutorialSlice.reducer; 