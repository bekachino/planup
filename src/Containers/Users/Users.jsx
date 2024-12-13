import React from 'react';
import './users.css';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const navigate = useNavigate();

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
      <div className="users-body"></div>
    </div>
  );
};

export default Users;
