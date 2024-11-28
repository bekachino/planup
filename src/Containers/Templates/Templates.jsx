import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTemplateTypes } from '../../features/statuses/filtersDataThunk';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { ReactComponent as RefreshIcon } from '../../assets/refresh.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import './templates.css';
import { deleteTemplate } from '../../features/data/dataThunk';

const Templates = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { templateTypes } = useAppSelector((state) => state.filtersDataState);
  const { deleteTemplateLoading } = useAppSelector((state) => state.dataState);
  const [templateForDelete, setTemplateForDelete] = useState(-1);

  useEffect(() => {
    dispatch(getTemplateTypes());
  }, []);

  useEffect(() => {
    if (!deleteTemplateLoading) setTemplateForDelete(-1);
  }, [deleteTemplateLoading]);

  const onDelete = async (id) => {
    setTemplateForDelete(id);
    await dispatch(deleteTemplate(id));
    dispatch(getTemplateTypes());
  };

  return (
    <div className="types">
      <div className="types-header">
        <h2>Список шаблонов</h2>
        <button
          className="create-template-btn"
          onClick={() => navigate('/create-template')}
        >
          Создать шаблон
        </button>
      </div>
      <div className="types-list">
        {templateTypes.map((template) => (
          <div className="type-item" key={template.id}>
            <Link to="/templates">{template.name}</Link>
            <Button
              className="edit-type-btn"
              onClick={() => navigate(`/edit-template/${template?.id}`)}
            >
              <RefreshIcon />
              Обновить
            </Button>
            <Button
              className="edit-type-btn delete-type-btn"
              color="error"
              onClick={() => onDelete(template?.id)}
              loading={
                deleteTemplateLoading && templateForDelete === template?.id
              }
            >
              <DeleteIcon />
              Удалить
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
