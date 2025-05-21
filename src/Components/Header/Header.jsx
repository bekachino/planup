import React, { useEffect, useState } from 'react';
import SearchFilters from '../SearchFilters/SearchFilters';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
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
import { logout } from '../../features/user/usersSlice';
import useUploadWorks from './hooks';
import './header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { fetchAndUploadWorks, uploadLoading } = useUploadWorks();
  const [showBurgerTooltip, setShowBurgerTooltip] = useState(false);
  const [createWorkModalOpen, setCreateWorkModalOpen] = useState(false);
  const [createWorkTemplate, setCreateWorkTemplate] = useState(null);
  const { templateTypes } = useAppSelector((state) => state.filtersDataState);
  const { user } = useAppSelector((state) => state.userState);

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
      {['/works'].includes(location.pathname) && (
        <SearchFilters placeholder="Поиск" />
      )}
      <nav>
        {['chief', 'admin'].includes(user?.role) && (
          <>
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
          </>
        )}
        {location.pathname === '/works' && (
          <NavLink
            className="not-hoverable-icon"
            to="#"
            disabled
            onClick={(e) => {
              e.preventDefault();
              if (!uploadLoading) void fetchAndUploadWorks();
            }}
          >
            <ExcelIcon />
            {uploadLoading ? 'Загрузка...' : 'Экспорт нярядов'}
          </NavLink>
        )}
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
            {['admin'].includes(user?.role) && (
              <>
                <button
                  className="nav-burger-tooltip-btn"
                  onClick={() => navigate('/templates')}
                >
                  Шаблоны
                </button>
                <button
                  className="nav-burger-tooltip-btn"
                  onClick={() => navigate('/resolutions')}
                >
                  Резолюции
                </button>
              </>
            )}
            {['chief', 'admin'].includes(user?.role) && (
              <>
                <button
                  className="nav-burger-tooltip-btn"
                  onClick={() => navigate('/admin/squares')}
                >
                  Квадраты
                </button>
                <button
                  className="nav-burger-tooltip-btn"
                  onClick={() => navigate('/geo-tracker')}
                >
                  Геотрекер
                </button>
              </>
            )}
            <button className="nav-burger-tooltip-btn">
              <NewsIcon />
              Новости
            </button>
            <button
              className="nav-burger-tooltip-btn"
              onClick={() => {
                if (user?.role === 'admin') navigate('/admin/home');
              }}
            >
              <UserIcon />
              Привет, {user?.fullName || user?.name || ''}!
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
          <h2>Новый наряд</h2>
        </div>
        <form onSubmit={onCreateWorkTemplateSubmit}>
          <Autocomplete
            label="Шаблон"
            placeholder="Выберите шаблон"
            name="createWorkTemplate"
            value={createWorkTemplate?.name}
            options={templateTypes.filter(
              (option) =>
                !option?.name.includes('Подключение') &&
                !option?.name.includes('Демонтаж') &&
                !option?.name.includes('Расширение') &&
                !option?.parent
            )}
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
