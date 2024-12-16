import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUsers } from '../../features/data/dataThunk';
import defaultUserPng from '../../assets/default-user.png';
import { ROLES } from '../../constants';
import './users.css';

const Users = () => {
  const navigate = useNavigate();
  const usersListRef = useRef();
  const dispatch = useAppDispatch();
  const { users, usersLoading } = useAppSelector((state) => state.dataState);
  const [usersListHeight, setUsersListHeight] = useState(0);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (usersListRef.current) {
      setTimeout(() => {
        setUsersListHeight(
          window.innerHeight -
            usersListRef.current.getBoundingClientRect().top -
            20
        );
      }, 200);
    }
  }, []);

  return (
    <div className="users">
      <div className="users-header">
        <h2>Список пользователей</h2>
        <button
          className="create-user-btn"
          onClick={() => navigate('/create-user')}
        >
          Создать пользователя
        </button>
      </div>
      <div
        className="users-body"
        ref={usersListRef}
        style={{ maxHeight: usersListHeight }}
      >
        <div
          className={`users-list users-list-${usersLoading ? 'loading' : ''}`}
        >
          {!usersLoading && !users?.length && (
            <h2 className="users-list-empty">Список пользователей пуст...</h2>
          )}
          {!!users?.length &&
            users.map((user) => (
              <div className="user">
                <div className="user-avatar">
                  <img
                    src={!!user?.photo ? user.photo : defaultUserPng}
                    alt={user?.full_name || 'Пользователь'}
                  />
                </div>
                <div className="user-info">
                  <Link
                    to={`/user/${user?.id || ''}`}
                    className="user-full-name"
                  >
                    {user?.full_name || 'ㅤ'}
                  </Link>
                  <span className="user-role">
                    права роли - {!!user?.role ? ROLES[user?.role] : ''}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
