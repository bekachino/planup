import { useState } from 'react';
import axiosApi from '../../axiosApi';

const useFetchWorksAnalytics = () => {
  const [worksAnalyticsLoading, setWorksAnalyticsLoading] = useState(false);
  const [squares, setSquares] = useState([]);
  const [connectionsOpenToday, setConnectionsOpenToday] = useState(null);
  const [connectionsClosedToday, setConnectionsClosedToday] = useState(null);
  const [connectionsClosedYesterday, setConnectionsClosedYesterday] =
    useState(null);
  const [connectionsClosedLastWeek, setConnectionsClosedLastWeek] =
    useState(null);
  const [connectionsClosedLastMonth, setConnectionsClosedLastMonth] =
    useState(null);
  const [tehOpenToday, setTehOpenToday] = useState(null);
  const [tehClosedToday, setTehClosedToday] = useState(null);
  const [tehClosedYesterday, setTehClosedYesterday] = useState(null);
  const [tehClosedLastWeek, setTehClosedLastWeek] = useState(null);
  const [tehClosedLastMonth, setTehClosedLastMonth] = useState(null);

  const fetchWorksAnalytics = async () => {
    try {
      setWorksAnalyticsLoading(true);

      const fetchSquares = await axiosApi('/accounts/squares/');
      const fetchConnectionsOpenToday = await axiosApi(
        '/v2/connection-open-order-count-today/'
      );
      const fetchTehOpenToday = await axiosApi(
        '/v2/teh-open-order-count-today/'
      );
      const fetchConnectionsClosedToday = await axiosApi(
        '/v2/connection-closed-order-count-today/'
      );
      const fetchConnectionsClosedYesterday = await axiosApi(
        '/v2/connection-closed-order-count-yesterday/'
      );
      const fetchConnectionsClosedLastWeek = await axiosApi(
        '/v2/connection-closed-7-order-count/'
      );
      const fetchConnectionsClosedLastMonth = await axiosApi(
        '/v2/connection-closed-order-count-month/'
      );
      const fetchTehClosedToday = await axiosApi(
        '/v2/teh-closed-order-count-today/'
      );
      const fetchTehClosedYesterday = await axiosApi(
        '/v2/teh-closed-order-count-yesterday/'
      );
      const fetchTehClosedLastWeek = await axiosApi(
        '/v2/teh-closed-7-order-count/'
      );
      const fetchTehClosedLastMonth = await axiosApi(
        '/v2/teh-closed-order-count-month/'
      );

      setSquares(
        fetchSquares.data?.map((square) => ({
          region: square?.region || '',
          name: square?.squares || '',
        }))
      );

      setConnectionsOpenToday(await fetchConnectionsOpenToday.data);
      setConnectionsClosedToday(await fetchConnectionsClosedToday.data);
      setConnectionsClosedYesterday(await fetchConnectionsClosedYesterday.data);
      setConnectionsClosedLastWeek(await fetchConnectionsClosedLastWeek.data);
      setConnectionsClosedLastMonth(await fetchConnectionsClosedLastMonth.data);

      setTehOpenToday(await fetchTehOpenToday.data);
      setTehClosedToday(await fetchTehClosedToday.data);
      setTehClosedYesterday(await fetchTehClosedYesterday.data);
      setTehClosedLastWeek(await fetchTehClosedLastWeek.data);
      setTehClosedLastMonth(await fetchTehClosedLastMonth.data);

      setWorksAnalyticsLoading(false);
    } catch (e) {
      console.error('Ошибка при получении данных нарядов:', e);
    }
  };

  return {
    fetchWorksAnalytics,
    worksAnalyticsLoading,
    squares,
    connectionsOpenToday,
    connectionsClosedToday,
    connectionsClosedYesterday,
    connectionsClosedLastWeek,
    connectionsClosedLastMonth,
    tehOpenToday,
    tehClosedToday,
    tehClosedYesterday,
    tehClosedLastWeek,
    tehClosedLastMonth,
  };
};

export default useFetchWorksAnalytics;
