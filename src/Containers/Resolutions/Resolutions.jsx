import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getResolutionTypes } from '../../features/statuses/filtersDataThunk';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { ReactComponent as RefreshIcon } from '../../assets/refresh.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import Modal from '../../Components/Modal/Modal';
import { deleteResolution } from '../../features/data/dataThunk';
import '../Templates/templates.css';

const Resolutions = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { resolutionTypes, resolutionTypesLoading } = useAppSelector(
    (state) => state.filtersDataState
  );
  const { deleteResolutionLoading } = useAppSelector(
    (state) => state.dataState
  );
  const { user } = useAppSelector((state) => state.userState);
  const [resolutionForDelete, setResolutionForDelete] = useState(-1);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getResolutionTypes());
  }, [dispatch]);

  useEffect(() => {
    if (!deleteResolutionLoading) setResolutionForDelete(-1);
  }, [deleteResolutionLoading]);

  const onDelete = async (id) => {
    await dispatch(deleteResolution(id));
    dispatch(getResolutionTypes());
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
          <h2>Удалить резолюцию?</h2>
          <span className="create-template-paper-header-desc">
            Вы уверены что хотите удалить эту резолюцию?
          </span>
        </div>
        <div className="delete-modal-btns">
          <Button
            color="error"
            onClick={() => onDelete(resolutionForDelete)}
            loading={deleteResolutionLoading}
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
          <h2>Список резолюций</h2>
          <button
            className="create-template-btn"
            onClick={() => navigate('/create-resolution')}
          >
            Создать резолюцию
          </button>
        </div>
        <div className="types-list">
          {resolutionTypesLoading && (
            <div className="type-item">
              <h2>Загрузка...</h2>
            </div>
          )}
          {!resolutionTypesLoading &&
            resolutionTypes.map((resolution) => (
              <div className="type-item" key={resolution.id}>
                <span className="type-item-title">{resolution.name}</span>
                {user?.role === 'admin' && (
                  <>
                    <Button
                      className="edit-type-btn"
                      onClick={() =>
                        navigate(`/edit-resolution/${resolution?.id}`)
                      }
                    >
                      <RefreshIcon />
                      Обновить
                    </Button>
                    <Button
                      className="edit-type-btn delete-type-btn"
                      color="error"
                      onClick={() => {
                        setResolutionForDelete(resolution?.id);
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

export default Resolutions;
