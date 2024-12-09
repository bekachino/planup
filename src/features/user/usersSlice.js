import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: 'Админ',
    role: 'admin',
  },
  signInLoading: false,
};

const UsersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      console.log(payload);
      state.user = payload;
    },
  },
  extraReducers: () => {},
});

export const userReducer = UsersSlice.reducer;
export const { setUser } = UsersSlice.actions;
