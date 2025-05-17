import React, { useEffect, useRef, useState } from 'react';
import Autocomplete from '../../Components/Autocomplete/Autocomplete';
import { getUserTypes } from '../../features/statuses/filtersDataThunk';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import DatetimePicker from '../../Components/DatetimePicker/DatetimePicker';
import Button from '../../Components/Button/Button';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useGeoTracker } from './hooks';
import moment from 'moment';
import './geoTracker.css';

const GeoTracker = () => {
  const mapRef = useRef(null);
  const mapContainer = useRef(null);
  const dispatch = useAppDispatch();
  const { userTypes, userTypesLoading } = useAppSelector(
    (state) => state.filtersDataState
  );
  const { geoTrackerData, geoTrackerLoading, fetchGeoTracker } =
    useGeoTracker();
  const [state, setState] = useState(null);

  useEffect(() => {
    dispatch(getUserTypes());
  }, []);

  useEffect(() => {
    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${process.env.REACT_APP_MAPTILER_KEY}`,
      center: [74.6, 42.87],
      zoom: 11,
    });

    mapRef.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    return () => mapRef.current?.remove();
  }, []);
  
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;
    
    if (map.markers) {
      map.markers.forEach((m) => m.remove());
    }
    map.markers = [];
    
    if (map.getLayer('route-line')) {
      map.removeLayer('route-line');
    }
    if (map.getSource('route')) {
      map.removeSource('route');
    }
    
    if (!geoTrackerData.length) return;
    
    geoTrackerData.forEach((point) => {
      const el = document.createElement('div');
      el.className = 'geo-tracker-custom-marker';
      el.innerText = moment(point.timestamp).format('HH:mm');
      
      const marker = new maplibregl.Marker({ element: el })
      .setLngLat([point.lon, point.lat])
      .addTo(map);
      
      map.markers.push(marker);
    });
    
    const coordinates = geoTrackerData.map((p) => [p.lon, p.lat]);
    
    map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates,
        },
      },
    });
    
    map.addLayer({
      id: 'route-line',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#0080ff',
        'line-width': 3,
      },
    });
    
    const bounds = geoTrackerData.reduce(
      (b, p) => b.extend([p.lon, p.lat]),
      new maplibregl.LngLatBounds(
        [geoTrackerData[0].lon, geoTrackerData[0].lat],
        [geoTrackerData[0].lon, geoTrackerData[0].lat]
      )
    );
    map.fitBounds(bounds, { padding: 100 });
  }, [geoTrackerData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    void fetchGeoTracker(
      state.user?.id,
      moment(state.date, 'DD.MM.YYYY').format('YYYY-MM-DD')
    );
  };

  return (
    <div className="geo-tracker">
      <form className="geo-tracker-header" onSubmit={onSubmit}>
        <Autocomplete
          required
          placeholder="Выберите СИ"
          options={userTypes || []}
          name="user"
          value={state?.user}
          onChange={handleChange}
        />
        <DatetimePicker
          required
          name="date"
          placeholder="Выберите дату"
          disableLabel
          value={!!state ? state?.date || '' : ''}
          onChange={handleChange}
          noTime
          id="desired_end_date"
        />
        <Button type="submit" loading={userTypesLoading || geoTrackerLoading}>
          Смотреть
        </Button>
      </form>
      <div
        className="geo-tracker-map"
        ref={mapContainer}
        style={{
          width: '100%',
          height: '100vh',
        }}
      />
    </div>
  );
};

export default GeoTracker;
