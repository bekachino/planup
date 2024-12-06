import React from 'react';
import { ReactComponent as ArrowRightWhiteIcon } from '../../assets/arrow-pointer-right.svg';
import { ReactComponent as MenuBurgerIcon } from '../../assets/burger-black.svg';
import './work.css';

const Work = () => {
  return (
    <div className="work">
      <div className="work-header">
        <button className="work-header-btn">
          <ArrowRightWhiteIcon />
        </button>
        <h2>Наряд</h2>
        <button className="work-header-btn">
          <MenuBurgerIcon />
        </button>
      </div>
      <div className="work-body">
        <div className="work-value-row">
          <span className="work-row-name">Исполнитель</span>
          <span className="work-row-value">Асан Турдукулов</span>
        </div>
        <div className="work-value-row">
          <span className="work-row-name">ID</span>
          <span className="work-row-value">872348</span>
        </div>
        <div className="work-value-row">
          <span className="work-row-name">Тип</span>
          <span className="work-row-value">1</span>
        </div>
        <div className="work-value-row">
          <span className="work-row-name">Лицо</span>
          <span className="work-row-value">Физическое лицо</span>
        </div>
        <div className="work-value-row">
          <span className="work-row-name">Адрес</span>
          <span className="work-row-value">
            Кыргызстан, Чуйская обл., Панфиловский район
          </span>
        </div>
        <div className="work-value-row">
          <span className="work-row-name">Выезд к абоненту</span>
          <span className="work-row-value">Бесплатный</span>
        </div>
        <div className="work-value-row">
          <span className="work-row-name">Тип работы</span>
          <span className="work-row-value">Обрыв</span>
        </div>
        <div className="work-value-row">
          <span className="work-row-name">Лицевой счёт</span>
          <span className="work-row-value">978172983</span>
        </div>
        <div className="work-value-row">
          <span className="work-row-name">Описание заявки</span>
          <span className="work-row-value">
            Горит лос, перезагрузка не помогла, нужна проверка ОВК, о возможном
            платном выезде уведомлен, если обрыв в территории дома, выезд 400с
          </span>
        </div>
      </div>
    </div>
  );
};

export default Work;
