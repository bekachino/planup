import React from 'react';
import './users.css';

const Users = () => {
  return (
    <div className="users">
      <div className="users-header">
        <h2>Список пользователей</h2>
        <button className='create-user-btn'>
          Создать пользователя
        </button>
      </div>
      <div className="users-body"></div>
    </div>
  );
};

export default Users;
