import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { getTemplate } from '../../features/data/dataThunk';
import { ReactComponent as ArrowPointerRight } from '../../assets/arrow-pointer-right.svg';
import Button from '../../Components/Button/Button';
import { DATA_TYPES } from '../../constants';
import Input from '../../Components/Input/Input';
import DatetimePicker from '../../Components/DatetimePicker/DatetimePicker';
import FileUpload from '../../Components/FileUpload/FileUpload';
import Autocomplete from '../../Components/Autocomplete/Autocomplete';
import { createWork, getWork, editWork } from '../../features/works/worksThunk';
import moment from 'moment';
import {
  getResolutionTypes,
  getStatusTypes,
} from '../../features/statuses/filtersDataThunk';
import './createWork.css';

const CreateWork = ({ isEdit }) => {
  const navigate = useNavigate();
  const { templateId, workId } = useParams();
  const dispatch = useDispatch();
  const { template, getTemplateLoading } = useAppSelector(
    (state) => state.dataState
  );
  const { createWorkLoading, editWorkLoading } = useAppSelector(
    (state) => state.worksState
  );
  const { statusTypesLoading, resolutionTypesLoading } = useAppSelector(
    (state) => state.filtersDataState
  );
  const [state, setState] = useState([]);
  const [work, setWork] = useState(null);

  useEffect(() => {
    const getEditWorkFieldsData = async () => {
      const resolutionTypes = await dispatch(getResolutionTypes());
      const statusTypes = await dispatch(getStatusTypes());

      dispatch(getWork(workId)).then(({ payload }) => {
        setState(
          [
            ...payload.works?.[0]?.fields.map((field) => ({
              ...field,
              field_value:
                field?.name === 'Желаемая дата  приезда' && !!field?.field_value
                  ? moment(new Date(field?.field_value)).format(
                      'DD.MM.YYYY HH:mm'
                    )
                  : field?.field_value,
              field_id: field?.id,
            })),
            {
              field_id: payload?.status?.id,
              data_type: 'list',
              field_value: payload?.status?.name,
              id: payload?.status?.id,
              name: 'Статус',
              values: statusTypes.payload,
            },
            {
              field_id: payload?.resolution?.id,
              data_type: 'list',
              field_value: payload?.resolution?.name,
              id: payload?.resolution?.id,
              name: 'Резолюция',
              values: resolutionTypes.payload,
            },
          ] || []
        );
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
        };
        return updatedState;
      } else {
        return [
          ...prevState,
          {
            field_id,
            field_value,
          },
        ];
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      const formData = new FormData();

      formData.append('id', work?.id || null);
      formData.append('bitrix_id', work?.bitrix_id || null);
      formData.append('status', work?.status?.id || null);
      formData.append('resolution', work?.resolution?.id || null);
      formData.append('works', JSON.stringify(state));

      dispatch(
        editWork({
          formData,
          id: work?.id || null,
        })
      ).then((res) => {
        if (res?.meta?.requestStatus === 'fulfilled') {
          navigate('/home');
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
          <button className="page-back" onClick={() => navigate('/home')}>
            <ArrowPointerRight />
          </button>
          <h2>{isEdit ? 'Изменить' : 'Создать'} наряд</h2>
        </div>
        <div className="create-work-body">
          <form className="create-work-form" onSubmit={onSubmit}>
            <div className="create-work-form-fields">
              {(isEdit ? state : template?.fields || [])
                .filter(
                  (field) =>
                    !(field?.field || field).name.includes('Отчет') &&
                    !(field?.field || field).name.includes('Тип')
                )
                .map((field, i) => {
                  if (
                    ['text', 'number', 'url', 'deal_type'].includes(
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
                        label={(field?.field || field).name}
                        placeholder={(field?.field || field).name}
                        onChange={(e) =>
                          handleChange(
                            (field?.field || field).id,
                            field.data_type === 'int'
                              ? Number(Number(e.target.value).toFixed())
                              : e.target.value
                          )
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
                              (field?.field || field)?.id
                          )?.field_value?.name ||
                          state.find(
                            (stateField) =>
                              (stateField?.field_id || stateField?.id) ===
                              (field?.field || field)?.id
                          )?.field_value ||
                          ''
                        }
                        options={field?.values || []}
                        label={(field?.field || field).name}
                        placeholder={(field?.field || field).name}
                        onChange={(e) =>
                          handleChange(
                            (field?.field || field).id,
                            e.target.value
                          )
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
                        />
                      </>
                    );
                  }
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
                  statusTypesLoading
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
