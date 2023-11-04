import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = process.env.API_URL || "http://localhost:3004";

export const fetchSuggestion = createAsyncThunk(
  "suggestion/fetchSuggestion",
  async () => {
    const response = await fetch(`${API_URL}/api/suggestion`);
    const { data } = await response.json();
    return data;
  }
);

const initialState = {
  suggestion: "",
  loading: false,
  error: true,
};

const options = {
  name: "suggestion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestion.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestion = action.payload;
        state.error = false;
      })
      .addCase(fetchSuggestion.rejected, (state, action) => {
        console.log(action.error);
        state.loading = false;
        state.error = true;
      });
  },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

export const selectSuggestion = (state) => state.suggestion.suggestion;
export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
