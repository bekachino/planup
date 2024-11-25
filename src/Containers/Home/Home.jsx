import React, { useEffect, useRef, useState } from 'react';
import Button from '../../Components/Button/Button';
import { ReactComponent as AddIcon } from '../../assets/add-white.svg';
import { Link } from 'react-router-dom';
import { ReactComponent as StartedIcon } from '../../assets/started.svg';
import { ReactComponent as StoppedIcon } from '../../assets/stopped.svg';
import './home.css';

const Home = () => {
  const dutiesTableRef = useRef(null);
  const [dutiesTableHeight, setDutiesTableHeight] = useState(0);

  useEffect(() => {
    if (dutiesTableRef.current) {
      setTimeout(() => {
        setDutiesTableHeight(
          window.innerHeight -
            dutiesTableRef.current.getBoundingClientRect().top - 20
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
            height: dutiesTableHeight,
          }}
          ref={dutiesTableRef}
        >
          <table>
            <thead>
              <tr>
                <th>Номер</th>
                <th>Квадрат</th>
                <th>Запланирован</th>
                <th>Статус</th>
                <th>Шаблон</th>
                <th>Исполнитель</th>
                <th>Резолюция</th>
                <th>Адрес</th>
                <th>Б24</th>
              </tr>
            </thead>
            <tbody>
            <tr className="duty-item-status-started">
              <td>
                  <span className="duty-item-cell-value">
                    <Link to="/home">44565</Link>
                  </span>
              </td>
              <td>
                <span className="duty-item-cell-value">Базар Коргон</span>
              </td>
              <td>
                <span className="duty-item-cell-value">15-10-2024</span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    <StartedIcon />
                    Начато
                  </span>
              </td>
              <td>
                <span className="duty-item-cell-value">Подключение Чуй</span>
              </td>
              <td>
                <span className="duty-item-cell-value">Бакай Кокенов</span>
              </td>
              <td>
                <span className="duty-item-cell-value">Нет дома</span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    Кыргызстан, Джалал-Абадская обл., г.Джалал-Абад, ул.Женижок,
                    д. 18/17
                  </span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    <Link to="/home">354544</Link>
                  </span>
              </td>
            </tr>
            <tr className="duty-item-status-stopped">
              <td>
                  <span className="duty-item-cell-value">
                    <Link to="/home">44565</Link>
                  </span>
              </td>
              <td>
                <span className="duty-item-cell-value">Базар Коргон</span>
              </td>
              <td>
                <span className="duty-item-cell-value">15-10-2024</span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    <StoppedIcon />
                    Приостановлено
                  </span>
              </td>
              <td>
                <span className="duty-item-cell-value">Подключение Чуй</span>
              </td>
              <td>
                <span className="duty-item-cell-value">Бакай Кокенов</span>
              </td>
              <td>
                <span className="duty-item-cell-value">Нет дома</span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    Кыргызстан, Джалал-Абадская обл., г.Джалал-Абад, ул.Женижок,
                    д. 18/17
                  </span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    <Link to="/home">354544</Link>
                  </span>
              </td>
            </tr>
            <tr className="duty-item-status-stopped">
              <td>
                  <span className="duty-item-cell-value">
                    <Link to="/home">44565</Link>
                  </span>
              </td>
              <td>
                <span className="duty-item-cell-value">Базар Коргон</span>
              </td>
              <td>
                <span className="duty-item-cell-value">15-10-2024</span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    <StoppedIcon />
                    Приостановлено
                  </span>
              </td>
              <td>
                <span className="duty-item-cell-value">Подключение Чуй</span>
              </td>
              <td>
                <span className="duty-item-cell-value">Бакай Кокенов</span>
              </td>
              <td>
                <span className="duty-item-cell-value">Нет дома</span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    Кыргызстан, Джалал-Абадская обл., г.Джалал-Абад, ул.Женижок,
                    д. 18/17
                  </span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    <Link to="/home">354544</Link>
                  </span>
              </td>
            </tr>
            <tr className="duty-item-status-stopped">
              <td>
                  <span className="duty-item-cell-value">
                    <Link to="/home">44565</Link>
                  </span>
              </td>
              <td>
                <span className="duty-item-cell-value">Базар Коргон</span>
              </td>
              <td>
                <span className="duty-item-cell-value">15-10-2024</span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    <StoppedIcon />
                    Приостановлено
                  </span>
              </td>
              <td>
                <span className="duty-item-cell-value">Подключение Чуй</span>
              </td>
              <td>
                <span className="duty-item-cell-value">Бакай Кокенов</span>
              </td>
              <td>
                <span className="duty-item-cell-value">Нет дома</span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    Кыргызстан, Джалал-Абадская обл., г.Джалал-Абад, ул.Женижок,
                    д. 18/17
                  </span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    <Link to="/home">354544</Link>
                  </span>
              </td>
            </tr>
            <tr className="duty-item-status-stopped">
              <td>
                  <span className="duty-item-cell-value">
                    <Link to="/home">44565</Link>
                  </span>
              </td>
              <td>
                <span className="duty-item-cell-value">Базар Коргон</span>
              </td>
              <td>
                <span className="duty-item-cell-value">15-10-2024</span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    <StoppedIcon />
                    Приостановлено
                  </span>
              </td>
              <td>
                <span className="duty-item-cell-value">Подключение Чуй</span>
              </td>
              <td>
                <span className="duty-item-cell-value">Бакай Кокенов</span>
              </td>
              <td>
                <span className="duty-item-cell-value">Нет дома</span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    Кыргызстан, Джалал-Абадская обл., г.Джалал-Абад, ул.Женижок,
                    д. 18/17
                  </span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    <Link to="/home">354544</Link>
                  </span>
              </td>
            </tr>
            <tr className="duty-item-status-stopped">
              <td>
                  <span className="duty-item-cell-value">
                    <Link to="/home">44565</Link>
                  </span>
              </td>
              <td>
                <span className="duty-item-cell-value">Базар Коргон</span>
              </td>
              <td>
                <span className="duty-item-cell-value">15-10-2024</span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    <StoppedIcon />
                    Приостановлено
                  </span>
              </td>
              <td>
                <span className="duty-item-cell-value">Подключение Чуй</span>
              </td>
              <td>
                <span className="duty-item-cell-value">Бакай Кокенов</span>
              </td>
              <td>
                <span className="duty-item-cell-value">Нет дома</span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    Кыргызстан, Джалал-Абадская обл., г.Джалал-Абад, ул.Женижок,
                    д. 18/17
                  </span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    <Link to="/home">354544</Link>
                  </span>
              </td>
            </tr>
            <tr className="duty-item-status-stopped">
              <td>
                  <span className="duty-item-cell-value">
                    <Link to="/home">44565</Link>
                  </span>
              </td>
              <td>
                <span className="duty-item-cell-value">Базар Коргон</span>
              </td>
              <td>
                <span className="duty-item-cell-value">15-10-2024</span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    <StoppedIcon />
                    Приостановлено
                  </span>
              </td>
              <td>
                <span className="duty-item-cell-value">Подключение Чуй</span>
              </td>
              <td>
                <span className="duty-item-cell-value">Бакай Кокенов</span>
              </td>
              <td>
                <span className="duty-item-cell-value">Нет дома</span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    Кыргызстан, Джалал-Абадская обл., г.Джалал-Абад, ул.Женижок,
                    д. 18/17
                  </span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    <Link to="/home">354544</Link>
                  </span>
              </td>
            </tr>
            <tr className="duty-item-status-stopped">
              <td>
                  <span className="duty-item-cell-value">
                    <Link to="/home">44565</Link>
                  </span>
              </td>
              <td>
                <span className="duty-item-cell-value">Базар Коргон</span>
              </td>
              <td>
                <span className="duty-item-cell-value">15-10-2024</span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    <StoppedIcon />
                    Приостановлено
                  </span>
              </td>
              <td>
                <span className="duty-item-cell-value">Подключение Чуй</span>
              </td>
              <td>
                <span className="duty-item-cell-value">Бакай Кокенов</span>
              </td>
              <td>
                <span className="duty-item-cell-value">Нет дома</span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    Кыргызстан, Джалал-Абадская обл., г.Джалал-Абад, ул.Женижок,
                    д. 18/17
                  </span>
              </td>
              <td>
                  <span className="duty-item-cell-value">
                    <Link to="/home">354544</Link>
                  </span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
