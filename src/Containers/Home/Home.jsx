import React, { useEffect, useRef, useState } from 'react';
import Button from '../../Components/Button/Button';
import { ReactComponent as AddIcon } from '../../assets/add-white.svg';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getWorks } from '../../features/works/worksThunk';
import moment from 'moment';
import { statusIcons, workStatuses } from '../../constants';
import './home.css';

const Home = () => {
  const dispatch = useAppDispatch();
  const dutiesTableRef = useRef(null);
  const { works, worksLoading } = useAppSelector((state) => state.worksState);
  const [dutiesTableHeight, setDutiesTableHeight] = useState(0);

  useEffect(() => {
    dispatch(getWorks());
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
                  (works[0] || []).map((work, i) => (
                    <th key={i}>
                      <span className="duty-item-cell-title-text">
                        {work.name}
                      </span>
                    </th>
                  ))}
                {!worksLoading && !works.length && (
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
                  className={`duty-item-status-${workStatuses[work.find((workField) => workField.name === 'Статус')?.field_value]}`}
                  key={i}
                >
                  {(work || []).map((workField, i) => (
                    <td key={i}>
                      <span className="duty-item-cell-value">
                        {workField.name === 'Статус' &&
                          statusIcons[workField.field_value]}
                        <span className="duty-item-cell-value-text">
                          {getTableCellValue(workField)}
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
