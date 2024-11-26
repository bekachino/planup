import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export const getExecuterTypes = createAsyncThunk(
  'user/getExecuterTypes',
  async (noAlert, { rejectWithValue }) => {
    try {
      const req = await axiosApi('v2/resolution/');
      return (await req.data) || [];
    } catch {
      rejectWithValue('Ошибка при получении исполнителей');
    }
  }
);

export const getStatusTypes = createAsyncThunk(
  'user/getStatusTypes',
  async (noAlert, { rejectWithValue }) => {
    try {
      const req = await axiosApi('v2/status/');
      return (await req.data) || [];
    } catch {
      rejectWithValue('Ошибка при получении статусов');
    }
  }
);

export const getTemplateTypes = createAsyncThunk(
  'user/getTemplateTypes',
  async (noAlert, { rejectWithValue }) => {
    try {
      const req = await axiosApi('v2/template/');
      return (await req.data) || [];
    } catch {
      rejectWithValue('Ошибка при получении шаблонов');
    }
  }
);
