import { createSlice } from '@reduxjs/toolkit';
import { getWorks } from './worksThunk';

const initialState = {
  works: [],
  worksLoading: false,
};

const WorksSlice = createSlice({
  name: 'works',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWorks.pending, (state) => {
      state.worksLoading = true;
    });
    builder.addCase(getWorks.fulfilled, (state, { payload: res }) => {
      state.worksLoading = false;
      state.works = (res || []).map((work) => [
        {
          id: work.id || null,
          name: 'ID' || null,
          field_value: work.id || null,
        },
        {
          id: work.bitrix_id || null,
          name: 'Б24' || null,
          field_value: work.bitrix_id || null,
        },
        {
          id: work.status.id || null,
          name: 'Статус' || null,
          field_value: work.status.name || null,
        },
        {
          id: work.works[0].template.id || null,
          name: 'Шаблон',
          field_value: work.works[0].template.name || null,
        },
        ...(work.works[0].fields || []),
      ]);
    });
    builder.addCase(getWorks.rejected, (state) => {
      state.worksLoading = false;
    });
  },
});

export const worksReducer = WorksSlice.reducer;
export const {} = WorksSlice.actions;
