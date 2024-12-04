import React, { useEffect, useRef, useState } from 'react';
import Button from '../../Components/Button/Button';
import { ReactComponent as AddIcon } from '../../assets/add-white.svg';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getWorks } from '../../features/works/worksThunk';
import moment from 'moment';
import { statusIcons } from '../../constants';
import './home.css';

const Home = () => {
  const dispatch = useAppDispatch();
  const dutiesTableRef = useRef(null);
  const { works, worksLoading } = useAppSelector((state) => state.worksState);
  const [dutiesTableHeight, setDutiesTableHeight] = useState(0);

  useEffect(() => {
    dispatch(getWorks());
  }, []);

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
              </tr>
            </thead>
            <tbody>
              {(works || []).map((work, i) => (
                <tr className="duty-item-status-started" key={i}>
                  {(work || []).map((workField, i) => (
                    <td key={i}>
                      <span className="duty-item-cell-value">
                        {workField.name === 'Статус' &&
                          statusIcons[workField.field_value]}
                        <span className="duty-item-cell-value-text">
                          {['Б24', 'ID'].includes(workField.name) ? (
                            <Link to="/home">
                              {workField.field_value || '-'}
                            </Link>
                          ) : workField.name === 'Желаемая дата  приезда' ? (
                            !!workField.field_value ? (
                              moment(workField.field_value).format(
                                'DD-MM-YYYY HH:mm'
                              )
                            ) : (
                              '-'
                            )
                          ) : (
                            workField.field_value || '-'
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
