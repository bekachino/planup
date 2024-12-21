import { createSlice } from '@reduxjs/toolkit';
import { getWork, getWorkFields, getWorks } from './worksThunk';

const initialState = {
  works: [],
  workFields: [],
  workChildTemplates: [],
  availFields: [],
  shownFields: [
    'Номер наряда',
    'Битрикс ID',
    'Шаблон',
    'Статус',
    'Дата создания',
    'Дата закрытия',
  ],
  worksLoading: false,
  workLoading: false,
  workFieldsLoading: false,
  availFieldsLoading: false,
};

const WorksSlice = createSlice({
  name: 'works',
  initialState,
  reducers: {
    setShownFields: (state, { payload }) => {
      state.shownFields = payload || state.shownFields;
    },
  },
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
            name: 'Битрикс ID' || null,
            field_value: work.bitrix_id || null,
          },
          {
            id: work.status.id || null,
            name: 'Статус' || null,
            field_value: work.status.name || null,
          },
          {
            id: work.works[0]?.template.id || null,
            name: 'Шаблон',
            field_value: work.works[0]?.template.name || null,
          },
          {
            name: 'Дата создания',
            field_value: work.created_at || null,
          } || null,
          {
            name: 'Дата закрытия',
            field_value: work.closed_at || null,
          } || null,
          ...(work.works[0]?.fields || []),
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
            name: 'Шаблон',
            id: res.works[0]?.template.id || null,
            field_value: res.works[0]?.template.name || null,
          },
          {
            name: 'Статус',
            field_value: res.status.name || null,
          } || null,
          ...(res.works[0]?.fields || []),
        ] || [];
      state.workChildTemplates = res.works[0]?.child_templates;
    });
    builder.addCase(getWork.rejected, (state) => {
      state.workLoading = false;
    });

    builder.addCase(getWorkFields.pending, (state) => {
      state.availFieldsLoading = false;
      state.availFields = [];
    });
    builder.addCase(getWorkFields.fulfilled, (state, { payload: res }) => {
      state.availFieldsLoading = false;

      const filteredList = (res || [])
        .filter(
          (field) => !['Номер наряда', 'Шаблон', 'Статус'].includes(field.name)
        )
        .map((field) => field.name);

      state.availFields = [
        'Номер наряда',
        'Битрикс ID',
        'Шаблон',
        'Статус',
        'Дата создания',
        'Дата закрытия',
        ...filteredList,
      ];
    });
    builder.addCase(getWorkFields.rejected, (state) => {
      state.availFieldsLoading = false;
    });
  },
});

export const worksReducer = WorksSlice.reducer;
export const { setShownFields } = WorksSlice.actions;
