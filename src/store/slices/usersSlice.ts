import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the types for User, Album, Todo, and Post
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
}

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface UsersState {
  users: User[]; // This should be an array of users
  user: User | null;
  albums: Album[];
  todos: Todo[];
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  user: null,
  albums: [],
  todos: [],
  posts: [],
  loading: false,
  error: null,
};

// Fetch the list of users
export const fetchUser = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

// Fetch user by ID
export const fetchUserById = createAsyncThunk('users/fetchUserById', async (userId: number) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
  return response.data;
});

// Fetch albums for a specific user
export const fetchAlbumsByUserId = createAsyncThunk('users/fetchAlbumsByUserId', async (userId: number) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
  return response.data;
});

// Fetch todos for a specific user
export const fetchTodosByUserId = createAsyncThunk('users/fetchTodosByUserId', async (userId: number) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
  return response.data;
});

// Fetch posts for a specific user
export const fetchPostsByUserId = createAsyncThunk('users/fetchPostsByUserId', async (userId: number) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch the list of users
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;  // Set users list to the fetched data
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch users';
      })
      // Fetch user by ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch user';
      })
      // Fetch albums for a specific user
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
      })
      // Fetch todos for a specific user
      .addCase(fetchTodosByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodosByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodosByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch todos';
      })
      // Fetch posts for a specific user
      .addCase(fetchPostsByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch posts';
      });
  },
});

export default usersSlice.reducer;
