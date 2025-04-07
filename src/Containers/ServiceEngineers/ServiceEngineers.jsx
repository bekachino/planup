import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getServiceEngineers } from '../../features/data/dataThunk';
import '../Users/users.css';
import User from '../../Components/User/User';

const ServiceEngineers = () => {
  const navigate = useNavigate();
  const serviceEngineersListRef = useRef();
  const dispatch = useAppDispatch();
  const { serviceEngineers, serviceEngineersLoading } = useAppSelector(
    (state) => state.dataState
  );
  const [usersListHeight, setUsersListHeight] = useState(0);

  useEffect(() => {
    dispatch(getServiceEngineers());
  }, [dispatch]);

  useEffect(() => {
    if (!!serviceEngineersListRef?.current) {
      setUsersListHeight(
        window.innerHeight -
          serviceEngineersListRef.current?.getBoundingClientRect().top -
          20
      );
    }
  }, [serviceEngineers]);

  return (
    <div className="users">
      <div className="users-header">
        <h2>Список сервис инженеров</h2>
        <button
          className="create-user-btn"
          onClick={() => navigate('/admin/create-service-engineer')}
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
              <User
                user={serviceEngineer}
                type={'service-engineer'}
                key={serviceEngineer?.id}
              ></User>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceEngineers;
