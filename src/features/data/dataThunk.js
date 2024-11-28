import { createAsyncThunk } from '@reduxjs/toolkit';
import { ERROR_MESSAGES } from '../../constants';
import { addAlert } from './dataSlice';
import axiosApi from '../../axiosApi';

export const createTemplate = createAsyncThunk(
  'data/createTemplate',
  async (template, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi.post('/v2/template/', template);
      return await req.data;
    } catch (e) {
      dispatch(
        addAlert({
          type: 'error',
          message: ERROR_MESSAGES[e?.response?.status || 500],
        })
      );
      return rejectWithValue(
        ERROR_MESSAGES[e.response.status] || ERROR_MESSAGES[500]
      );
    }
  }
);
