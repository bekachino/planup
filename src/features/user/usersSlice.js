import { createSlice } from '@reduxjs/toolkit';
import { signIn } from './userThunk';

const initialState = {
  user: null,
  signInLoading: false,
};

const UsersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.signInLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, { payload: res }) => {
      state.signInLoading = false;
      state.user = {
        name: res.username,
        role: res.role,
        token: res.access,
      };
    });
    builder.addCase(signIn.rejected, (state) => {
      state.signInLoading = false;
    });
  },
});

export const userReducer = UsersSlice.reducer;
export const { logout } = UsersSlice.actions;
