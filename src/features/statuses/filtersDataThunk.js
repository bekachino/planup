import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export const getExecuterTypes = createAsyncThunk(
  'user/getExecuters',
  async (noAlert, { rejectWithValue }) => {
    try {
      const req = await axiosApi('v2/resolution/');
      return await req.data;
    } catch {
      rejectWithValue('Ошибка при получении исполнителей');
    }
  }
);

export const getStatusTypes = createAsyncThunk(
  'user/getStatuses',
  async (noAlert, { rejectWithValue }) => {
    try {
      const req = await axiosApi('v2/status/');
      return await req.data;
    } catch {
      rejectWithValue('Ошибка при получении статусов');
    }
  }
);
