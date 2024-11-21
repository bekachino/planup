import React, { useEffect, useState } from 'react';
import Input from '../Input/Input';
import { ReactComponent as CalendarIcon } from '../../assets/calendar.svg';
import { ReactComponent as ClockIcon } from '../../assets/clock.svg';
import { ReactComponent as ArrowLeftIcon } from '../../assets/arrow-left-white.svg';
import { ReactComponent as ArrowRightIcon } from '../../assets/arrow-right-white.svg';
import moment from 'moment';
import { weekDays } from '../../constants';
import './datetimePicker.css';

const DatetimePicker = ({ value, onChange, ...rest }) => {
  const [datepickerType, setDatepickerType] = useState('date');
  const [currentDate, setCurrentDate] = useState(moment());
  const calendar = [];

  const startDay = currentDate.clone().startOf('month').startOf('week');
  const endDay = currentDate.clone().endOf('month').endOf('week');
  const day = startDay.clone();

  const currentMonthName = currentDate.format('MMMM');
  const currentYear = currentDate.format('YYYY');

  while (!day.isAfter(endDay)) {
    calendar.push(day.clone());
    day.add(1, 'day');
  }

  useEffect(() => {
    //setCurrentDate(moment(value, 'YYYY-MM-DDThh:mm'));
  }, [value]);

  const monthBack = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'month'));
  };

  const monthForward = () => {
    setCurrentDate(currentDate.clone().add(1, 'month'));
  };

  const Datepicker = () => (
    <div className="date-time-calendar-body-top">
      <div className="date-time-calendar-body-top-actions">
        <span className="date-time-calendar-month-back" onClick={monthBack}>
          {<ArrowLeftIcon />}
        </span>
        <span className="date-time-calendar-current-month">
          {currentMonthName}
        </span>
        <span className="date-time-calendar-month-next" onClick={monthForward}>
          {<ArrowRightIcon />}
        </span>
      </div>
      <div className="date-time-calendar-body-top-day-names">
        {weekDays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
    </div>
  );

  const CalendarDays = () => (
    <div className="date-time-calendar-days">
      {calendar.map((day, i) => (
        <div
          className={`date-time-calendar-day ${
            day.isBefore(currentDate, 'month') ||
            day.isAfter(currentDate, 'month')
              ? 'date-time-calendar-day-not-current-month'
              : ''
          } ${day.isSame(moment(), 'day') ? 'date-time-calendar-day-today' : ''} ${
            day.isSame(moment(value, 'YYYY-MM-DDThh:mm'), 'day') ? 'date-time-calendar-day-picked' : ''
          }`}
          key={i}
          onClick={() =>
            onChange({ target: { value: day.format('YYYY-MM-DDThh:mm') } })
          }
        >
          {day.format('D')}
        </div>
      ))}
    </div>
  );

  return (
    <div className="date-time-picker">
      <Input
        className="date-time-picker-input"
        value={value}
        {...rest}
        onClick={(e) => e.preventDefault()}
      />
      <div className="date-time-picker-icon" />
      <div className="date-time-calendar">
        <div className="date-time-calendar-header">
          <div
            className="date-time-calendar-switcher"
            style={{
              left: datepickerType === 'date' ? '6px' : 'calc(50% + 6px)',
            }}
          />
          <span
            className={
              datepickerType === 'date' ? 'date-time-calendar-tab-active' : ''
            }
            onClick={() => setDatepickerType('date')}
          >
            <CalendarIcon />
            Дата
          </span>
          <span
            className={
              datepickerType === 'time' ? 'date-time-calendar-tab-active' : ''
            }
            onClick={() => setDatepickerType('time')}
          >
            <ClockIcon />
            Время
          </span>
        </div>
        <div className="date-time-calendar-body">
          {datepickerType === 'date' ? <Datepicker /> : <></>}
          {datepickerType === 'date' ? <CalendarDays /> : <></>}
        </div>
      </div>
    </div>
  );
};

export default DatetimePicker;
