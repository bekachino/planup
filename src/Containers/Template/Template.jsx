import React, { useEffect } from 'react';
import { ReactComponent as ArrowPointerRight } from '../../assets/arrow-pointer-right.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getTemplate } from '../../features/data/dataThunk';
import { useAppSelector } from '../../app/hooks';
import './template.css';

const Template = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { template, getTemplateLoading } = useAppSelector(
    (state) => state.dataState
  );

  useEffect(() => {
    dispatch(getTemplate(templateId));
  }, []);

  return (
    <div className="template">
      <div className="template-paper">
        <div className="create-template-paper-header">
          <button className="page-back" onClick={() => navigate('/templates')}>
            <ArrowPointerRight />
          </button>
          <h2>{template?.name || 'Шаблон'}</h2>
        </div>
        {getTemplateLoading && (
          <h2 className="template-loading">Загрузка...</h2>
        )}
        {!getTemplateLoading && (
          <>
            <span className="template-desc">Поля</span>
            <div className="template-fields-list">
              {template?.fields.map((field) => (
                <div className="template-fields-list-item" key={field.field.id}>
                  <span className="template-fields-list-item-title">
                    {field.field.name}
                  </span>
                  <span className="template-fields-list-item-field-type">
                    {field.data_type}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Template;
