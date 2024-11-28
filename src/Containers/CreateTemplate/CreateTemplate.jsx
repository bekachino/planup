import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Checkbox from '../../Components/Checkbox/Checkbox';
import { nanoid } from 'nanoid';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import { ReactComponent as ArrowPointerRight } from '../../assets/arrow-pointer-right.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { ReactComponent as DragIcon } from '../../assets/drag-icon.svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTemplateFields } from '../../features/statuses/filtersDataThunk';
import Autocomplete from '../../Components/Autocomplete/Autocomplete';
import {
  createTemplate,
  editTemplate,
  getTemplate,
} from '../../features/data/dataThunk';
import './createTemplate.css';

const CreateTemplate = ({ isEdit }) => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { templateFields, templateFieldsLoading } = useAppSelector(
    (state) => state.filtersDataState
  );
  const { createTemplateLoading, editTemplateLoading } = useAppSelector(
    (state) => state.dataState
  );
  const [state, setState] = useState({
    fields: [],
  });
  const [dragItem, setDragItem] = useState(null);

  useEffect(() => {
    dispatch(getTemplateFields());
    if (isEdit)
      dispatch(getTemplate(templateId)).then((res) =>
        setState({
          id: res.payload?.id,
          name: res.payload?.name,
          fields: res.payload?.fields.map((field) => ({
            field: {
              name: field?.field?.name,
              id: field?.field?.id,
            },
            id: field?.field?.id,
            required: field?.required,
          })),
        })
      );
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFieldChange = (e) => {
    const { id, name, value } = e.target;

    const fieldsCopy = [...state.fields];
    fieldsCopy.find((f) => f.id === id)[name] = value;
    setState((prevState) => ({
      ...prevState,
      fields: fieldsCopy,
    }));
  };

  const addField = () => {
    setState((prevState) => ({
      ...prevState,
      fields: [
        ...prevState?.fields,
        {
          id: nanoid(),
          field: null,
          required: false,
        },
      ],
    }));
  };

  const removeField = (id) => {
    setState((prevState) => ({
      ...prevState,
      fields: prevState.fields.filter((field) => field.id !== id),
    }));
  };

  const onDragOver = (dragOverItem) => {
    if (!dragItem || !dragOverItem) return;

    setState((prevState) => {
      const fieldsCopy = [...prevState.fields];

      const dragItemIndex = fieldsCopy.findIndex(
        (field) => field.id === dragItem.id
      );
      const dragOverItemIndex = fieldsCopy.findIndex(
        (field) => field.id === dragOverItem.id
      );

      if (dragItemIndex === -1 || dragOverItemIndex === -1) {
        return prevState;
      }

      fieldsCopy.splice(dragItemIndex, 1);
      fieldsCopy.splice(dragOverItemIndex, 0, dragItem);

      return {
        ...prevState,
        fields: fieldsCopy,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(
        editTemplate({
          ...state,
          fields: state.fields.map((field, i) => ({
            field: field?.field?.id,
            numbers: i + 1,
            required: field?.required,
          })),
        })
      ).then((res) => {
        if (res?.meta?.requestStatus === 'fulfilled') {
          navigate('/templates');
        }
      });
    } else {
      dispatch(
        createTemplate({
          ...state,
          fields: state.fields.map((field, i) => ({
            ...field,
            field: field?.field?.id,
            numbers: i + 1,
          })),
        })
      ).then((res) => {
        if (res?.meta?.requestStatus === 'fulfilled') {
          navigate('/templates');
        }
      });
    }
  };

  return (
    <div className="create-template">
      <div className="create-template-paper">
        <div className="create-template-paper-header">
          <button className="page-back" onClick={() => navigate('/templates')}>
            <ArrowPointerRight />
          </button>
          <h2>{isEdit ? 'Редактировать' : 'Создать'} шаблон</h2>
        </div>
        <form onSubmit={onSubmit}>
          <div className="template-field-row">
            <Input
              label="Название"
              placeholder="Введите название"
              name="name"
              value={state?.name}
              onChange={onChange}
              required
            />
          </div>
          {state.fields?.map((field) => (
            <div
              className={`template-field-row ${dragItem?.id === field.id && 'template-field-row-is-dragging'}`}
              key={field.id}
              draggable={true}
              onDragStart={() => setDragItem(field)}
              onDragEnd={() => {
                setDragItem(null);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                onDragOver(field);
              }}
            >
              <div className="drag-icon">
                <DragIcon />
              </div>
              <Autocomplete
                label="Название поля"
                placeholder="Введите название"
                name="field"
                value={field?.field?.name}
                options={templateFields.filter(
                  (field) =>
                    !state.fields.find(
                      (f) => f.id === field.id || f.field?.id === field.id
                    )
                )}
                required
                onChange={(e) =>
                  onFieldChange({
                    target: {
                      name: e.target.name,
                      id: field.id,
                      value: e.target.value,
                    },
                  })
                }
                loading={templateFieldsLoading}
              />
              <Checkbox
                label="Обязательное поле"
                name="required"
                checked={field.required}
                id={nanoid()}
                onChange={(e) =>
                  onFieldChange({
                    target: {
                      name: e.target.name,
                      id: field.id,
                      value: e.target.checked,
                    },
                  })
                }
              />
              <Button
                color="error"
                type="button"
                onClick={() => removeField(field.id)}
              >
                <DeleteIcon />
                Удалить
              </Button>
            </div>
          ))}
          <div className="create-template-actions">
            <Button
              type="button"
              onClick={addField}
              loading={templateFieldsLoading}
            >
              Добавить поле
            </Button>
            <Button
              type="submit"
              variant="outlined"
              loading={
                createTemplateLoading ||
                editTemplateLoading ||
                templateFieldsLoading
              }
            >
              {isEdit ? 'Сохранить' : 'Создать'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTemplate;
