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
          message: ERROR_MESSAGES[e?.code !== 'ERR_NETWORK' ? e.response.status : 500],
        })
      );
      return rejectWithValue(
        ERROR_MESSAGES[e.response.status] || ERROR_MESSAGES[500]
      );
    }
  }
);

export const getResolution = createAsyncThunk(
  'data/getResolution',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi(`/v2/resolution/${id}/`);
      return await req.data;
    } catch (e) {
      dispatch(
        addAlert({
          type: 'error',
          message: ERROR_MESSAGES[e?.code !== 'ERR_NETWORK' ? e.response.status : 500],
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
          message: ERROR_MESSAGES[e?.code !== 'ERR_NETWORK' ? e.response.status : 500],
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
          message: ERROR_MESSAGES[e?.code !== 'ERR_NETWORK' ? e.response.status : 500],
        })
      );
      return rejectWithValue(
        ERROR_MESSAGES[e.response.status] || ERROR_MESSAGES[500]
      );
    }
  }
);

export const deleteTemplate = createAsyncThunk(
  'data/deleteTemplate',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi.delete(`/v2/template/${id}/`);
      return await req.data;
    } catch (e) {
      dispatch(
        addAlert({
          type: 'error',
          message: ERROR_MESSAGES[e?.code !== 'ERR_NETWORK' ? e.response.status : 500],
        })
      );
      return rejectWithValue(
        ERROR_MESSAGES[e.response.status] || ERROR_MESSAGES[500]
      );
    }
  }
);

export const deleteResolution = createAsyncThunk(
  'data/deleteResolution',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi.delete(`/v2/resolution/${id}/`);
      return await req.data;
    } catch (e) {
      dispatch(
        addAlert({
          type: 'error',
          message: ERROR_MESSAGES[e?.code !== 'ERR_NETWORK' ? e.response.status : 500],
        })
      );
      return rejectWithValue(
        ERROR_MESSAGES[e.response.status] || ERROR_MESSAGES[500]
      );
    }
  }
);

export const createResolution = createAsyncThunk(
  'data/createResolution',
  async (resolution, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi.post('/v2/resolution/', resolution);
      return await req.data;
    } catch (e) {
      dispatch(
        addAlert({
          type: 'error',
          message: ERROR_MESSAGES[e?.code !== 'ERR_NETWORK' ? e.response.status : 500],
        })
      );
      return rejectWithValue(
        ERROR_MESSAGES[e.response.status] || ERROR_MESSAGES[500]
      );
    }
  }
);

export const editResolution = createAsyncThunk(
  'data/editResolution',
  async (resolution, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi.put(
        `/v2/resolution/${resolution?.id}/`,
        resolution
      );
      return await req.data;
    } catch (e) {
      dispatch(
        addAlert({
          type: 'error',
          message: ERROR_MESSAGES[e?.code !== 'ERR_NETWORK' ? e.response.status : 500],
        })
      );
      return rejectWithValue(
        ERROR_MESSAGES[e.response.status] || ERROR_MESSAGES[500]
      );
    }
  }
);

export const getLocations = createAsyncThunk(
  'data/getLocations',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi(`/accounts/locations/`);
      return (await req.data) || [];
    } catch (e) {
      dispatch(
        addAlert({
          type: 'error',
          message: ERROR_MESSAGES[e?.code !== 'ERR_NETWORK' ? e.response.status : 500],
        })
      );
      return rejectWithValue(
        ERROR_MESSAGES[e.response.status] || ERROR_MESSAGES[500]
      );
    }
  }
);

export const getServiceEngineers = createAsyncThunk(
  'data/getServiceEngineers',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi(`/accounts/service_engineer/`);
      return (await req.data) || [];
    } catch (e) {
      dispatch(
        addAlert({
          type: 'error',
          message: ERROR_MESSAGES[e?.code !== 'ERR_NETWORK' ? e.response.status : 500],
        })
      );
      return rejectWithValue(
        ERROR_MESSAGES[e.response.status] || ERROR_MESSAGES[500]
      );
    }
  }
);

export const getSectionChiefs = createAsyncThunk(
  'data/getSectionChiefs',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi(`/accounts/section_chiefs/`);
      return (await req.data) || [];
    } catch (e) {
      dispatch(
        addAlert({
          type: 'error',
          message: ERROR_MESSAGES[e?.code !== 'ERR_NETWORK' ? e.response.status : 500],
        })
      );
      return rejectWithValue(
        ERROR_MESSAGES[e.response.status] || ERROR_MESSAGES[500]
      );
    }
  }
);

export const createSquare = createAsyncThunk(
  'data/createSquare',
  async (square, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi.post('/accounts/squares/', square);
      return await req.data;
    } catch (e) {
      dispatch(
        addAlert({
          type: 'error',
          message: ERROR_MESSAGES[e?.code !== 'ERR_NETWORK' ? e.response.status : 500],
        })
      );
      return rejectWithValue(
        ERROR_MESSAGES[e.response.status] || ERROR_MESSAGES[500]
      );
    }
  }
);
