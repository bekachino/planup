import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { addAlert } from '../data/dataSlice';
import { ERROR_MESSAGES } from '../../constants';

export const getWorks = createAsyncThunk(
  'data/getWorks',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi(`/v2/order-list/`);
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

export const getWork = createAsyncThunk(
  'data/getWork',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi(`/v2/order/${id}/`);
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
