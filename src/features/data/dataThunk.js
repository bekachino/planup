import { createAsyncThunk } from '@reduxjs/toolkit';
import { ERROR_MESSAGES } from '../../constants';
import { addAlert } from './dataSlice';
import axiosApi from '../../axiosApi';

export const getTemplate = createAsyncThunk(
  'data/getTemplate',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi(`/v2/template/${id}/`);
      return (await req.data) || null;
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

export const getResolution = createAsyncThunk(
  'data/getResolution',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi(`/v2/resolution/${id}/`);
      return (await req.data) || null;
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

export const getSquare = createAsyncThunk(
  'data/getSquare',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi(`/accounts/squares/${id}/`);
      return (await req.data) || null;
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

export const createTemplate = createAsyncThunk(
  'data/createTemplate',
  async (template, { dispatch, rejectWithValue }) => {
    try {
      await axiosApi.post('/v2/template/', template);
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

export const editTemplate = createAsyncThunk(
  'data/editTemplate',
  async (template, { dispatch, rejectWithValue }) => {
    try {
      await axiosApi.put(`/v2/template/${template?.id}/`, template);
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

export const deleteSquare = createAsyncThunk(
  'data/deleteSquare',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi.delete(`/accounts/squares/${id}/`);
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

export const createResolution = createAsyncThunk(
  'data/createResolution',
  async (resolution, { dispatch, rejectWithValue }) => {
    try {
      await axiosApi.post('/v2/resolution/', resolution);
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

export const editResolution = createAsyncThunk(
  'data/editResolution',
  async (resolution, { dispatch, rejectWithValue }) => {
    try {
      await axiosApi.put(`/v2/resolution/${resolution?.id}/`, resolution);
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

export const getServiceEngineer = createAsyncThunk(
  'data/getServiceEngineer',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi(`/accounts/service_engineer/${id}/`);
      return (await req.data) || [];
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

export const deleteServiceEngineer = createAsyncThunk(
  'data/deleteServiceEngineer',
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      await axiosApi.delete(`/accounts/service_engineer/${userId}/`);
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

export const getSectionChiefs = createAsyncThunk(
  'data/getSectionChiefs',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi(`/accounts/section_chiefs/`);
      return (await req.data) || [];
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

export const getSectionChief = createAsyncThunk(
  'data/getSectionChief',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi(`/accounts/section_chiefs/${id}/`);
      return (await req.data) || [];
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

export const editSectionChief = createAsyncThunk(
  'data/editSectionChief',
  async (sectionChief, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.keys(sectionChief).forEach((key) =>
        formData.append(key, sectionChief[key])
      );

      await axiosApi.put(
        `/accounts/section_chiefs/${sectionChief?.section_chief_id}/`,
        formData
      );
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

export const deleteSectionChief = createAsyncThunk(
  'data/deleteSectionChief',
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      await axiosApi.delete(`/accounts/section_chiefs/${userId}/`);
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

export const createSquare = createAsyncThunk(
  'data/createSquare',
  async (square, { dispatch, rejectWithValue }) => {
    try {
      await axiosApi.post('/accounts/squares/', square);
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

export const editSquare = createAsyncThunk(
  'data/editSquare',
  async (square, { dispatch, rejectWithValue }) => {
    try {
      await axiosApi.put(`/accounts/squares/${square?.id}/`, square);
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

export const getUsers = createAsyncThunk(
  'data/getUsers',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi(`/accounts/users/`);
      return (await req.data) || [];
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

export const getUser = createAsyncThunk(
  'data/getUser',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi(`/accounts/users/${id}/`);
      return (await req.data) || null;
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

export const createUser = createAsyncThunk(
  'data/createUser',
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.keys(user).forEach((key) => formData.append(key, user[key]));

      await axiosApi.post('/accounts/users/', formData);
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

export const editUser = createAsyncThunk(
  'data/editUser',
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.keys(user).forEach((key) => formData.append(key, user[key]));

      await axiosApi.put(`/accounts/users/${user?.id}/`, formData);
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

export const createSectionChief = createAsyncThunk(
  'data/createSectionChief',
  async (sectionChief, { dispatch, rejectWithValue }) => {
    try {
      await axiosApi.post('/accounts/section_chiefs/', sectionChief);
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

export const createServiceEngineer = createAsyncThunk(
  'data/createServiceEngineer',
  async (serviceEngineer, { dispatch, rejectWithValue }) => {
    try {
      await axiosApi.post('/accounts/service_engineer/', serviceEngineer);
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

export const updatePassword = createAsyncThunk(
  'data/updatePassword',
  async ({ user, userId }, { dispatch, rejectWithValue }) => {
    try {
      await axiosApi.post(`/accounts/users/${userId}/change-password/`, user);
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

export const deleteUser = createAsyncThunk(
  'data/deleteUser',
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      await axiosApi.delete(`/accounts/users/${userId}/`);
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
