import { createAsyncThunk } from '@reduxjs/toolkit';
import { addAlert } from '../data/dataSlice';
import { ERROR_MESSAGES } from '../../constants';
import axiosApi from '../../axiosApi';

export const signIn = createAsyncThunk(
  'user/signIn',
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi.post('accounts/token/', user);
      return await req.data;
    } catch (e) {
      dispatch(
        addAlert({
          type: 'error',
          message:
            ERROR_MESSAGES[e?.code !== 'ERR_NETWORK' ? e.response.status : 500],
        })
      );
      return rejectWithValue(
        ERROR_MESSAGES[e.response.status] || ERROR_MESSAGES[500]
      );
    }
  }
);
