import { createSlice } from '@reduxjs/toolkit';
import { getExecuterTypes, getStatusTypes } from './filtersDataThunk';

const initialState = {
  executerTypes: [],
  statusTypes: [],
  resolutionTypes: [],
  templateTypes: [],
  squareTypes: [],
  executerTypesLoading: false,
  statusTypesLoading: false,
  resolutionTypesLoading: false,
  templateTypesLoading: false,
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
      state.executerTypes = res;
    });
    builder.addCase(getExecuterTypes.rejected, (state) => {
      state.executerTypesLoading = false;
    });

    builder.addCase(getStatusTypes.pending, (state) => {
      state.statusTypesLoading = true;
    });
    builder.addCase(getStatusTypes.fulfilled, (state, { payload: res }) => {
      state.statusTypesLoading = false;
      state.statusTypes = res;
    });
    builder.addCase(getStatusTypes.rejected, (state) => {
      state.statusTypesLoading = false;
    });
  },
});

export const filtersDataReducer = filtersDataSlice.reducer;
export const {} = filtersDataSlice.actions;
