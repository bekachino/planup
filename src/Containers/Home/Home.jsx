import React, { useEffect } from 'react';
import useFetchWorksAnalytics from './hooks';
import { ResponsivePie } from '@nivo/pie';
import './home.css';
import Button from '../../Components/Button/Button';
import { useNavigate } from 'react-router-dom';

const regionNames = [
  'Чуй',
  'Иссык-Куль',
  'Джалал-Абад',
  'Нарын',
  'Талас',
  'Ош',
];

const Home = () => {
  const navigate = useNavigate();
  const {
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
  } = useFetchWorksAnalytics();

  useEffect(() => {
    void fetchWorksAnalytics();
  }, []);

  return (
    <div className="works-analytics-container">
      <Button
        style={{
          fontSize: '20px',
          marginBottom: '15px',
          width: '100%',
          padding: '10px 14px',
        }}
        onClick={() => navigate('/works')}
      >
        Перейти к нарядам
      </Button>
      <div className="works-analytics">
        <div
          className="works-analytics-card"
          style={{ backgroundColor: 'var(--white)' }}
        >
          <h2>Подключения</h2>
        </div>
        <div
          className="works-analytics-card"
          style={{ backgroundColor: 'var(--white)' }}
        >
          <h2>Техподы</h2>
        </div>
        <div
          style={{ backgroundColor: '#fdfeff' }}
          className="works-analytics-card"
        >
          <h4 className="work-analytics-card-title">Всего подключений</h4>
          <div className="work-analytics-today">
            <ResponsivePie
              data={[
                {
                  id: 'Сегодня открыто',
                  label: 'Сегодня открыто',
                  value: connectionsOpenToday?.count || 0,
                },
                {
                  id: 'Сегодня закрыто',
                  label: 'Сегодня закрыто',
                  value: connectionsClosedToday?.count || 0,
                },
              ]}
              colors={['#1DBF12', '#E31A1A']}
              margin={{
                top: 28,
                right: 15,
                bottom: 28,
                left: 15,
              }}
              height={203}
              innerRadius={0.6}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              arcLabelsTextColor="#FFFFFF"
              enableArcLinkLabels={
                !!connectionsOpenToday?.count || !!connectionsClosedToday?.count
              }
              tooltip={() => <div></div>}
            />
          </div>
          <div className="work-analytics-card-row">
            <span>Закрыто за вчера</span>
            <div className="work-analytics-card-row-gap"></div>
            <span className="work-analytics-card-row-value">
              {connectionsClosedYesterday?.count || 0}
            </span>
          </div>
          <div className="work-analytics-card-row">
            <span>Закрыто за последнюю неделю</span>
            <div className="work-analytics-card-row-gap"></div>
            <span className="work-analytics-card-row-value">
              {connectionsClosedLastWeek?.count || 0}
            </span>
          </div>
          <div className="work-analytics-card-row">
            <span>Закрыто за последний месяц</span>
            <div className="work-analytics-card-row-gap"></div>
            <span className="work-analytics-card-row-value">
              {connectionsClosedLastMonth?.count || 0}
            </span>
          </div>
        </div>
        <div
          style={{ backgroundColor: '#fdfeff' }}
          className="works-analytics-card"
        >
          <h4 className="work-analytics-card-title">Всего техподов</h4>
          <div className="work-analytics-today">
            <ResponsivePie
              data={[
                {
                  id: 'Сегодня открыто',
                  label: 'Сегодня открыто',
                  value: tehOpenToday?.count || 0,
                },
                {
                  id: 'Сегодня закрыто',
                  label: 'Сегодня закрыто',
                  value: tehClosedToday?.count || 0,
                },
              ]}
              colors={['#1DBF12', '#E31A1A']}
              margin={{
                top: 28,
                right: 0,
                bottom: 28,
                left: 0,
              }}
              height={203}
              innerRadius={0.6}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              arcLabelsTextColor="#FFFFFF"
              enableArcLinkLabels={
                !!tehOpenToday?.count || !!tehClosedToday?.count
              }
              tooltip={() => <div></div>}
            />
          </div>
          <div className="work-analytics-card-row">
            <span>Закрыто за вчера</span>
            <div className="work-analytics-card-row-gap"></div>
            <span className="work-analytics-card-row-value">
              {tehClosedYesterday?.count || 0}
            </span>
          </div>
          <div className="work-analytics-card-row">
            <span>Закрыто за последнюю неделю</span>
            <div className="work-analytics-card-row-gap"></div>
            <span className="work-analytics-card-row-value">
              {tehClosedLastWeek?.count || 0}
            </span>
          </div>
          <div className="work-analytics-card-row">
            <span>Закрыто за последний месяц</span>
            <div className="work-analytics-card-row-gap"></div>
            <span className="work-analytics-card-row-value">
              {tehClosedLastMonth?.count || 0}
            </span>
          </div>
        </div>
        <div className="works-analytics-card" style={{ padding: '12px 0' }}>
          <h4 className="work-analytics-card-title">Подключения по областям</h4>
          {regionNames.map((regionName) => (
            <div
              style={{ marginTop: '15px' }}
              className="work-analytics-region-data"
            >
              <h3 style={{ marginBottom: '4px' }}>{regionName}</h3>
              {(() => {
                const openConnectionsOfRegion =
                  connectionsOpenToday?.templates?.[regionName];
                const closedConnectionsOfRegion =
                  connectionsClosedToday?.templates?.[regionName];
                const sumOfOpenConnections = Object.values(
                  openConnectionsOfRegion || {}
                ).reduce((acc, num) => acc + num, 0);
                const sumOfClosedConnections = Object.values(
                  closedConnectionsOfRegion || {}
                ).reduce((acc, num) => acc + num, 0);

                if (openConnectionsOfRegion || closedConnectionsOfRegion) {
                  return (
                    <div className="work-analytics-today">
                      <ResponsivePie
                        data={[
                          {
                            id: 'Сегодня открыто',
                            label: 'Сегодня открыто',
                            value: sumOfOpenConnections || 0,
                          },
                          {
                            id: 'Сегодня закрыто',
                            label: 'Сегодня закрыто',
                            value: sumOfClosedConnections || 0,
                          },
                        ]}
                        colors={['#1DBF12', '#E31A1A']}
                        margin={{
                          top: 28,
                          right: 0,
                          bottom: 28,
                          left: 0,
                        }}
                        height={203}
                        innerRadius={0.6}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        arcLabelsTextColor="#FFFFFF"
                        enableArcLinkLabels={
                          !!tehOpenToday?.count || !!tehClosedToday?.count
                        }
                        tooltip={() => <div></div>}
                      />
                    </div>
                  );
                }
              })()}
              {(() => {
                const closedConnectionsOfRegion =
                  connectionsClosedYesterday?.templates?.[regionName];
                const sumOfClosedConnections = Object.values(
                  closedConnectionsOfRegion || {}
                ).reduce((acc, num) => acc + num, 0);

                return (
                  <div className="work-analytics-card-row">
                    <span>Закрыто за вчера</span>
                    <div className="work-analytics-card-row-gap"></div>
                    <span className="work-analytics-card-row-value">
                      {sumOfClosedConnections || 0}
                    </span>
                  </div>
                );
              })()}
              {(() => {
                const closedConnectionsOfRegion =
                  connectionsClosedLastWeek?.templates?.[regionName];
                const sumOfClosedConnections = Object.values(
                  closedConnectionsOfRegion || {}
                ).reduce((acc, num) => acc + num, 0);

                return (
                  <div className="work-analytics-card-row">
                    <span>Закрыто за последнюю неделю</span>
                    <div className="work-analytics-card-row-gap"></div>
                    <span className="work-analytics-card-row-value">
                      {sumOfClosedConnections || 0}
                    </span>
                  </div>
                );
              })()}
              {(() => {
                const closedConnectionsOfRegion =
                  connectionsClosedLastMonth?.templates?.[regionName];
                const sumOfClosedConnections = Object.values(
                  closedConnectionsOfRegion || {}
                ).reduce((acc, num) => acc + num, 0);

                return (
                  <div className="work-analytics-card-row">
                    <span>Закрыто за последний месяц</span>
                    <div className="work-analytics-card-row-gap"></div>
                    <span className="work-analytics-card-row-value">
                      {sumOfClosedConnections || 0}
                    </span>
                  </div>
                );
              })()}
            </div>
          ))}
        </div>
        <div className="works-analytics-card" style={{ padding: '12px 0' }}>
          <h4 className="work-analytics-card-title">Техподы по областям</h4>
          {regionNames.map((regionName) => (
            <div
              style={{ marginTop: '15px' }}
              className="work-analytics-region-data"
            >
              <h3 style={{ marginBottom: '4px' }}>{regionName}</h3>
              {(() => {
                const openConnectionsOfRegion =
                  tehOpenToday?.templates?.[regionName];
                const closedConnectionsOfRegion =
                  tehClosedToday?.templates?.[regionName];
                const sumOfOpenConnections = Object.values(
                  openConnectionsOfRegion || {}
                ).reduce((acc, num) => acc + num, 0);
                const sumOfClosedConnections = Object.values(
                  closedConnectionsOfRegion || {}
                ).reduce((acc, num) => acc + num, 0);

                if (openConnectionsOfRegion || closedConnectionsOfRegion) {
                  return (
                    <div className="work-analytics-today">
                      <ResponsivePie
                        data={[
                          {
                            id: 'Сегодня открыто',
                            label: 'Сегодня открыто',
                            value: sumOfOpenConnections || 0,
                          },
                          {
                            id: 'Сегодня закрыто',
                            label: 'Сегодня закрыто',
                            value: sumOfClosedConnections || 0,
                          },
                        ]}
                        colors={['#1DBF12', '#E31A1A']}
                        margin={{
                          top: 28,
                          right: 0,
                          bottom: 28,
                          left: 0,
                        }}
                        height={203}
                        innerRadius={0.6}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        arcLabelsTextColor="#FFFFFF"
                        enableArcLinkLabels={
                          !!tehOpenToday?.count || !!tehClosedToday?.count
                        }
                        tooltip={() => <div></div>}
                      />
                    </div>
                  );
                }
              })()}
              {(() => {
                const closedConnectionsOfRegion =
                  tehClosedYesterday?.templates?.[regionName];
                const sumOfClosedConnections = Object.values(
                  closedConnectionsOfRegion || {}
                ).reduce((acc, num) => acc + num, 0);

                return (
                  <div className="work-analytics-card-row">
                    <span>Закрыто за вчера</span>
                    <div className="work-analytics-card-row-gap"></div>
                    <span className="work-analytics-card-row-value">
                      {sumOfClosedConnections || 0}
                    </span>
                  </div>
                );
              })()}
              {(() => {
                const closedConnectionsOfRegion =
                  tehClosedLastWeek?.templates?.[regionName];
                const sumOfClosedConnections = Object.values(
                  closedConnectionsOfRegion || {}
                ).reduce((acc, num) => acc + num, 0);

                return (
                  <div className="work-analytics-card-row">
                    <span>Закрыто за последнюю неделю</span>
                    <div className="work-analytics-card-row-gap"></div>
                    <span className="work-analytics-card-row-value">
                      {sumOfClosedConnections || 0}
                    </span>
                  </div>
                );
              })()}
              {(() => {
                const closedConnectionsOfRegion =
                  tehClosedLastMonth?.templates?.[regionName];
                const sumOfClosedConnections = Object.values(
                  closedConnectionsOfRegion || {}
                ).reduce((acc, num) => acc + num, 0);

                return (
                  <div className="work-analytics-card-row">
                    <span>Закрыто за последний месяц</span>
                    <div className="work-analytics-card-row-gap"></div>
                    <span className="work-analytics-card-row-value">
                      {sumOfClosedConnections || 0}
                    </span>
                  </div>
                );
              })()}
            </div>
          ))}
        </div>
        <div className="works-analytics-card" style={{ padding: '12px 0' }}>
          <h4 className="work-analytics-card-title">
            Подключения по квадратам
          </h4>
          {regionNames.map((regionName) => (
            <div
              style={{ marginTop: '15px' }}
              className="work-analytics-region-data"
            >
              <h3 style={{ marginBottom: '4px' }}>{regionName}</h3>
              {(() => {
                return squares
                  .filter((square) => square?.region === regionName)
                  .map((square) => (
                    <div
                      style={{
                        marginTop: '20px',
                        paddingLeft: '20px',
                      }}
                    >
                      <h3 style={{ marginBottom: '4px' }}>{square?.name}</h3>
                      {(() => {
                        const openConnectionsOfRegion =
                          connectionsOpenToday?.templates?.[regionName]?.[
                            square?.name
                          ];

                        return (
                          <div className="work-analytics-card-row">
                            <span>Открыто за сегодня</span>
                            <div className="work-analytics-card-row-gap"></div>
                            <span className="work-analytics-card-row-value">
                              {openConnectionsOfRegion || 0}
                            </span>
                          </div>
                        );
                      })()}
                      {(() => {
                        const closedConnectionsOfRegion =
                          connectionsClosedToday?.templates?.[regionName]?.[
                            square?.name
                          ];

                        return (
                          <div className="work-analytics-card-row">
                            <span>Закрыто за сегодня</span>
                            <div className="work-analytics-card-row-gap"></div>
                            <span className="work-analytics-card-row-value">
                              {closedConnectionsOfRegion || 0}
                            </span>
                          </div>
                        );
                      })()}
                      {(() => {
                        const closedConnectionsOfRegion =
                          connectionsClosedYesterday?.templates?.[regionName]?.[
                            square?.name
                          ];

                        return (
                          <div className="work-analytics-card-row">
                            <span>Закрыто за вчера</span>
                            <div className="work-analytics-card-row-gap"></div>
                            <span className="work-analytics-card-row-value">
                              {closedConnectionsOfRegion || 0}
                            </span>
                          </div>
                        );
                      })()}
                      {(() => {
                        const closedConnectionsOfRegion =
                          connectionsClosedLastWeek?.templates?.[regionName]?.[
                            square?.name
                          ];

                        return (
                          <div className="work-analytics-card-row">
                            <span>Закрыто за последнюю неделю</span>
                            <div className="work-analytics-card-row-gap"></div>
                            <span className="work-analytics-card-row-value">
                              {closedConnectionsOfRegion || 0}
                            </span>
                          </div>
                        );
                      })()}
                      {(() => {
                        const closedConnectionsOfRegion =
                          connectionsClosedLastMonth?.templates?.[regionName]?.[
                            square?.name
                          ];

                        return (
                          <div className="work-analytics-card-row">
                            <span>Закрыто за последний месяц</span>
                            <div className="work-analytics-card-row-gap"></div>
                            <span className="work-analytics-card-row-value">
                              {closedConnectionsOfRegion || 0}
                            </span>
                          </div>
                        );
                      })()}
                    </div>
                  ));
              })()}
            </div>
          ))}
        </div>
        <div className="works-analytics-card" style={{ padding: '12px 0' }}>
          <h4 className="work-analytics-card-title">Техподы по квадратам</h4>
          {regionNames.map((regionName) => (
            <div
              style={{ marginTop: '15px' }}
              className="work-analytics-region-data"
            >
              <h3 style={{ marginBottom: '4px' }}>{regionName}</h3>
              {(() => {
                return squares
                  .filter((square) => square?.region === regionName)
                  .map((square) => (
                    <div
                      style={{
                        marginTop: '20px',
                        paddingLeft: '20px',
                      }}
                    >
                      <h3 style={{ marginBottom: '4px' }}>{square?.name}</h3>
                      {(() => {
                        const openTehOfRegion =
                          tehOpenToday?.templates?.[regionName]?.[square?.name];

                        return (
                          <div className="work-analytics-card-row">
                            <span>Открыто за сегодня</span>
                            <div className="work-analytics-card-row-gap"></div>
                            <span className="work-analytics-card-row-value">
                              {openTehOfRegion || 0}
                            </span>
                          </div>
                        );
                      })()}
                      {(() => {
                        const closedTehOfRegion =
                          tehClosedToday?.templates?.[regionName]?.[
                            square?.name
                          ];

                        return (
                          <div className="work-analytics-card-row">
                            <span>Закрыто за сегодня</span>
                            <div className="work-analytics-card-row-gap"></div>
                            <span className="work-analytics-card-row-value">
                              {closedTehOfRegion || 0}
                            </span>
                          </div>
                        );
                      })()}
                      {(() => {
                        const closedTehOfRegion =
                          tehClosedYesterday?.templates?.[regionName]?.[
                            square?.name
                          ];

                        return (
                          <div className="work-analytics-card-row">
                            <span>Закрыто за вчера</span>
                            <div className="work-analytics-card-row-gap"></div>
                            <span className="work-analytics-card-row-value">
                              {closedTehOfRegion || 0}
                            </span>
                          </div>
                        );
                      })()}
                      {(() => {
                        const closedTehOfRegion =
                          tehClosedLastWeek?.templates?.[regionName]?.[
                            square?.name
                          ];

                        return (
                          <div className="work-analytics-card-row">
                            <span>Закрыто за последнюю неделю</span>
                            <div className="work-analytics-card-row-gap"></div>
                            <span className="work-analytics-card-row-value">
                              {closedTehOfRegion || 0}
                            </span>
                          </div>
                        );
                      })()}
                      {(() => {
                        const closedTehOfRegion =
                          tehClosedLastMonth?.templates?.[regionName]?.[
                            square?.name
                          ];

                        return (
                          <div className="work-analytics-card-row">
                            <span>Закрыто за последний месяц</span>
                            <div className="work-analytics-card-row-gap"></div>
                            <span className="work-analytics-card-row-value">
                              {closedTehOfRegion || 0}
                            </span>
                          </div>
                        );
                      })()}
                    </div>
                  ));
              })()}
            </div>
          ))}
        </div>
      </div>
      <Button
        style={{
          position: 'fixed',
          left: '140px',
          bottom: worksAnalyticsLoading ? '20px' : '-60px',
          fontSize: '20px',
          width: 'calc(100% - 280px)',
          padding: '10px 14px',
          color: '#FFFFFF',
          transition: '.3s',
        }}
        disabled
      >
        Загрузка...
      </Button>
    </div>
  );
};

export default Home;
