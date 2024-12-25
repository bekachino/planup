import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getLocations } from '../../features/data/dataThunk';
import '../Templates/templates.css';

const Locations = () => {
  const dispatch = useAppDispatch();
  const { locations, locationsLoading } = useAppSelector(
    (state) => state.dataState
  );

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  return (
    <div className="types">
      <div className="types-header">
        <h2>Список локаций</h2>
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
