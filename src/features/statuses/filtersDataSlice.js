import { createSlice } from '@reduxjs/toolkit';
import {
  getExecuterTypes,
  getStatusTypes,
  getTemplateFields,
  getTemplateTypes,
} from './filtersDataThunk';

const initialState = {
  executerTypes: [],
  statusTypes: [],
  resolutionTypes: [],
  templateTypes: [],
  templateFields: [],
  squareTypes: [],
  executerTypesLoading: false,
  statusTypesLoading: false,
  resolutionTypesLoading: false,
  templateTypesLoading: false,
  templateFieldsLoading: false,
  squareTypesLoading: false,
};

const filtersDataSlice = createSlice({
  name: 'filtersData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExecuterTypes.pending, (state) => {
      state.executerTypesLoading = true;
    });
    builder.addCase(getExecuterTypes.fulfilled, (state, { payload: res }) => {
      state.executerTypesLoading = false;
      state.executerTypes = (res || []).map((option) => ({
        ...option,
        category: 'executerTypes',
        index: 1,
      }));
    });
    builder.addCase(getExecuterTypes.rejected, (state) => {
      state.executerTypesLoading = false;
    });

    builder.addCase(getStatusTypes.pending, (state) => {
      state.statusTypesLoading = true;
    });
    builder.addCase(getStatusTypes.fulfilled, (state, { payload: res }) => {
      state.statusTypesLoading = false;
      state.statusTypes = (res || []).map((option) => ({
        ...option,
        category: 'statusTypes',
        index: 4,
      }));
    });
    builder.addCase(getStatusTypes.rejected, (state) => {
      state.statusTypesLoading = false;
    });

    builder.addCase(getTemplateTypes.pending, (state) => {
      state.templateTypesLoading = true;
    });
    builder.addCase(getTemplateTypes.fulfilled, (state, { payload: res }) => {
      state.templateTypesLoading = false;
      state.templateTypes = (res || []).map((option) => ({
        ...option,
        category: 'templateTypes',
        index: 3,
      }));
    });
    builder.addCase(getTemplateTypes.rejected, (state) => {
      state.templateTypesLoading = false;
    });

    builder.addCase(getTemplateFields.pending, (state) => {
      state.templateFieldsLoading = true;
    });
    builder.addCase(getTemplateFields.fulfilled, (state, { payload: res }) => {
      state.templateFieldsLoading = false;
      state.templateFields = res.map((field) => field?.field);
    });
    builder.addCase(getTemplateFields.rejected, (state) => {
      state.templateFieldsLoading = false;
    });
  },
});

export const filtersDataReducer = filtersDataSlice.reducer;
export const {} = filtersDataSlice.actions;
