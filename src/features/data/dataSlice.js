import { createSlice } from '@reduxjs/toolkit';
import {
  createTemplate,
  deleteTemplate,
  editTemplate,
  getTemplate,
} from './dataThunk';

const initialState = {
  alerts: [],
  template: null,
  getTemplateLoading: false,
  createTemplateLoading: false,
  editTemplateLoading: false,
  deleteTemplateLoading: false,
};

const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addAlert: (state, { payload }) => {
      const randomNumber1 = Math.random() * (20000 - 1000 + 1) + 1000;
      const randomNumber2 = Math.random() * (20000 - 1000 + 1) + 1000;
      const randomNumber3 = Math.random() * (20000 - 1000 + 1) + 1000;

      state.alerts.push({
        ...payload,
        id: `${randomNumber1 * randomNumber2 + randomNumber3}`,
        show: true,
      });
    },
    removeAlert: (state, { payload }) => {
      state.alerts.find((alert) => alert.id === payload).show = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTemplate.pending, (state) => {
      state.getTemplateLoading = true;
      state.template = null;
    });
    builder.addCase(getTemplate.fulfilled, (state, { payload: res }) => {
      state.getTemplateLoading = false;
      state.template = res || null;
    });
    builder.addCase(getTemplate.rejected, (state) => {
      state.getTemplateLoading = false;
    });

    builder.addCase(createTemplate.pending, (state) => {
      state.createTemplateLoading = true;
    });
    builder.addCase(createTemplate.fulfilled, (state) => {
      state.createTemplateLoading = false;
    });
    builder.addCase(createTemplate.rejected, (state) => {
      state.createTemplateLoading = false;
    });

    builder.addCase(editTemplate.pending, (state) => {
      state.editTemplateLoading = true;
    });
    builder.addCase(editTemplate.fulfilled, (state) => {
      state.editTemplateLoading = false;
    });
    builder.addCase(editTemplate.rejected, (state) => {
      state.editTemplateLoading = false;
    });
    
    builder.addCase(deleteTemplate.pending, (state) => {
      state.deleteTemplateLoading = true;
    });
    builder.addCase(deleteTemplate.fulfilled, (state) => {
      state.deleteTemplateLoading = false;
    });
    builder.addCase(deleteTemplate.rejected, (state) => {
      state.deleteTemplateLoading = false;
    });
  },
});

export const dataReducer = DataSlice.reducer;
export const { addAlert, removeAlert } = DataSlice.actions;
