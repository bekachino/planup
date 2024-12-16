import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as BurgerIcon } from '../../assets/burger-black.svg';
import { ReactComponent as RemoveIcon } from '../../assets/remove-white.svg';
import { ReactComponent as UserIcon } from '../../assets/user.svg';
import { ReactComponent as LogoutIcon } from '../../assets/logout.svg';
import './adminHeader.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { handleSearchValueChange } from '../../features/data/dataSlice';
import Alerts from '../Alerts/Alerts';

const AdminHeader = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((state) => state.dataState);
  const [showBurgerTooltip, setShowBurgerTooltip] = useState(false);

  useEffect(() => {
    document.addEventListener('mousedown', () => setShowBurgerTooltip(false));
  }, []);

  return (
    <header className="admin-header">
      <div className="admin-header-top">
        <h1>
          <Link to="/home" className="home-link">
            PlanUp
          </Link>
        </h1>
        {['/admin-header'].includes(location.pathname) && (
          <input
            className="admin-header-search-input"
            type="text"
            value={searchValue}
            onChange={(e) => dispatch(handleSearchValueChange(e.target.value))}
            placeholder="Поиск"
          />
        )}
        <div className="admin-header-tooltip-toggle-btn-wrapper">
          <button
            className="admin-header-tooltip-toggle-btn"
            onClick={() => setShowBurgerTooltip(!showBurgerTooltip)}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {showBurgerTooltip ? <RemoveIcon /> : <BurgerIcon />}
          </button>
          {showBurgerTooltip && (
            <div
              className="admin-header-tooltip"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <button>
                <UserIcon />
                Привет, Админ!
              </button>
              <button>
                <LogoutIcon />
                Выйти
              </button>
            </div>
          )}
        </div>
      </div>
      <nav className="admin-header-bottom">
        <Link to="/users">Пользователи</Link>
        <Link to="/home">Роли разрешения</Link>
        <Link to="/home">Разрешения</Link>
        <Link to="/home">Локации</Link>
        <Link to="/section-chiefs">Список НУ</Link>
        <Link to="/service-engineers">Список СИ</Link>
        <Link to="/squares">Квадраты</Link>
      </nav>
      <Alerts />
    </header>
  );
};

export default AdminHeader;
