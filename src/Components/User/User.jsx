import defaultUserPng from '../../assets/default-user.png';
import { Link } from 'react-router-dom';
import { ROLES } from '../../constants';
import React from 'react';
import './user.css';

const User = ({ user, type }) => {
  return (
    <div className="user">
      <div className="user-avatar">
        {type === 'user' && (
          <img
            src={!!user?.photo ? user.photo : defaultUserPng}
            alt={user?.full_name || 'Пользователь'}
          />
        )}
        {type === 'section-chief' && (
          <img
            src={
              !!user?.section_chief?.photo
                ? user.section_chief.photo
                : defaultUserPng
            }
            alt={user?.section_chief?.full_name || 'Начальник участка'}
          />
        )}
        {type === 'service-engineer' && (
          <img
            src={
              !!user?.service_engineer?.photo
                ? user.service_engineer?.photo
                : defaultUserPng
            }
            alt={user?.service_engineer?.full_name || 'Начальник участка'}
          />
        )}
      </div>
      <div className="user-info">
        <Link
          to={`/admin/${type}/${user?.id || ''}`}
          className="user-full-name"
        >
          {type === 'section-chief' && user?.section_chief?.full_name}
          {type === 'user' && user?.full_name}
          {type === 'service-engineer' && user?.service_engineer?.full_name}
        </Link>
        {type === 'user' && (
          <span className="user-role">
            права роли - {!!user?.role ? ROLES[user?.role] : ''}
          </span>
        )}
        {type === 'section-chief' && (
          <span className="user-role">
            права роли -{' '}
            {!!user?.section_chief?.role
              ? ROLES[user?.section_chief?.role]
              : ''}
          </span>
        )}
        {type === 'service-engineer' && (
          <span className="user-role">
            права роли -{' '}
            {!!user?.service_engineer?.role
              ? ROLES[user.service_engineer?.role]
              : ''}
          </span>
        )}
      </div>
    </div>
  );
};

export default User;
