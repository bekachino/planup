import { useState } from 'react';
import axiosApi from '../../axiosApi';

export const useGeoTracker = () => {
  const [geoTrackerData, setGeoTrackerData] = useState([]);
  const [geoTrackerLoading, setGeoTrackerLoading] = useState(false);

  const fetchGeoTracker = async (user_id, date) => {
    try {
      setGeoTrackerLoading(true);
      const req = await axiosApi(`/v2/geo-user?user_id=${user_id}&date=${date}`);
      const res = await req.data;
      setGeoTrackerData(res);
      setGeoTrackerLoading(false);
    } catch (e) {
      console.log(e);
      setGeoTrackerLoading(false);
    }
  };

  return {
    geoTrackerData,
    geoTrackerLoading,
    fetchGeoTracker,
  };
};
