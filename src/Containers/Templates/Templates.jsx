import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTemplateTypes } from '../../features/statuses/filtersDataThunk';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { ReactComponent as RefreshIcon } from '../../assets/refresh.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { deleteTemplate } from '../../features/data/dataThunk';
import Modal from '../../Components/Modal/Modal';
import './templates.css';

const Templates = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { templateTypes, templateTypesLoading } = useAppSelector(
    (state) => state.filtersDataState
  );
  const { user } = useAppSelector((state) => state.userState);
  const { deleteTemplateLoading } = useAppSelector((state) => state.dataState);
  const [templateForDelete, setTemplateForDelete] = useState(-1);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getTemplateTypes());
  }, []);

  useEffect(() => {
    if (!deleteTemplateLoading) setTemplateForDelete(-1);
  }, [deleteTemplateLoading]);

  const onDelete = async (id) => {
    await dispatch(deleteTemplate(id));
    dispatch(getTemplateTypes());
    toggleModal(false);
  };

  const toggleModal = (value) => setModalIsOpen(value);

  return (
    <>
      <Modal
        open={modalIsOpen}
        toggleModal={toggleModal}
        style={{ minWidth: '600px' }}
      >
        <div
          className="create-template-paper-header"
          style={{ flexDirection: 'column' }}
        >
          <h2>Удалить шаблон?</h2>
          <span className="create-template-paper-header-desc">
            Вы уверены что хотите удалить этот шаблон?
          </span>
        </div>
        <div className="delete-modal-btns">
          <Button
            color="error"
            onClick={() => onDelete(templateForDelete)}
            loading={deleteTemplateLoading}
          >
            Удалить
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => toggleModal(false)}
          >
            Отмена
          </Button>
        </div>
      </Modal>
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
          {templateTypesLoading && (
            <div className="type-item">
              <h2>Загрузка...</h2>
            </div>
          )}
          {!templateTypesLoading &&
            templateTypes.map((template) => (
              <div className="type-item" key={template.id}>
                <Link to={`/templates/${template?.id}`}>{template.name}</Link>
                {user?.role === 'admin' && (
                  <>
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
                      onClick={() => {
                        setTemplateForDelete(template?.id);
                        setModalIsOpen(true);
                      }}
                    >
                      <DeleteIcon />
                      Удалить
                    </Button>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Templates;
