import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getSectionChiefs} from '../../features/data/dataThunk';
import '../Users/users.css';
import User from "../../Components/User/User";

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
                <User user={sectionChief} type={"section-chief"} key={sectionChief?.id}></User>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SectionChiefs;
