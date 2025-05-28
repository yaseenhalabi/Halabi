import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NewContactReviewState {
  reviewedIds: string[];
  awaitingReviewIds: string[];
  awaitingBannerIds: string[];
}

const initialState: NewContactReviewState = {
  reviewedIds: [],
  awaitingReviewIds: [],
  awaitingBannerIds: [],
};

const newContactReviewSlice = createSlice({
  name: "newContactReview",
  initialState,
  reducers: {
    setAwaitingReviewIds: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        awaitingReviewIds: action.payload,
      };
    },
    setAwaitingBannerIds: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        awaitingBannerIds: action.payload,
      };
    },
    setReviewedIds: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        reviewedIds: action.payload,
      };
    },
    finishReviewingId: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existsInAwaitingReview = state.awaitingReviewIds.includes(id);
      const existsInAwaitingBanner = state.awaitingBannerIds.includes(id);

      // Only proceed if the ID exists in either awaiting array
      if (existsInAwaitingReview || existsInAwaitingBanner) {
        const newAwaitingReviewIds = state.awaitingReviewIds.filter(
          (reviewId) => reviewId !== id
        );
        const newAwaitingBannerIds = state.awaitingBannerIds.filter(
          (bannerId) => bannerId !== id
        );
        const newReviewedIds = state.reviewedIds.includes(id)
          ? state.reviewedIds
          : [...state.reviewedIds, id];

        return {
          ...state,
          awaitingReviewIds: newAwaitingReviewIds,
          awaitingBannerIds: newAwaitingBannerIds,
          reviewedIds: newReviewedIds,
        };
      }
      return state;
    },
    skipAllAwaitingReviewedIds: (state) => {
      const newReviewedIds = [...state.reviewedIds];
      state.awaitingReviewIds.forEach((id) => {
        if (!newReviewedIds.includes(id)) {
          newReviewedIds.push(id);
        }
      });

      return {
        ...state,
        awaitingReviewIds: [],
        reviewedIds: newReviewedIds,
      };
    },
    addReviewedId: (state, action: PayloadAction<string>) => {
      if (!state.reviewedIds.includes(action.payload)) {
        return {
          ...state,
          reviewedIds: [...state.reviewedIds, action.payload],
        };
      }
      return state;
    },
    moveFromBannerToReview: (state) => {
      // Move all awaitingBannerIds to awaitingReviewIds and clear banner IDs
      const updatedReviewIds = [
        ...state.awaitingReviewIds,
        ...state.awaitingBannerIds,
      ];
      return {
        ...state,
        awaitingReviewIds: updatedReviewIds,
        awaitingBannerIds: [],
      };
    },
    skipAllContacts: (state) => {
      // Skip all contacts from both awaiting arrays
      const newReviewedIds = [...state.reviewedIds];

      // Add all awaiting review IDs to reviewed
      state.awaitingReviewIds.forEach((id) => {
        if (!newReviewedIds.includes(id)) {
          newReviewedIds.push(id);
        }
      });

      // Add all awaiting banner IDs to reviewed
      state.awaitingBannerIds.forEach((id) => {
        if (!newReviewedIds.includes(id)) {
          newReviewedIds.push(id);
        }
      });

      return {
        ...state,
        awaitingReviewIds: [],
        awaitingBannerIds: [],
        reviewedIds: newReviewedIds,
      };
    },
  },
});

export const {
  setAwaitingReviewIds,
  setAwaitingBannerIds,
  setReviewedIds,
  finishReviewingId,
  skipAllAwaitingReviewedIds,
  addReviewedId,
  moveFromBannerToReview,
  skipAllContacts,
} = newContactReviewSlice.actions;

export default newContactReviewSlice.reducer;
