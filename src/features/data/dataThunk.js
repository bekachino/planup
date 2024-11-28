import { createAsyncThunk } from '@reduxjs/toolkit';
import { ERROR_MESSAGES } from '../../constants';
import { addAlert } from './dataSlice';
import axiosApi from '../../axiosApi';

export const getTemplate = createAsyncThunk(
  'data/getTemplate',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi(`/v2/template/${id}/`);
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

export const editTemplate = createAsyncThunk(
  'data/editTemplate',
  async (template, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi.put(`/v2/template/${template?.id}/`, template);
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
