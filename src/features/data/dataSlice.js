import { createSlice } from '@reduxjs/toolkit';
import {
  createResolution,
  createTemplate,
  deleteResolution,
  deleteTemplate,
  editResolution,
  editTemplate,
  getResolution,
  getTemplate,
} from './dataThunk';

const initialState = {
  searchValue: '',
  alerts: [],
  template: null,
  resolution: null,
  getTemplateLoading: false,
  getResolutionLoading: false,
  createTemplateLoading: false,
  editTemplateLoading: false,
  deleteTemplateLoading: false,
  deleteResolutionLoading: false,
  createResolutionLoading: false,
  editResolutionLoading: false,
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
    clearResolution: (state) => {
      state.resolution = null;
    },
    handleSearchValueChange: (state, { payload }) => {
      state.searchValue = payload;
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

    builder.addCase(getResolution.pending, (state) => {
      state.getResolutionLoading = true;
      state.resolution = null;
    });
    builder.addCase(getResolution.fulfilled, (state, { payload: res }) => {
      state.getResolutionLoading = false;
      state.resolution = res || null;
    });
    builder.addCase(getResolution.rejected, (state) => {
      state.getResolutionLoading = false;
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

    builder.addCase(deleteResolution.pending, (state) => {
      state.deleteResolutionLoading = true;
    });
    builder.addCase(deleteResolution.fulfilled, (state) => {
      state.deleteResolutionLoading = false;
    });
    builder.addCase(deleteResolution.rejected, (state) => {
      state.deleteResolutionLoading = false;
    });

    builder.addCase(createResolution.pending, (state) => {
      state.createResolutionLoading = true;
    });
    builder.addCase(createResolution.fulfilled, (state) => {
      state.createResolutionLoading = false;
    });
    builder.addCase(createResolution.rejected, (state) => {
      state.createResolutionLoading = false;
    });

    builder.addCase(editResolution.pending, (state) => {
      state.editResolutionLoading = true;
    });
    builder.addCase(editResolution.fulfilled, (state) => {
      state.editResolutionLoading = false;
    });
    builder.addCase(editResolution.rejected, (state) => {
      state.editResolutionLoading = false;
    });
  },
});

export const dataReducer = DataSlice.reducer;
export const { addAlert, removeAlert, clearResolution, handleSearchValueChange } =
  DataSlice.actions;
