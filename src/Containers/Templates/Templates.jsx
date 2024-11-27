import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTemplateTypes } from '../../features/statuses/filtersDataThunk';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { ReactComponent as RefreshIcon } from '../../assets/refresh.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import './templates.css';

const Templates = () => {
  const dispatch = useAppDispatch();
  const { templateTypes } = useAppSelector((state) => state.filtersDataState);

  useEffect(() => {
    dispatch(getTemplateTypes());
  }, []);

  console.log(templateTypes);

  return (
    <div className="types">
      <div className="types-header">
        <h2>Список шаблонов</h2>
        <button className="create-template-btn">Создать шаблон</button>
      </div>
      <div className="types-list">
        <div className="type-item">
          <Link to="/templates">Выезд на БС</Link>
          <Button className="edit-type-btn">
            <RefreshIcon />
            Обновить
          </Button>
          <Button
            className="edit-type-btn delete-type-btn"
            color="error"
          >
            <DeleteIcon />
            Удалить
          </Button>
        </div>
        <div className="type-item">
          <Link to="/templates">Выезд на БС</Link>
          <Button className="edit-type-btn">
            <RefreshIcon />
            Обновить
          </Button>
          <Button
            className="edit-type-btn delete-type-btn"
            color="error"
          >
            <DeleteIcon />
            Удалить
          </Button>
        </div>
        <div className="type-item">
          <Link to="/templates">Выезд на БС</Link>
          <Button className="edit-type-btn">
            <RefreshIcon />
            Обновить
          </Button>
          <Button
            className="edit-type-btn delete-type-btn"
            color="error"
          >
            <DeleteIcon />
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Templates;
