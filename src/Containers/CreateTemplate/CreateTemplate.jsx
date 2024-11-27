import React, { useState } from 'react';
import { ReactComponent as ArrowPointerRight } from '../../assets/arrow-pointer-right.svg';
import { useNavigate } from 'react-router-dom';
import Checkbox from '../../Components/Checkbox/Checkbox';
import { nanoid } from 'nanoid';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import './createTemplate.css';

const CreateTemplate = ({ isEdit }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    fields: [],
  });

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
        ...prevState.fields,
        {
          id: nanoid(),
          name: '',
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

  return (
    <div className="create-template">
      <div className="create-template-paper">
        <div className="create-template-paper-header">
          <button className="page-back" onClick={() => navigate('/templates')}>
            <ArrowPointerRight />
          </button>
          <h2>Создать шаблон</h2>
        </div>
        <form>
          <div className="template-field-row">
            <Input
              label="Название"
              placeholder="Введите название"
              name="name"
              onChange={onChange}
            />
          </div>
          {state.fields.map((field) => (
            <div className="template-field-row" key={field.id}>
              <Input
                label="Название поля"
                placeholder="Введите название"
                name="name"
                onChange={(e) =>
                  onFieldChange({
                    target: {
                      name: e.target.name,
                      id: field.id,
                      value: e.target.value,
                    },
                  })
                }
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
            <Button type="button" onClick={addField}>
              Добавить поле
            </Button>
            <Button type="submit" variant="outlined">
              {isEdit ? 'Сохранить' : 'Создать'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTemplate;
