import React, { useEffect, useRef, useState } from 'react';
import Button from '../../Components/Button/Button';
import { ReactComponent as AddIcon } from '../../assets/add-white.svg';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getWorkFields, getWorks } from '../../features/works/worksThunk';
import moment from 'moment';
import { STATUS_ICONS, WORK_STATUSES } from '../../constants';
import './home.css';

const Home = () => {
  const dispatch = useAppDispatch();
  const dutiesTableRef = useRef(null);
  const { works, worksLoading, worksListFields, worksListFieldsLoading } =
    useAppSelector((state) => state.worksState);
  const [dutiesTableHeight, setDutiesTableHeight] = useState(0);

  useEffect(() => {
    dispatch(getWorks());
    dispatch(getWorkFields());
  }, [dispatch]);

  useEffect(() => {
    if (dutiesTableRef.current) {
      setTimeout(() => {
        setDutiesTableHeight(
          window.innerHeight -
            dutiesTableRef.current.getBoundingClientRect().top -
            20
        );
      }, 200);
    }
  }, []);

  const getTableCellValue = (workField) => {
    if (!!workField?.field_value) {
      if (['Номер наряда'].includes(workField.name)) {
        return (
          <Link
            to={
              workField.name === 'Номер наряда'
                ? `/work/${workField?.id}`
                : '/home'
            }
          >
            {workField.field_value || '-'}
          </Link>
        );
      } else if (workField.name === 'Желаемая дата  приезда') {
        return !!workField.field_value
          ? moment(workField.field_value).format('DD-MM-YYYY HH:mm')
          : '-';
      } else {
        return workField.field_value || '-';
      }
    } else return '-';
  };

  return (
    <div className="home">
      <div className="home-wrapper">
        <Button className="home-table-add-field-btn" color="secondary">
          <AddIcon />
          Добавить поле
        </Button>
        <div
          className="home-table-wrapper"
          style={{
            maxHeight: dutiesTableHeight,
          }}
          ref={dutiesTableRef}
        >
          <table>
            <thead>
              <tr>
                {worksLoading && (
                  <th>
                    <span className="duty-item-cell-title-text">
                      Загрузка...
                    </span>
                  </th>
                )}
                {!worksLoading &&
                  !worksListFieldsLoading &&
                  (worksListFields || []).map((workField, i) => (
                    <th key={i}>
                      <span className="duty-item-cell-title-text">
                        {workField.name}
                      </span>
                    </th>
                  ))}
                {!worksLoading && !worksListFieldsLoading && !works.length && (
                  <th>
                    <span className="duty-item-cell-title-text">
                      Нет данных
                    </span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {(works || []).map((work, i) => (
                <tr
                  className={`duty-item-status-${WORK_STATUSES[work.find((workField) => workField.name === 'Статус')?.field_value]}`}
                  key={i}
                >
                  {(worksListFields || []).map((workField, i) => (
                    <td key={i}>
                      <span className="duty-item-cell-value">
                        {workField.name === 'Статус' &&
                          STATUS_ICONS[
                            work.find(
                              (workCell) => workCell.name === workField.name
                            ).field_value
                          ]}
                        <span className="duty-item-cell-value-text">
                          {getTableCellValue(
                            work.find(
                              (workCell) => workCell.name === workField.name
                            )
                          )}
                        </span>
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
