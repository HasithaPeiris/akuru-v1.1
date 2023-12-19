import { createSlice } from "@reduxjs/toolkit";

export const fontSlice = createSlice({
  name: "font",
  initialState: {
    fonts: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL FONTS
    getFontStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getFontSuccess: (state, action) => {
      state.isFetching = false;
      state.fonts = action.payload;
    },
    getFontFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //DELETE FONT
    deleteFontStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteFontSuccess: (state, action) => {
      state.isFetching = false;
      state.fonts.splice(
        state.fonts.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteFontFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //UPDATE FONT
    updateFontStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateFontSuccess: (state, action) => {
      state.isFetching = false;
      state.fonts[
        state.fonts.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.font;
    },
    updateFontFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //ADD FONT
    addFontStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addFontSuccess: (state, action) => {
      state.isFetching = false;
      state.fonts.push(action.payload);
    },
    addFontFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getFontStart,
  getFontSuccess,
  getFontFailure,
  deleteFontStart,
  deleteFontSuccess,
  deleteFontFailure,
  updateFontStart,
  updateFontSuccess,
  updateFontFailure,
  addFontStart,
  addFontSuccess,
  addFontFailure,
} = fontSlice.actions;

export default fontSlice.reducer;
