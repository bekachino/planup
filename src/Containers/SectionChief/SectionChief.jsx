import React, { useEffect, useState } from 'react';
import { ReactComponent as ArrowPointerRight } from '../../assets/arrow-pointer-right.svg';
import { ReactComponent as MenuBurgerIcon } from '../../assets/burger-black.svg';
import { ReactComponent as RemoveWhiteIcon } from '../../assets/remove-icon-white.svg';
import { ReactComponent as RefreshDarkIcon } from '../../assets/refresh-dark.svg';
import { ReactComponent as DeleteDarkIcon } from '../../assets/delete-dark.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  deleteSectionChief,
  getSectionChief,
} from '../../features/data/dataThunk';
import defaultUserPng from '../../assets/default-user.png';
import { ROLES } from '../../constants';
import Button from '../../Components/Button/Button';
import Modal from '../../Components/Modal/Modal';
import '../CreateUser/createUser.css';
import '../Users/users.css';
import '../User/user.css';

const SectionChief = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const { sectionChief, sectionChiefLoading, deleteSectionChiefLoading } =
    useAppSelector((state) => state.dataState);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getSectionChief(userId));
  }, [dispatch, userId]);

  const toggleTooltip = (value) => setTooltipOpen(value);

  const toggleModal = (value) => setModalIsOpen(value);

  const onDelete = () => {
    dispatch(deleteSectionChief(userId)).then((res) => {
      if (res?.meta?.requestStatus === 'fulfilled') {
        navigate('/admin/section-chiefs');
      }
    });
  };

  return (
    <div className="single-user-page">
      <Modal
        open={modalIsOpen}
        toggleModal={toggleModal}
        style={{ minWidth: '600px' }}
      >
        <div
          className="create-template-paper-header"
          style={{ flexDirection: 'column' }}
        >
          <h2>Удалить начальника участка?</h2>
          <span className="create-template-paper-header-desc">
            Вы уверены что хотите удалить начальника участка?
          </span>
        </div>
        <div className="delete-modal-btns">
          <Button
            color="error"
            onClick={onDelete}
            loading={deleteSectionChiefLoading}
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
      <div className="user-info-body">
        <div className="users-header">
          <button className="page-back" onClick={() => navigate('/admin/home')}>
            <ArrowPointerRight />
          </button>
          <h2>Информация о начальнике участка</h2>
          <div className="user-tooltip-wrapper">
            <button
              className="user-tooltip-toggle"
              onClick={() => toggleTooltip(!tooltipOpen)}
            >
              {tooltipOpen ? <RemoveWhiteIcon /> : <MenuBurgerIcon />}
            </button>
            {tooltipOpen && (
              <div className="user-tooltip">
                <button
                  onClick={() =>
                    navigate(`/admin/edit-section-chief/${sectionChief?.id}`)
                  }
                >
                  <RefreshDarkIcon />
                  Обновить
                </button>
                <button onClick={() => toggleModal(true)}>
                  <DeleteDarkIcon />
                  Удалить
                </button>
              </div>
            )}
          </div>
        </div>
        <div
          className={`users-body users-list-${sectionChiefLoading ? 'loading' : ''}`}
        >
          {!sectionChiefLoading && (
            <>
              <div className="user-avatar">
                <img
                  src={
                    !!sectionChief?.photo ? sectionChief.photo : defaultUserPng
                  }
                  alt={sectionChief?.full_name || 'Пользователь'}
                />
              </div>
              <div className="user-info-row">
                <div className="user-info-role">ФИО</div>
                <div className="user-info-name">
                  {sectionChief?.full_name || 'ㅤ'}
                </div>
              </div>
              <div className="user-info-row">
                <div className="user-info-role">Имя пользователя</div>
                <div className="user-info-name">
                  {sectionChief?.username || 'ㅤ'}
                </div>
              </div>
              <div className="user-info-row">
                <div className="user-info-role">Номер телефона</div>
                <div className="user-info-name">
                  {sectionChief?.phone_number || 'ㅤ'}
                </div>
              </div>
              <div className="user-info-row">
                <div className="user-info-role">Код 1С</div>
                <div className="user-info-name">
                  {sectionChief?.one_c_code || 'ㅤ'}
                </div>
              </div>
              <div className="user-info-row">
                <div className="user-info-role">Битрикс ID</div>
                <div className="user-info-name">
                  {sectionChief?.bitrix_id || 'ㅤ'}
                </div>
              </div>
              <div className="user-info-row">
                <div className="user-info-role">Регион</div>
                <div className="user-info-name">
                  {sectionChief?.region || 'ㅤ'}
                </div>
              </div>
              <div className="user-info-row">
                <div className="user-info-role">Роль</div>
                <div className="user-info-name">
                  {!!sectionChief?.role ? ROLES[sectionChief?.role] : 'ㅤ'}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionChief;
