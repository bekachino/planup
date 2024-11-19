import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  signInLoading: false,
};

const UsersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const userReducer = UsersSlice.reducer;
export const {} = UsersSlice.actions;
