import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { addAlert } from '../data/dataSlice';

export const getExecuterTypes = createAsyncThunk(
  'user/getExecuterTypes',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi('v2/resolution/');
      return (await req.data) || [];
    } catch (e) {
      dispatch(
        addAlert({
          type: 'error',
          message: 'Ошибка при получении исполнителей',
        })
      );
      rejectWithValue('Ошибка при получении исполнителей');
    }
  }
);

export const getResolutionTypes = createAsyncThunk(
  'user/getResolutionTypes',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi('v2/resolution/');
      return (await req.data) || [];
    } catch (e) {
      dispatch(
        addAlert({
          type: 'error',
          message: 'Ошибка при получении резолюций',
        })
      );
      rejectWithValue('Ошибка при получении резолюций');
    }
  }
);

export const getStatusTypes = createAsyncThunk(
  'user/getStatusTypes',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi('v2/status/');
      return (await req.data) || [];
    } catch (e) {
      dispatch(
        addAlert({
          type: 'error',
          message: 'Ошибка при получении статусов',
        })
      );
      rejectWithValue('Ошибка при получении статусов');
    }
  }
);

export const getTemplateTypes = createAsyncThunk(
  'user/getTemplateTypes',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi('v2/template/');
      return (await req.data) || [];
    } catch (e) {
      dispatch(
        addAlert({
          type: 'error',
          message: 'Ошибка при получении шаблонов',
        })
      );
      rejectWithValue('Ошибка при получении шаблонов');
    }
  }
);

export const getTemplateFields = createAsyncThunk(
  'user/getTemplateFields',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi('v2/field/');
      return (await req.data) || [];
    } catch (e) {
      dispatch(
        addAlert({
          type: 'error',
          message: 'Ошибка при получении полей',
        })
      );
      rejectWithValue('Ошибка при получении полей');
    }
  }
);

export const getStages = createAsyncThunk(
  'user/getStages',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi('v2/stage/');
      return (await req.data) || [];
    } catch (e) {
      dispatch(
        addAlert({
          type: 'error',
          message: 'Ошибка при получении типов работы',
        })
      );
      rejectWithValue('Ошибка при получении типов работы');
    }
  }
);

export const getCategories = createAsyncThunk(
  'user/getCategories',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi('v2/category/');
      return (await req.data) || [];
    } catch (e) {
      dispatch(
        addAlert({
          type: 'error',
          message: 'Ошибка при получении типов категориев',
        })
      );
      rejectWithValue('Ошибка при получении типов категориев');
    }
  }
);
