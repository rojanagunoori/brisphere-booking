// src/store/slices/commentsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define Comment type
interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

// Fetch comments by postId
export const fetchCommentsByPostId = createAsyncThunk('comments/fetchCommentsByPostId', async (postId: number) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  return response.data;
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},  // This is required but can be empty if no local reducers are needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch comments';
      });
  },
});

export default commentsSlice.reducer;
