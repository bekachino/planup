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
import './createWork.css';

const CreateWork = ({ isEdit }) => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const dispatch = useDispatch();
  const { template, getTemplateLoading } = useAppSelector(
    (state) => state.dataState
  );
  const [state, setState] = useState([]);

  useEffect(() => {
    dispatch(getTemplate(templateId));
  }, [dispatch, templateId]);

  const handleChange = (field_id, field_name) => {
    setState((prevState) => {
      console.log(field_name);
      const existingIndex = prevState.findIndex(
        (field) => field.field_id === field_id
      );

      if (existingIndex !== -1) {
        const updatedState = [...prevState];
        updatedState[existingIndex] = {
          ...updatedState[existingIndex],
          field_name,
        };
        return updatedState;
      } else {
        return [
          ...prevState,
          {
            field_id,
            field_name,
          },
        ];
      }
    });
  };
  
  console.log(template);
  
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
          <form className="create-work-form">
            <div className="create-work-form-fields">
              {template?.fields.map((field, i) => {
                if (
                  ['text', 'number', 'url', 'deal_type'].includes(
                    DATA_TYPES[field.data_type]
                  )
                ) {
                  return (
                    <Input
                      key={field.bitrix_field_id}
                      type={DATA_TYPES[field.data_type]}
                      name={field.field.name}
                      value={
                        state.find(
                          (stateField) =>
                            stateField?.field_id === field.field?.id
                        )?.field_name || ''
                      }
                      label={field.field.name}
                      placeholder={field.field.name}
                      onChange={(e) =>
                        handleChange(
                          field.field.id,
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
                      multiple
                      key={field.bitrix_field_id}
                      type={DATA_TYPES[field.data_type]}
                      name={field.field.name}
                      value={
                        (Array.isArray(state) ? state : [])?.find(
                          (stateField) =>
                            stateField?.field_id === field.field?.id
                        )?.field_name || []
                      }
                      options={field?.values || []}
                      label={field.field.name}
                      placeholder={field.field.name}
                      onChange={(e) =>
                        handleChange(field.field.id, e.target.value)
                      }
                    />
                  );
                } else if (DATA_TYPES[field.data_type] === 'datetime') {
                  return (
                    <DatetimePicker
                      key={field.bitrix_field_id}
                      name={field.field.name}
                      label={field.field.name}
                      placeholder={field.field.name}
                      value={
                        state.find(
                          (stateField) =>
                            stateField?.field_id === field.field?.id
                        )?.field_name || ''
                      }
                      onChange={(e) =>
                        handleChange(field.field.id, e.target.value)
                      }
                    />
                  );
                } else if (DATA_TYPES[field.data_type] === 'file') {
                  return (
                    <FileUpload
                      key={field.bitrix_field_id}
                      name={field.field.name}
                      label={field.field.name}
                      placeholder={field.field.name}
                      value={
                        state.find(
                          (stateField) =>
                            stateField?.field_id === field.field?.id
                        )?.field_name || ''
                      }
                      onChange={(e) =>
                        handleChange(field.field.id, e.target.value)
                      }
                    />
                  );
                } else if (DATA_TYPES[field.data_type] === 'crm_contact') {
                  return (
                    <>
                      <Input
                        key={i}
                        type="tel"
                        name="phone_number"
                        value={state?.phone_number || ''}
                        label="Основной омер телефона"
                        placeholder="Основной омер телефона"
                        onChange={(e) =>
                          handleChange('phone_number', e.target.value)
                        }
                      />
                      <Input
                        key={i + 1}
                        type="tel"
                        name="phone_number_2"
                        value={state?.phone_number_2 || ''}
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
              <Button type="submit" loading={getTemplateLoading}>
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
