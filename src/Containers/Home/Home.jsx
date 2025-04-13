import React, { useEffect } from 'react';
import useFetchWorksAnalytics from './hooks';
import { ResponsivePie } from '@nivo/pie';
import './home.css';

const regionNames = [
  'Чуй',
  'Иссык-Куль',
  'Джалал-Абад',
  'Нарын',
  'Талас',
  'Ош',
];

const Home = () => {
  const {
    fetchWorksAnalytics,
    worksAnalyticsLoading,
    connectionsOpenToday,
    tehOpenToday,
    connectionsClosedToday,
    connectionsClosedYesterday,
    connectionsClosedLastWeek,
    connectionsClosedLastMonth,
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
      <div className="works-analytics">
        <div className="works-analytics-card">
          <h2>Подключения</h2>
        </div>
        <div className="works-analytics-card">
          <h2>Техподы</h2>
        </div>
        <div className="works-analytics-card">
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
                !!connectionsOpenToday?.count && !!connectionsClosedToday?.count
              }
              tooltip={() => <div></div>}
            />
          </div>
          <div className="work-analytics-card-row">
            <h4>Закрыто за вчера</h4>
            <div className="work-analytics-card-row-gap"></div>
            <h4 className="work-analytics-card-row-value">
              {connectionsClosedYesterday?.count || 0}
            </h4>
          </div>
          <div className="work-analytics-card-row">
            <h4>Закрыто за последнюю неделю</h4>
            <div className="work-analytics-card-row-gap"></div>
            <h4 className="work-analytics-card-row-value">
              {connectionsClosedLastWeek?.count || 0}
            </h4>
          </div>
          <div className="work-analytics-card-row">
            <h4>Закрыто за последний месяц</h4>
            <div className="work-analytics-card-row-gap"></div>
            <h4 className="work-analytics-card-row-value">
              {connectionsClosedLastMonth?.count || 0}
            </h4>
          </div>
        </div>
        <div className="works-analytics-card">
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
                !!tehOpenToday?.count && !!tehClosedToday?.count
              }
              tooltip={() => <div></div>}
            />
          </div>
          <div className="work-analytics-card-row">
            <h4>Закрыто за вчера</h4>
            <div className="work-analytics-card-row-gap"></div>
            <h4 className="work-analytics-card-row-value">
              {tehClosedYesterday?.count || 0}
            </h4>
          </div>
          <div className="work-analytics-card-row">
            <h4>Закрыто за последнюю неделю</h4>
            <div className="work-analytics-card-row-gap"></div>
            <h4 className="work-analytics-card-row-value">
              {tehClosedLastWeek?.count || 0}
            </h4>
          </div>
          <div className="work-analytics-card-row">
            <h4>Закрыто за последний месяц</h4>
            <div className="work-analytics-card-row-gap"></div>
            <h4 className="work-analytics-card-row-value">
              {tehClosedLastMonth?.count || 0}
            </h4>
          </div>
        </div>
        <div className="works-analytics-card">
          <h4 className="work-analytics-card-title">Подключения по областям</h4>
          {regionNames.map((regionName) => (
            <div style={{ marginTop: '15px' }}>
              <h3>{regionName}</h3>
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
                          !!tehOpenToday?.count && !!tehClosedToday?.count
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
                    <h4>Закрыто за вчера</h4>
                    <div className="work-analytics-card-row-gap"></div>
                    <h4 className="work-analytics-card-row-value">
                      {sumOfClosedConnections || 0}
                    </h4>
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
                    <h4>Закрыто за последнюю неделю</h4>
                    <div className="work-analytics-card-row-gap"></div>
                    <h4 className="work-analytics-card-row-value">
                      {sumOfClosedConnections || 0}
                    </h4>
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
                    <h4>Закрыто за последний месяц</h4>
                    <div className="work-analytics-card-row-gap"></div>
                    <h4 className="work-analytics-card-row-value">
                      {sumOfClosedConnections || 0}
                    </h4>
                  </div>
                );
              })()}
            </div>
          ))}
        </div>
        <div className="works-analytics-card">
          <h4 className="work-analytics-card-title">Техподы по областям</h4>
          {regionNames.map((regionName) => (
            <div style={{ marginTop: '15px' }}>
              <h3>{regionName}</h3>
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
                          !!tehOpenToday?.count && !!tehClosedToday?.count
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
                    <h4>Закрыто за вчера</h4>
                    <div className="work-analytics-card-row-gap"></div>
                    <h4 className="work-analytics-card-row-value">
                      {sumOfClosedConnections || 0}
                    </h4>
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
                    <h4>Закрыто за последнюю неделю</h4>
                    <div className="work-analytics-card-row-gap"></div>
                    <h4 className="work-analytics-card-row-value">
                      {sumOfClosedConnections || 0}
                    </h4>
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
                    <h4>Закрыто за последний месяц</h4>
                    <div className="work-analytics-card-row-gap"></div>
                    <h4 className="work-analytics-card-row-value">
                      {sumOfClosedConnections || 0}
                    </h4>
                  </div>
                );
              })()}
            </div>
          ))}
        </div>
        <div className="works-analytics-card">
          <h4 className="work-analytics-card-title">
            Подключения по квадратам
          </h4>
        </div>
        <div className="works-analytics-card">
          <h4 className="work-analytics-card-title">Техподы по квадратам</h4>
        </div>
      </div>
    </div>
  );
};

export default Home;
