// src/store/slices/albumsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define Album type
interface Album {
  userId: number;
  id: number;
  title: string;
}

interface AlbumsState {
  albums: Album[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AlbumsState = {
  albums: [],
  loading: false,
  error: null,
};

// Fetch albums by userId
export const fetchAlbumsByUserId = createAsyncThunk('albums/fetchAlbumsByUserId', async (userId: number) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
  return response.data;
});

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumsByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAlbumsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.albums = action.payload;
      })
      .addCase(fetchAlbumsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch albums';
      });
  },
});

export default albumsSlice.reducer;
