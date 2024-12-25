import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { getLocations } from '../../features/data/dataThunk';
import '../Templates/templates.css';

const Locations = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { locations, locationsLoading } = useAppSelector(
    (state) => state.dataState
  );

  useEffect(() => {
    dispatch(getLocations());
  }, []);

  return (
    <div className="types">
      <div className="types-header">
        <h2>Список шаблонов</h2>
        <button
          className="create-template-btn"
          onClick={() => navigate('/create-template')}
        >
          Создать шаблон
        </button>
      </div>
      <div className="types-list">
        {locationsLoading && (
          <div className="type-item">
            <h2>Загрузка...</h2>
          </div>
        )}
        {!locationsLoading &&
          (locations || []).map((location) => (
            <div className="type-item" key={location.id}>
              {location.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Locations;
