import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSectionChiefs } from '../../features/data/dataThunk';
import defaultUserPng from '../../assets/default-user.png';
import { ROLES } from '../../constants';
import '../Users/users.css';

const SectionChiefs = () => {
  const navigate = useNavigate();
  const sectionChiefsListRef = useRef();
  const dispatch = useAppDispatch();
  const { sectionChiefs, sectionChiefsLoading } = useAppSelector(
    (state) => state.dataState
  );
  const [usersListHeight, setUsersListHeight] = useState(0);

  useEffect(() => {
    dispatch(getSectionChiefs());
  }, [dispatch]);

  useEffect(() => {
    if (!!sectionChiefsListRef?.current) {
      setUsersListHeight(
        window.innerHeight -
          sectionChiefsListRef.current?.getBoundingClientRect().top -
          20
      );
    }
  }, [sectionChiefs]);

  return (
    <div className="users">
      <div className="users-header">
        <h2>Список начальников участка</h2>
        <button
          className="create-user-btn"
          onClick={() => navigate('/admin/create-section-chief')}
        >
          Создать начальника участка
        </button>
      </div>
      <div
        className="users-body"
        ref={sectionChiefsListRef}
        style={{ maxHeight: usersListHeight }}
      >
        <div
          className={`users-list users-list-${sectionChiefsLoading ? 'loading' : ''}`}
        >
          {!sectionChiefsLoading && !sectionChiefs?.length && (
            <h2 className="users-list-empty">
              Список начальников участка пуст...
            </h2>
          )}
          {!!sectionChiefs?.length &&
            sectionChiefs.map((sectionChief) => (
              <div className="user">
                <div className="user-avatar">
                  <img
                    src={
                      !!sectionChief?.section_chief?.photo
                        ? sectionChief.section_chief.photo
                        : defaultUserPng
                    }
                    alt={
                      sectionChief?.section_chief?.full_name ||
                      'Начальник участка'
                    }
                  />
                </div>
                <div className="user-info">
                  <Link
                    to={`/admin/section-chief/${sectionChief?.id || ''}`}
                    className="user-full-name"
                  >
                    {sectionChief?.section_chief?.full_name || 'ㅤ'}
                  </Link>
                  <span className="user-role">
                    права роли -{' '}
                    {!!sectionChief?.section_chief?.role
                      ? ROLES[sectionChief?.section_chief?.role]
                      : ''}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SectionChiefs;
