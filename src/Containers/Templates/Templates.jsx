import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTemplateTypes } from '../../features/statuses/filtersDataThunk';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { deleteTemplate } from '../../features/data/dataThunk';
import Modal from '../../Components/Modal/Modal';
import './templates.css';
import ListItem from '../../Components/ListItem/ListItem';

const Templates = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { templateTypes, templateTypesLoading } = useAppSelector(
    (state) => state.filtersDataState
  );
  const { deleteTemplateLoading } = useAppSelector((state) => state.dataState);
  const [templateForDelete, setTemplateForDelete] = useState(-1);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getTemplateTypes());
  }, [dispatch]);

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
              <ListItem
                key={template.id}
                item={template}
                setItemForDelete={setTemplateForDelete}
                type={'template'}
                editPath={`/edit-template/${template?.id}`}
                setModalIsOpen={setModalIsOpen}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Templates;
