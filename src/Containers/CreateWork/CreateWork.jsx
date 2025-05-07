import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { getTemplate, getUsers } from '../../features/data/dataThunk';
import { ReactComponent as ArrowPointerRight } from '../../assets/arrow-pointer-right.svg';
import Button from '../../Components/Button/Button';
import { DATA_TYPES } from '../../constants';
import Input from '../../Components/Input/Input';
import DatetimePicker from '../../Components/DatetimePicker/DatetimePicker';
import FileUpload from '../../Components/FileUpload/FileUpload';
import Autocomplete from '../../Components/Autocomplete/Autocomplete';
import { createWork, editWork, getWork } from '../../features/works/worksThunk';
import moment from 'moment';
import {
  getResolutionTypes,
  getStatusTypes,
} from '../../features/statuses/filtersDataThunk';
import { clearFormatPhoneNumber } from '../../utils';
import { nanoid } from 'nanoid';
import './createWork.css';

const CreateWork = ({ isEdit }) => {
  const navigate = useNavigate();
  const { templateId, workId } = useParams();
  const dispatch = useDispatch();
  const { template, getTemplateLoading, usersLoading } = useAppSelector(
    (state) => state.dataState
  );
  const { createWorkLoading, editWorkLoading } = useAppSelector(
    (state) => state.worksState
  );
  const { statusTypesLoading, resolutionTypesLoading } = useAppSelector(
    (state) => state.filtersDataState
  );
  const [state, setState] = useState([]);
  const [oldState, setOldState] = useState([]);
  const [work, setWork] = useState(null);

  console.log(state);

  useEffect(() => {
    const getEditWorkFieldsData = async () => {
      const resolutionTypes = await dispatch(getResolutionTypes());
      const statusTypes = await dispatch(getStatusTypes());
      const users = await dispatch(getUsers());

      dispatch(getWork(workId)).then(({ payload }) => {
        if (!payload?.works) return;
        const fieldsList = [
          ...[
            ...(payload?.works || [])?.[0]?.fields,
            ...((payload?.works || [])?.[0]?.child_templates || [])?.flatMap(
              (child_template) =>
                (child_template?.fields || []).map((child_template_field) => ({
                  ...child_template_field,
                  is_child_template: true,
                  child_template_name: child_template?.template?.name || '',
                }))
            ),
          ].map((field) => ({
            ...field,
            field_value:
              field?.name === 'Желаемая дата  приезда' && !!field?.field_value
                ? moment(field?.field_value).format('DD.MM.YYYY HH:mm')
                : field?.field_value || '',
            field_id: !!field?.is_child_template
              ? `${field?.id} - ${field?.child_template_name}`
              : field?.id,
            id: !!field?.is_child_template
              ? `${field?.id} - ${field?.child_template_name}`
              : field?.id,
          })),
          {
            field_id: nanoid(),
            data_type: 'list',
            field_value: payload?.status,
            id: payload?.status?.id,
            name: 'Статус',
            values: statusTypes?.payload,
          },
          {
            field_id: `${nanoid()}123`,
            data_type: 'list',
            field_value: payload?.resolution?.name,
            id: payload?.resolution?.id,
            name: 'Резолюция',
            values: resolutionTypes?.payload,
          },
          {
            field_id: nanoid(),
            data_type: 'list',
            field_value: payload?.user_id?.name,
            id: payload?.user_id?.id,
            name: 'Исполнитель',
            values: (users?.payload || []).map((user) => ({
              ...user,
              name: user?.full_name || '',
            })),
          },
        ];
        setState(fieldsList);
        setOldState(fieldsList);
        setWork(payload);
      });
    };

    dispatch(getTemplate(templateId));
    if (isEdit) {
      void getEditWorkFieldsData();
    }
  }, [dispatch, templateId, workId, isEdit]);

  const handleChange = (field_id, field_value) => {
    setState((prevState) => {
      const existingIndex = prevState.findIndex(
        (field) => field.field_id === field_id
      );

      if (existingIndex !== -1) {
        const updatedState = [...prevState];
        updatedState[existingIndex] = {
          ...updatedState[existingIndex],
          field_value,
          is_edited: true,
        };
        return updatedState;
      } else {
        return [
          ...prevState,
          {
            field_id,
            field_value,
            is_edited: true,
          },
        ];
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      const formData = new FormData();

      if (!!work?.works?.[0]?.child_templates) {
        const editedChildTemplates = state
          .filter((field) => field.is_edited)
          .map((field) => field?.child_template_name)
          .filter((field) => !!field);
        formData.append('type_work', JSON.stringify(editedChildTemplates));
      } else formData.append('type_work', JSON.stringify([]));

      formData.append('is_web', true);
      formData.append('id', work?.id || null);
      formData.append('bitrix_id', work?.bitrix_id || null);
      formData.append(
        'resolution',
        state.find((field) => field?.name === 'Резолюция')?.field_value?.id ||
          work?.resolution?.id ||
          null
      );
      formData.append(
        'status',
        state.find((field) => field?.name === 'Статус')?.field_value?.id ||
          work?.status?.id ||
          null
      );
      formData.append(
        'user_id',
        state.find((field) => field?.name === 'Исполнитель')?.field_value?.id ||
          work?.user_id?.id ||
          null
      );

      state
        .filter(
          (field) =>
            !['phone_number', 'phone_number_2'].includes(field?.field_id)
        )
        ?.filter((field) => field?.is_edited && field?.field_id)
        ?.forEach((field, i) => {
          if (
            !!field?.field_value &&
            !['Статус', 'Резолюция', 'Исполнитель'].includes(field?.name)
          ) {
            if (field?.field_id !== 'fio') {
              formData.append(
                `works[${i}][field_value]`,
                field?.data_type === 'url'
                  ? field?.field_value
                  : field?.field_value?.name || field?.field_value
              );
            } else {
              formData.append(
                `works[${i}][field_value]`,
                JSON.stringify({
                  [state?.find((field) => field?.field_id === 'fio')
                    ?.field_value || '']: [
                    clearFormatPhoneNumber(
                      state?.find((field) => field?.field_id === 'phone_number')
                        ?.field_value
                    ) || '',
                    clearFormatPhoneNumber(
                      state?.find(
                        (field) => field?.field_id === 'phone_number_2'
                      )?.field_value
                    ) || '',
                  ],
                })
              );
              formData.append(
                `works[${i}][field_id]`,
                (
                  work?.works[0]?.child_templates.flatMap(
                    (child_template) => child_template?.fields || []
                  ) || []
                ).find((field) => field?.name === 'Контакт')?.id
              );
              formData.append(
                `works[${i}][work_id]`,
                (
                  work?.works[0]?.child_templates.flatMap(
                    (child_template) => child_template?.fields || []
                  ) || []
                ).find((field) => field?.name === 'Контакт')?.work_id
              );
            }
            if (field?.field_id && field?.field_id !== 'fio') {
              formData.append(
                `works[${i}][field_id]`,
                !!field?.is_child_template
                  ? Number(field.field_id.split(' - ')[0])
                  : field.field_id
              );
            }
            if (field?.work_id && field?.field_id !== 'fio') {
              formData.append(`works[${i}][work_id]`, field?.work_id);
            }
          }
        });

      dispatch(
        editWork({
          formData,
          id: work?.id || null,
        })
      ).then((res) => {
        if (res?.meta?.requestStatus === 'fulfilled') {
          navigate(`/work/${workId}/`);
        }
      });
    } else {
      const createWorkData = {
        template_id: template.id,
        works: state.map((field) => ({
          ...field,
          field_value:
            typeof field.field_value === 'object'
              ? field.field_value?.name || ''
              : field.field_value,
        })),
      };

      dispatch(createWork(createWorkData)).then((res) => {
        if (res?.meta?.requestStatus === 'fulfilled') {
          navigate('/home');
        }
      });
    }
  };

  return (
    <div className="create-work">
      <div className="create-work-inner">
        <div className="create-work-header">
          <button
            className="page-back"
            onClick={() => navigate(`/work/${workId}/`)}
          >
            <ArrowPointerRight />
          </button>
          <h2>{isEdit ? 'Изменить' : 'Создать'} наряд</h2>
        </div>
        <div className="create-work-body">
          <form className="create-work-form" onSubmit={onSubmit}>
            <div className="create-work-form-fields">
              {(isEdit ? state : template?.fields || [])
                .filter((field) =>
                  isEdit
                    ? !(field?.field || field)?.name?.includes('Резолюция ') &&
                      !(field?.field || field)?.name?.includes('Тип')
                    : !(field?.field || field)?.name?.includes('Отчет') &&
                      !(field?.field || field)?.name?.includes('Резолюция ') &&
                      !field?.data_type?.includes('url') &&
                      !(field?.field || field)?.name?.includes('Тип')
                )
                .map((field, i) => {
                  if (
                    ['text', 'number', 'float', 'url', 'deal_type'].includes(
                      DATA_TYPES[field.data_type]
                    )
                  ) {
                    return (
                      <Input
                        key={field.bitrix_field_id}
                        type={DATA_TYPES[field.data_type]}
                        name={(field?.field || field).name}
                        value={
                          state.find(
                            (stateField) =>
                              (stateField?.field_id || stateField?.id) ===
                              (field?.field || field)?.id
                          )?.field_value || ''
                        }
                        label={`${
                          (field?.field || field).name
                        }${field?.is_child_template ? ` → ${field?.child_template_name}` : ''}`}
                        placeholder={(field?.field || field).name}
                        onChange={(e) =>
                          handleChange(
                            (field?.field || field).id,
                            field.data_type === 'int'
                              ? Number(Number(e.target.value).toFixed())
                              : e.target.value
                          )
                        }
                        required={
                          !!oldState.find(
                            (stateField) =>
                              (stateField?.field_id || stateField?.id) ===
                              (field?.field || field)?.id
                          )?.field_value
                        }
                      />
                    );
                  } else if (DATA_TYPES[field.data_type] === 'list') {
                    return (
                      <Autocomplete
                        key={field.bitrix_field_id}
                        type={DATA_TYPES[field.data_type]}
                        name={(field?.field || field).name}
                        value={
                          state.find(
                            (stateField) =>
                              (stateField?.field_id || stateField?.id) ===
                              (!['Резолюция', 'Статус', 'Исполнитель'].includes(
                                field?.name
                              )
                                ? (field?.field || field)?.id
                                : field?.field_id)
                          )?.field_value?.name ||
                          state.find(
                            (stateField) =>
                              (stateField?.field_id || stateField?.id) ===
                              (!['Резолюция', 'Статус', 'Исполнитель'].includes(
                                field?.name
                              )
                                ? (field?.field || field)?.id
                                : field?.field_id)
                          )?.field_value ||
                          ''
                        }
                        options={field?.values || []}
                        label={`${
                          (field?.field || field).name
                        }${field?.is_child_template ? ` → ${field?.child_template_name}` : ''}`}
                        placeholder={(field?.field || field).name}
                        onChange={(e) =>
                          handleChange(
                            !['Резолюция', 'Статус', 'Исполнитель'].includes(
                              field?.name
                            )
                              ? (field?.field || field).id
                              : field?.field_id,
                            e.target.value
                          )
                        }
                        required={
                          !!oldState.find(
                            (stateField) =>
                              (stateField?.field_id || stateField?.id) ===
                              (!['Резолюция', 'Статус', 'Исполнитель'].includes(
                                field?.name
                              )
                                ? (field?.field || field)?.id
                                : field?.field_id)
                          )?.field_value?.name
                        }
                      />
                    );
                  } else if (DATA_TYPES[field.data_type] === 'datetime') {
                    return (
                      <DatetimePicker
                        key={field.bitrix_field_id}
                        name={(field?.field || field).name}
                        label={(field?.field || field).name}
                        placeholder={(field?.field || field).name}
                        value={
                          state.find(
                            (stateField) =>
                              (stateField?.field_id || stateField?.id) ===
                              (field?.field || field)?.id
                          )?.field_value || ''
                        }
                        onChange={(e) =>
                          handleChange(
                            (field?.field || field).id,
                            e.target.value
                          )
                        }
                        required={
                          !!oldState.find(
                            (stateField) =>
                              (stateField?.field_id || stateField?.id) ===
                              (field?.field || field)?.id
                          )?.field_value
                        }
                      />
                    );
                  } else if (DATA_TYPES[field.data_type] === 'file') {
                    return (
                      <FileUpload
                        key={field.bitrix_field_id}
                        name={(field?.field || field).name}
                        label={(field?.field || field).name}
                        placeholder={(field?.field || field).name}
                        value={
                          state.find(
                            (stateField) =>
                              (stateField?.field_id || stateField?.id) ===
                              (field?.field || field)?.id
                          )?.field_value || ''
                        }
                        onChange={(e) =>
                          handleChange(
                            (field?.field || field).id,
                            e.target.value
                          )
                        }
                      />
                    );
                  } else if (DATA_TYPES[field.data_type] === 'crm_contact') {
                    return (
                      <>
                        <Input
                          key={i}
                          name="fio"
                          value={
                            state.find(
                              (stateField) => stateField?.field_id === 'fio'
                            )?.field_value || ''
                          }
                          label="ФИО"
                          placeholder="Введите ФИО"
                          onChange={(e) => handleChange('fio', e.target.value)}
                          required={
                            !!oldState.find(
                              (stateField) => stateField?.field_id === 'fio'
                            )?.field_value
                          }
                        />
                        <Input
                          key={i}
                          type="tel"
                          name="phone_number"
                          value={
                            state.find(
                              (stateField) =>
                                stateField?.field_id === 'phone_number'
                            )?.field_value || ''
                          }
                          label="Основной номер телефона"
                          placeholder="Основной номер телефона"
                          onChange={(e) =>
                            handleChange('phone_number', e.target.value)
                          }
                          required={
                            !!oldState.find(
                              (stateField) =>
                                stateField?.field_id === 'phone_number'
                            )?.field_value
                          }
                        />
                        <Input
                          key={i + 1}
                          type="tel"
                          name="phone_number_2"
                          value={
                            state.find(
                              (stateField) =>
                                stateField?.field_id === 'phone_number_2'
                            )?.field_value || ''
                          }
                          label="Доп. номер телефона"
                          placeholder="Доп. номер телефона"
                          onChange={(e) =>
                            handleChange('phone_number_2', e.target.value)
                          }
                          required={
                            !!oldState.find(
                              (stateField) =>
                                stateField?.field_id === 'phone_number_2'
                            )?.field_value
                          }
                        />
                      </>
                    );
                  }
                  return <></>;
                })}
            </div>
            <div className="create-work-form-actions">
              <Button
                type="submit"
                loading={
                  createWorkLoading ||
                  editWorkLoading ||
                  getTemplateLoading ||
                  resolutionTypesLoading ||
                  statusTypesLoading ||
                  usersLoading
                }
              >
                {isEdit ? 'Сохранить' : 'Создать'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateWork;
