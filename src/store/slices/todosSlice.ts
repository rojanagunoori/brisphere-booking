// src/store/slices/todosSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define Todo type
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    return response.data;
  });

// Fetch todos by userId
export const fetchTodosByUserId = createAsyncThunk('todos/fetchTodosByUserId', async (userId: number) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
  return response.data;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default todosSlice.reducer;
