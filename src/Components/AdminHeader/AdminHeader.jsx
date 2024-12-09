import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as BurgerIcon } from '../../assets/burger-black.svg';
import { ReactComponent as RemoveIcon } from '../../assets/remove-white.svg';
import { ReactComponent as UserIcon } from '../../assets/user.svg';
import { ReactComponent as LogoutIcon } from '../../assets/logout.svg';
import './adminHeader.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { handleSearchValueChange } from '../../features/data/dataSlice';

const AdminHeader = () => {
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
        <input
          className="admin-header-search-input"
          type="text"
          value={searchValue}
          onChange={e => dispatch(handleSearchValueChange(e.target.value))}
          placeholder="Поиск"
        />
        <div className="admin-header-tooltip-toggle-btn-wrapper">
          <button
            className="admin-header-tooltip-toggle-btn"
            onClick={() => setShowBurgerTooltip(true)}
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
        <Link to="/home">Роли разрешения</Link>
        <Link to="/home">Разрешения</Link>
        <Link to="/home">Локации</Link>
        <Link to="/home">Список НУ</Link>
        <Link to="/home">Создать СИ</Link>
        <Link to="/home">Квадраты</Link>
      </nav>
    </header>
  );
};

export default AdminHeader;
