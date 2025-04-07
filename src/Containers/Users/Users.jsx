import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getUsers} from '../../features/data/dataThunk';
import './users.css';
import User from "../../Components/User/User";

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
      setUsersListHeight(
        window.innerHeight -
          usersListRef.current.getBoundingClientRect().top -
          20
      );
    }
  }, [users]);

  return (
    <div className="users">
      <div className="users-header">
        <h2>Список пользователей</h2>
        <button
          className="create-user-btn"
          onClick={() => navigate('/admin/create-user')}
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
                <User user={user} key={user?.id} type={"user"}></User>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
