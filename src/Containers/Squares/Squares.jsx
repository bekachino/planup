import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSquares } from '../../features/statuses/filtersDataThunk';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import Modal from '../../Components/Modal/Modal';
import { deleteSquare } from '../../features/data/dataThunk';
import '../Templates/templates.css';
import ListItem from '../../Components/ListItem/ListItem';

const Resolutions = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { squares, squaresLoading } = useAppSelector(
    (state) => state.filtersDataState
  );
  const { deleteSquareLoading } = useAppSelector((state) => state.dataState);
  const [resolutionForDelete, setResolutionForDelete] = useState(-1);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getSquares());
  }, [dispatch]);

  useEffect(() => {
    if (!deleteSquareLoading) setResolutionForDelete(-1);
  }, [deleteSquareLoading]);

  const onDelete = async (id) => {
    await dispatch(deleteSquare(id));
    dispatch(getSquares());
    toggleModal(false);
  };

  const toggleModal = (value) => setModalIsOpen(value);

  return (
    <>
      <Modal open={modalIsOpen} toggleModal={toggleModal}>
        <div className="create-template-paper-header">
          <h2>Удалить квадрат?</h2>
          <span className="create-template-paper-header-desc">
            Вы уверены что хотите удалить этот квадрат?
          </span>
        </div>
        <div className="delete-modal-btns">
          <Button
            color="error"
            onClick={() => onDelete(resolutionForDelete)}
            loading={deleteSquareLoading}
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
          <h2>Список квадратов</h2>
          <button
            className="create-template-btn"
            onClick={() => navigate('/admin/create-square')}
          >
            Создать квадрат
          </button>
        </div>
        <div className="types-list">
          {squaresLoading ||
            (!squaresLoading && !squares.length && (
              <div className="type-item">
                <h2>{squaresLoading ? 'Загрузка...' : 'Нет данных'}</h2>
              </div>
            ))}
          {!squaresLoading &&
            (squares || []).map((square) => (
              <ListItem
                key={square.id}
                item={square}
                setItemForDelete={setResolutionForDelete}
                type={'square'}
                editPath={`/admin/edit-square/${square?.id}`}
                setModalIsOpen={setModalIsOpen}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Resolutions;
