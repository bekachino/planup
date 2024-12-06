import { createSlice } from '@reduxjs/toolkit';
import { getWork, getWorks } from './worksThunk';

const initialState = {
  works: [],
  workFields: [],
  workChildTemplates: [],
  worksLoading: false,
  workLoading: false,
};

const WorksSlice = createSlice({
  name: 'works',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWorks.pending, (state) => {
      state.worksLoading = true;
      state.works = [];
    });
    builder.addCase(getWorks.fulfilled, (state, { payload: res }) => {
      state.worksLoading = false;
      state.works =
        (res || []).map((work) => [
          {
            id: work.id || null,
            name: 'Номер наряда' || null,
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
        ]) || [];
    });
    builder.addCase(getWorks.rejected, (state) => {
      state.worksLoading = false;
    });

    builder.addCase(getWork.pending, (state) => {
      state.workLoading = true;
      state.workFields = [];
    });
    builder.addCase(getWork.fulfilled, (state, { payload: res }) => {
      state.workLoading = false;
      state.workFields =
        [
          {
            name: 'Номер наряда',
            field_value: res.id || null,
          },
          {
            id: res.works[0].template.id || null,
            name: 'Шаблон',
            field_value: res.works[0].template.name || null,
          },
          {
            id: res.status.id || null,
            name: 'Статус',
            field_value: res.status.name || null,
          } || null,
          ...(res.works[0].fields || []),
        ] || [];
      state.workChildTemplates = res.works[0].child_templates;
    });
    builder.addCase(getWork.rejected, (state) => {
      state.workLoading = false;
    });
  },
});

export const worksReducer = WorksSlice.reducer;
export const {} = WorksSlice.actions;
