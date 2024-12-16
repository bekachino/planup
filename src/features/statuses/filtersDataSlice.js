import { createSlice } from '@reduxjs/toolkit';
import {
  getCategories,
  getExecuterTypes,
  getResolutionTypes,
  getSquares,
  getStages,
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
  stages: [],
  categories: [],
  squares: [],
  executerTypesLoading: false,
  statusTypesLoading: false,
  resolutionTypesLoading: false,
  templateTypesLoading: false,
  templateFieldsLoading: false,
  squareTypesLoading: false,
  stagesLoading: false,
  categoriesLoading: false,
  squaresLoading: false,
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

    builder.addCase(getResolutionTypes.pending, (state) => {
      state.resolutionTypesLoading = true;
    });
    builder.addCase(getResolutionTypes.fulfilled, (state, { payload: res }) => {
      state.resolutionTypesLoading = false;
      state.resolutionTypes = (res || []).map((option) => ({
        ...option,
        category: 'resolutionTypes',
        index: 2,
      }));
    });
    builder.addCase(getResolutionTypes.rejected, (state) => {
      state.resolutionTypesLoading = false;
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
      state.templateTypes = [];
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
      state.templateFields = res?.map((field) => field?.field);
    });
    builder.addCase(getTemplateFields.rejected, (state) => {
      state.templateFieldsLoading = false;
    });

    builder.addCase(getStages.pending, (state) => {
      state.stagesLoading = true;
    });
    builder.addCase(getStages.fulfilled, (state, { payload: res }) => {
      state.stagesLoading = false;
      state.stages = res?.deal_types;
    });
    builder.addCase(getStages.rejected, (state) => {
      state.stagesLoading = false;
    });

    builder.addCase(getCategories.pending, (state) => {
      state.categoriesLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, { payload: res }) => {
      state.categoriesLoading = false;
      state.categories = res?.deal_types;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.categoriesLoading = false;
    });

    builder.addCase(getSquares.pending, (state) => {
      state.squaresLoading = true;
    });
    builder.addCase(getSquares.fulfilled, (state, { payload: res }) => {
      state.squaresLoading = false;
      state.squares = res || [];
    });
    builder.addCase(getSquares.rejected, (state) => {
      state.squaresLoading = false;
    });
  },
});

export const filtersDataReducer = filtersDataSlice.reducer;
//export const {} = filtersDataSlice.actions;
