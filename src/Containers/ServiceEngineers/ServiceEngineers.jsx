import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUsers } from '../../features/data/dataThunk';
import defaultUserPng from '../../assets/default-user.png';
import { ROLES } from '../../constants';
import '../Users/users.css';

const ServiceEngineers = () => {
  const navigate = useNavigate();
  const serviceEngineersListRef = useRef();
  const dispatch = useAppDispatch();
  const { serviceEngineers, serviceEngineersLoading } = useAppSelector(
    (state) => state.dataState
  );
  const [usersListHeight, setUsersListHeight] = useState(0);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!!serviceEngineersListRef?.current) {
      setTimeout(() => {
        setUsersListHeight(
          window.innerHeight -
            serviceEngineersListRef.current?.getBoundingClientRect().top -
            20
        );
      }, 200);
    }
  }, []);

  return (
    <div className="users">
      <div className="users-header">
        <h2>Список сервис инженеров</h2>
        <button
          className="create-user-btn"
          onClick={() => navigate('/create-service-engineer')}
        >
          Создать сервис инженера
        </button>
      </div>
      <div
        className="users-body"
        ref={serviceEngineersListRef}
        style={{ maxHeight: usersListHeight }}
      >
        <div
          className={`users-list users-list-${serviceEngineersLoading ? 'loading' : ''}`}
        >
          {!serviceEngineersLoading && !serviceEngineers?.length && (
            <h2 className="users-list-empty">
              Список сервис инженеров пуст...
            </h2>
          )}
          {!!serviceEngineers?.length &&
            serviceEngineers.map((serviceEngineer) => (
              <div className="user">
                <div className="user-avatar">
                  <img
                    src={
                      !!serviceEngineer?.photo
                        ? serviceEngineer.photo
                        : defaultUserPng
                    }
                    alt={serviceEngineer?.full_name || 'Начальник участка'}
                  />
                </div>
                <div className="user-info">
                  <Link
                    to={`/user/${serviceEngineer?.id || ''}`}
                    className="user-full-name"
                  >
                    {serviceEngineer?.full_name || 'ㅤ'}
                  </Link>
                  <span className="user-role">
                    права роли -{' '}
                    {!!serviceEngineer?.role ? ROLES[serviceEngineer.role] : ''}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceEngineers;
