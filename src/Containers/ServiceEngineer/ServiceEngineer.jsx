import React, { useEffect, useState } from 'react';
import { ReactComponent as ArrowPointerRight } from '../../assets/arrow-pointer-right.svg';
import { ReactComponent as MenuBurgerIcon } from '../../assets/burger-black.svg';
import { ReactComponent as RemoveWhiteIcon } from '../../assets/remove-icon-white.svg';
import { ReactComponent as RefreshDarkIcon } from '../../assets/refresh-dark.svg';
import { ReactComponent as DeleteDarkIcon } from '../../assets/delete-dark.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  deleteServiceEngineer,
  getServiceEngineer,
} from '../../features/data/dataThunk';
import defaultUserPng from '../../assets/default-user.png';
import { ROLES } from '../../constants';
import Button from '../../Components/Button/Button';
import Modal from '../../Components/Modal/Modal';
import '../CreateUser/createUser.css';
import '../Users/users.css';
import '../User/user.css';

const ServiceEngineer = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const {
    serviceEngineer,
    serviceEngineerLoading,
    deleteServiceEngineerLoading,
  } = useAppSelector((state) => state.dataState);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getServiceEngineer(userId));
  }, [dispatch, userId]);

  const toggleTooltip = (value) => setTooltipOpen(value);

  const toggleModal = (value) => setModalIsOpen(value);

  const onDelete = () => {
    dispatch(deleteServiceEngineer(userId)).then((res) => {
      if (res?.meta?.requestStatus === 'fulfilled') {
        navigate('/admin/service-engineers');
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
          <h2>Удалить сервис инженера?</h2>
          <span className="create-template-paper-header-desc">
            Вы уверены что хотите удалить сервис инженера?
          </span>
        </div>
        <div className="delete-modal-btns">
          <Button
            color="error"
            onClick={onDelete}
            loading={deleteServiceEngineerLoading}
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
          <h2>Информация о СИ</h2>
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
                    navigate(`/admin/edit-section-chief/${serviceEngineer?.id}`)
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
          className={`users-body users-list-${serviceEngineerLoading ? 'loading' : ''}`}
        >
          {!serviceEngineerLoading && (
            <>
              <div className="user-avatar">
                <img
                  src={
                    !!serviceEngineer?.photo
                      ? serviceEngineer.photo
                      : defaultUserPng
                  }
                  alt={serviceEngineer?.full_name || 'Пользователь'}
                />
              </div>
              <div className="user-info-row">
                <div className="user-info-role">ФИО</div>
                <div className="user-info-name">
                  {serviceEngineer?.full_name || 'ㅤ'}
                </div>
              </div>
              <div className="user-info-row">
                <div className="user-info-role">Имя пользователя</div>
                <div className="user-info-name">
                  {serviceEngineer?.username || 'ㅤ'}
                </div>
              </div>
              <div className="user-info-row">
                <div className="user-info-role">Номер телефона</div>
                <div className="user-info-name">
                  {serviceEngineer?.phone_number || 'ㅤ'}
                </div>
              </div>
              <div className="user-info-row">
                <div className="user-info-role">Код 1С</div>
                <div className="user-info-name">
                  {serviceEngineer?.one_c_code || 'ㅤ'}
                </div>
              </div>
              <div className="user-info-row">
                <div className="user-info-role">Битрикс ID</div>
                <div className="user-info-name">
                  {serviceEngineer?.bitrix_id || 'ㅤ'}
                </div>
              </div>
              <div className="user-info-row">
                <div className="user-info-role">Регион</div>
                <div className="user-info-name">
                  {serviceEngineer?.region || 'ㅤ'}
                </div>
              </div>
              <div className="user-info-row">
                <div className="user-info-role">Роль</div>
                <div className="user-info-name">
                  {!!serviceEngineer?.role
                    ? ROLES[serviceEngineer?.role]
                    : 'ㅤ'}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceEngineer;
