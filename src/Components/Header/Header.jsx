import React, { useEffect, useState } from 'react';
import SearchFilters from '../SearchFilters/SearchFilters';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
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
import Modal from '../Modal/Modal';
import Autocomplete from '../Autocomplete/Autocomplete';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Button from '../Button/Button';
import { addAlert } from '../../features/data/dataSlice';
import { getTemplateTypes } from '../../features/statuses/filtersDataThunk';
import './header.css';
import { logout } from '../../features/user/usersSlice';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showBurgerTooltip, setShowBurgerTooltip] = useState(false);
  const [createWorkModalOpen, setCreateWorkModalOpen] = useState(false);
  const { templateTypes } = useAppSelector((state) => state.filtersDataState);
  const [createWorkTemplate, setCreateWorkTemplate] = useState(null);

  useEffect(() => {
    document.addEventListener('mousedown', () => setShowBurgerTooltip(false));
  }, []);

  useEffect(() => {
    dispatch(getTemplateTypes());
  }, [dispatch]);

  const toggleCreateWorkModal = (value) => {
    if (!value) setCreateWorkTemplate(null);
    setCreateWorkModalOpen(value);
  };

  const handleWorkTemplateChange = (e) => {
    const { value } = e.target;
    setCreateWorkTemplate(value);
  };

  const onCreateWorkTemplateSubmit = (e) => {
    e.preventDefault();
    if (!createWorkTemplate?.id) {
      dispatch(
        addAlert({
          type: 'warning',
          message: 'Ошибка при выборе шаблона',
        })
      );
      return;
    }
    toggleCreateWorkModal(false);
    navigate(`/create-work/${createWorkTemplate?.id}`);
  };

  return (
    <header className="header">
      <h1>
        <Link to="/home" className="home-link">
          PlanUp
        </Link>
      </h1>
      {['/home'].includes(location.pathname) && (
        <SearchFilters placeholder="Поиск" />
      )}
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
        <NavLink
          to="/works"
          onClick={(e) => {
            e.preventDefault();
            toggleCreateWorkModal(true);
          }}
        >
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
            <button
              className="nav-burger-tooltip-btn"
              onClick={() => navigate('/admin/home')}
            >
              <UserIcon />
              Привет, Admin!
            </button>
            <button
              className="nav-burger-tooltip-btn"
              onClick={() => dispatch(logout())}
            >
              <LogoutIcon />
              Выйти
            </button>
          </div>
        </div>
      </nav>
      <Alerts />
      <Modal
        className="create-work-modal-paper"
        open={createWorkModalOpen}
        toggleModal={toggleCreateWorkModal}
      >
        <button
          className="close-modal-btn"
          onClick={() => toggleCreateWorkModal(false)}
        >
          <RemoveIcon />
        </button>
        <div className="create-template-paper-header">
          <h2>Создание нового наряда</h2>
        </div>
        <form onSubmit={onCreateWorkTemplateSubmit}>
          <Autocomplete
            label="Шаблон"
            placeholder="Выберите шаблон"
            name="createWorkTemplate"
            value={createWorkTemplate?.name}
            options={templateTypes}
            onChange={handleWorkTemplateChange}
            required
          />
          <Button className="create-work-modal-btn">Выбрать</Button>
        </form>
      </Modal>
    </header>
  );
};

export default Header;
