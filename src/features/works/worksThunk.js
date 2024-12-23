import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { addAlert } from '../data/dataSlice';
import { ERROR_MESSAGES } from '../../constants';

export const getWorks = createAsyncThunk(
  'data/getWorks',
  async ({ filtersData = {}, currentPage }, { dispatch, rejectWithValue }) => {
    try {
      const user_id_query = `&user_id=${filtersData?.user_id || []}`;
      const resolution_id_query = `&resolution_id=${filtersData?.resolution_id || []}`;
      const template_id_query = `&template_id=${filtersData?.template_id || []}`;
      const created_at_query = `&created_at=${filtersData?.created_at || []}`;
      const closed_at_query = `&closed_at=${filtersData?.closed_at || []}`;

      const req = await axiosApi(
        `/v2/order-list/?page=${currentPage || 1}${user_id_query}${resolution_id_query}${template_id_query}${created_at_query}${closed_at_query}`
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
