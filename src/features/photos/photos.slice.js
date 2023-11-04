import { createSlice } from '@reduxjs/toolkit';
import { selectSearchTerm } from '../search/search.slice';
import photos from './photos.data.js';

const initialState = {
  photos,
};

const options = {
  name: 'photos',
  initialState,
  reducers: {
    addPhoto(state, action) {
      state.photos.unshift(action.payload);
    },
    removePhoto(state, action) {
      const photo = state.photos.find((photo) => photo.id === action.payload);
      const index = state.photos.indexOf(photo);
      state.photos.splice(index, 1);
    },
  },
};

const photosSlice = createSlice(options);

export const { addPhoto, removePhoto } = photosSlice.actions;

export default photosSlice.reducer;

export const selectAllPhotos = (state) => state.photos.photos;
export const selectFilteredPhotos = (state) => {
  const searchTerm = selectSearchTerm(state).toLowerCase();
  return searchTerm ? state.photos.photos.filter((photo) => (photo.caption.toLowerCase()).includes(searchTerm)) : selectAllPhotos(state);
}
