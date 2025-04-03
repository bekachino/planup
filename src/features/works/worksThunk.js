import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { addAlert } from '../data/dataSlice';
import { ERROR_MESSAGES } from '../../constants';

export const getWorks = createAsyncThunk(
  'data/getWorks',
  async (
    { filtersData = {}, currentPage, searchWord = '' },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const user_id_query = `&user_id=${filtersData?.user_id || []}`;
      const resolution_id_query = `&resolution_id=${filtersData?.resolution_id || []}`;
      const template_id_query = `&template_id=${filtersData?.template_id || []}`;
      const status_id_query = `&status_id=${filtersData?.status_id || []}`;
      const squares_id_query = `&squares_id=${filtersData?.squares_id || []}`;
      const created_at_query = `&created_at=${filtersData?.created_at || []}`;
      const closed_at_query = `&closed_at=${filtersData?.closed_at || []}`;
      const date_of_arrival_start_query = `&date_of_arrival=${filtersData?.date_of_arrival || []}`;
      const search_word_query = `&order_id=${searchWord || ''}`;

      const req = await axiosApi(
        `/v2/order-list/?page_size=50&page=${currentPage || 1}${user_id_query}${resolution_id_query}${status_id_query}${template_id_query}${created_at_query}${closed_at_query}${squares_id_query}${date_of_arrival_start_query}${search_word_query}`
      );
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

export const getWorkFields = createAsyncThunk(
  'data/getWorkFields',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosApi(`v2/use-fields/`);
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

export const createWork = createAsyncThunk(
  'data/createWork',
  async (work, { dispatch, rejectWithValue }) => {
    try {
      await axiosApi.post(`/v2/order-create/${work?.template_id}/`, work);
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

export const editWork = createAsyncThunk(
  'data/updateWork',
  async ({ formData, id }, { dispatch, rejectWithValue }) => {
    try {
      await axiosApi.put(`/v2/order-update/${id}/`, formData);
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

export const deleteWork = createAsyncThunk(
  'data/deleteWork',
  async (workId, { dispatch, rejectWithValue }) => {
    try {
      await axiosApi.delete(`/v2/order-delete/${workId}/`);
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
