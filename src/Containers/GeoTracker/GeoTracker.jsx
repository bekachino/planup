import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
    if (!mapRef.current) {
      renderMap();
      return;
    }
    renderLocations();
  }, [geoTrackerData]);

  const groupedLocations = useMemo(() => {
    const data = {};

    geoTrackerData.forEach((point) => {
      const lat = (point.lat || 0).toFixed(3);
      const lon = (point.lon || 0).toFixed(3);

      const group = data[`${lat}${lon}`] || [];
      group.push(point);

      data[`${lat}${lon}`] = group;
    });

    return data;
  }, [geoTrackerData]);

  const renderMap = useCallback(() => {
    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${process.env.REACT_APP_MAPTILER_KEY}`,
      center: [74.6, 42.87],
      zoom: 11,
    });

    mapRef.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    return () => mapRef.current?.remove();
  }, []);

  const renderLocations = useCallback(() => {
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

    Object.values(groupedLocations).forEach((group) => {
      group.forEach((point, i) => {
        const middleOfGroup = Math.floor(group.length / 2);
        if (group.length > 1 && i !== middleOfGroup) return;

        const el = document.createElement('div');
        el.className = `geo-tracker-custom-marker ${group.length > 1 && i === middleOfGroup ? 'geo-tracker-custom-marker-grouped' : ''}`;
        el.innerText =
          group.length > 1 && i === middleOfGroup
            ? group.length
            : moment(point.timestamp).format('HH:mm');
        el.addEventListener('click', (e) => {
          console.log(e);
        });

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([point.lon, point.lat])
          .addTo(map);

        map.markers.push(marker);
      });
    });

    const flatMappedLocations = Object.values(groupedLocations)
      .map((group) => {
        if (group.length === 1) return group[0];

        const middleOfGroup = Math.floor(group.length / 2);
        return [group[middleOfGroup]];
      })
      .flat();
    const coordinates = flatMappedLocations.map((p) => [p.lon, p.lat]);

    map.addSource(`route`, {
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

    const bounds = flatMappedLocations.reduce(
      (b, p) => b.extend([p.lon, p.lat]),
      new maplibregl.LngLatBounds(
        [flatMappedLocations[0].lon, flatMappedLocations[0].lat],
        [flatMappedLocations[0].lon, flatMappedLocations[0].lat]
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
      <div className="geo-tracker-map-container">
        <div
          className="geo-tracker-map"
          ref={mapContainer}
          style={{
            width: '100%',
            height: '100vh',
          }}
        />
        <div className="geo-tracker-location-points">
          <div className="geo-tracker-location-points-header">
            <button type="button" />
          </div>
          <div className="geo-tracker-location-points-list"></div>
        </div>
      </div>
    </div>
  );
};

export default GeoTracker;
