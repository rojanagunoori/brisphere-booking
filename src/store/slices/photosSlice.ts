// src/store/slices/photosSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define Photo type
interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface PhotosState {
  photos: Photo[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: PhotosState = {
  photos: [],
  loading: false,
  error: null,
};

// Fetch photos by albumId
export const fetchPhotosByAlbumId = createAsyncThunk('photos/fetchPhotosByAlbumId', async (albumId: number) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
  return response.data;
});

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotosByAlbumId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPhotosByAlbumId.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = action.payload;
      })
      .addCase(fetchPhotosByAlbumId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch photos';
      });
  },
});

export default photosSlice.reducer;
