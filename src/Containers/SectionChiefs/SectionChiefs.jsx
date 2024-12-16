import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSquares } from '../../features/statuses/filtersDataThunk';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { ReactComponent as RefreshIcon } from '../../assets/refresh.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import Modal from '../../Components/Modal/Modal';
import {
  deleteResolution,
  getSectionChiefs,
} from '../../features/data/dataThunk';
import '../Templates/templates.css';

const SectionChiefs = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sectionChiefs, sectionChiefsLoading, deleteSiLoading } =
    useAppSelector((state) => state.dataState);
  const [siForDelete, setSiForDelete] = useState(-1);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getSectionChiefs());
  }, []);

  useEffect(() => {
    if (!deleteSiLoading) setSiForDelete(-1);
  }, [deleteSiLoading]);

  const onDelete = async (id) => {
    await dispatch(deleteResolution(id));
    dispatch(getSquares());
    toggleModal(false);
  };

  const toggleModal = (value) => setModalIsOpen(value);

  return (
    <>
      <Modal open={modalIsOpen} toggleModal={toggleModal}>
        <div className="create-template-paper-header">
          <h2>Удалить начальника участка?</h2>
          <span className="create-template-paper-header-desc">
            Вы уверены что хотите удалить начальника участка?
          </span>
        </div>
        <div className="delete-modal-btns">
          <Button
            color="error"
            onClick={() => onDelete(siForDelete)}
            loading={deleteSiLoading}
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
          <h2>Список НУ</h2>
          <button
            className="create-template-btn"
            onClick={() => navigate('/create-section-chief')}
          >
            Создать НУ
          </button>
        </div>
        <div className="types-list">
          {sectionChiefsLoading ||
            (!sectionChiefsLoading && !sectionChiefs.length && (
              <div className="type-item">
                <h2>{sectionChiefsLoading ? 'Загрузка...' : 'Нет данных'}</h2>
              </div>
            ))}
          {!sectionChiefsLoading &&
            (sectionChiefs || []).map((si) => (
              <div className="type-item" key={si.id}>
                <Link to={`/squares/${si?.id}`}>{si.name}</Link>
                <Button
                  className="edit-type-btn"
                  onClick={() => navigate(`/edit-section-chief/${si?.id}`)}
                >
                  <RefreshIcon />
                  Обновить
                </Button>
                <Button
                  className="edit-type-btn delete-type-btn"
                  color="error"
                  onClick={() => {
                    setSiForDelete(si?.id);
                    setModalIsOpen(true);
                  }}
                >
                  <DeleteIcon />
                  Удалить
                </Button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SectionChiefs;
