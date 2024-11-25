import React, { useEffect, useState } from 'react';
import SearchFilters from '../SearchFilters/SearchFilters';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as ServerIcon } from '../../assets/server.svg';
import { ReactComponent as CheckIcon } from '../../assets/check.svg';
import { ReactComponent as FileIcon } from '../../assets/file.svg';
import { ReactComponent as InboxIcon } from '../../assets/inbox.svg';
import { ReactComponent as LucidIcon } from '../../assets/lucide_edit.svg';
import { ReactComponent as BurgerIcon } from '../../assets/burger-black.svg';
import { ReactComponent as RemoveIcon } from '../../assets/remove-white.svg';
import { ReactComponent as ExcelIcon } from '../../assets/excel.svg';
import { ReactComponent as NewsIcon } from '../../assets/news.svg';
import { ReactComponent as UserIcon } from '../../assets/user.svg';
import { ReactComponent as LogoutIcon } from '../../assets/logout.svg';
import Alerts from '../Alerts/Alerts';
import './header.css';

const Header = () => {
  const [showBurgerTooltip, setShowBurgerTooltip] = useState(false);

  useEffect(() => {
    document.addEventListener('mousedown', () => setShowBurgerTooltip(false));
  }, []);

  return (
    <header className="header">
      <h1>
        <Link to="/home" className="home-link">
          PlanUp
        </Link>
      </h1>
      <SearchFilters placeholder="Поиск" />
      <nav>
        <NavLink to="/value-types">
          <ServerIcon />
          Типы значений
        </NavLink>
        <NavLink to="/templates">
          <FileIcon />
          Шаблоны
        </NavLink>
        <NavLink to="/resolutions">
          <InboxIcon />
          Резолюции
        </NavLink>
        <NavLink to="/statuses">
          <CheckIcon />
          Статусы
        </NavLink>
        <NavLink to="/works">
          <LucidIcon />
          Создать наряд
        </NavLink>
        <div className="nav-burger-btn-wrapper">
          <button
            className={`nav-burger-btn ${showBurgerTooltip && 'nav-burger-tooltip-shown'}`}
            onClick={() => setShowBurgerTooltip(true)}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {showBurgerTooltip ? <RemoveIcon /> : <BurgerIcon />}
          </button>
          <div
            className="nav-burger-tooltip"
            style={{ display: showBurgerTooltip ? 'flex' : 'none' }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button className="nav-burger-tooltip-btn">
              <ExcelIcon />
              Экспорт в Excel
            </button>
            <button className="nav-burger-tooltip-btn">
              <NewsIcon />
              Новости
            </button>
            <button className="nav-burger-tooltip-btn">
              <UserIcon />
              Привет, Admin!
            </button>
            <button className="nav-burger-tooltip-btn">
              <LogoutIcon />
              Выйти
            </button>
          </div>
        </div>
      </nav>
      <Alerts />
    </header>
  );
};

export default Header;
