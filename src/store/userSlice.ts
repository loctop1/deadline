import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  users: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentPage: number;
}

const initialState: UserState = {
  users: [],
  status: 'idle',
  error: null,
  currentPage: 1,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page: number) => {
    const response = await axios.get(
      `https://randomuser.me/api/?page=${page}&results=10`,
    );
    return response.data.results;
  },
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setCurrentPage } = userSlice.actions;

export default userSlice.reducer;
