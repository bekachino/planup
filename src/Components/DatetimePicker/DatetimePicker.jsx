import React, { useEffect, useState } from 'react';
import Input from '../Input/Input';
import { ReactComponent as CalendarIcon } from '../../assets/calendar.svg';
import { ReactComponent as ClockIcon } from '../../assets/clock.svg';
import { ReactComponent as ArrowLeftIcon } from '../../assets/arrow-left-white.svg';
import { ReactComponent as ArrowRightIcon } from '../../assets/arrow-right-white.svg';
import moment from 'moment';
import { weekDays } from '../../constants';
import Button from '../Button/Button';
import './datetimePicker.css';

const DatetimePicker = ({ value, onChange, ...rest }) => {
  const [datepickerType, setDatepickerType] = useState('date');
  const [currentDate, setCurrentDate] = useState(moment());
  const [showCalendar, setShowCalendar] = useState(false);
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

  const monthBack = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'month'));
  };

  const monthForward = () => {
    setCurrentDate(currentDate.clone().add(1, 'month'));
  };

  const onHourChange = (e) => {
    const hour = e.target.value;
    const numberValidation = hour.replace(/[^0-9]/g, '');
    const newValue = !!value
      ? moment(
          moment(value, 'YYYY-MM-DDTHH:mm').clone().hour(numberValidation)
        ).format('YYYY-MM-DDTHH:mm')
      : moment(moment().clone().hour(numberValidation)).format(
          'YYYY-MM-DDTHH:mm'
        );

    onChange({
      target: {
        value: newValue,
      },
    });
    setTimeout(() =>
      document.querySelector('.date-time-clock .date-time-clock-hour').focus()
    );
  };

  const onMinuteChange = (e) => {
    const minute = e.target.value;
    const numberValidation = minute.replace(/[^0-9]/g, '');
    const newValue = !!value
      ? moment(
          moment(value, 'YYYY-MM-DDTHH:mm').clone().minute(numberValidation)
        ).format('YYYY-MM-DDTHH:mm')
      : moment(moment().clone().minute(numberValidation)).format(
          'YYYY-MM-DDTHH:mm'
        );

    onChange({
      target: {
        value: newValue,
      },
    });
    setTimeout(() =>
      document.querySelector('.date-time-clock .date-time-clock-minute').focus()
    );
  };
  useEffect(() => {
    document.addEventListener('mouseup', () => setShowCalendar(false));
  }, []);

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
      <span className="date-time-calendar-year">{currentYear}</span>
      {calendar.map((day, i) => (
        <div
          className={`date-time-calendar-day ${
            day.isBefore(currentDate, 'month') ||
            day.isAfter(currentDate, 'month')
              ? 'date-time-calendar-day-not-current-month'
              : ''
          } ${day.isSame(moment(), 'day') ? 'date-time-calendar-day-today' : ''} ${
            day.isSame(moment(value, 'YYYY-MM-DDTHH:mm'), 'day')
              ? 'date-time-calendar-day-picked'
              : ''
          }`}
          key={i}
          onClick={() =>
            onChange({ target: { value: day.format('YYYY-MM-DDTHH:mm') } })
          }
        >
          {day.format('D')}
        </div>
      ))}
    </div>
  );

  const TimePicker = () => (
    <div className="date-time-clock">
      <Input
        className="date-time-clock-hour"
        type="number"
        value={!!value ? moment(value, 'YYYY-MM-DDTHH:mm').format('HH') : 12}
        onChange={onHourChange}
        autoComplete="off"
      />
      :
      <Input
        className="date-time-clock-minute"
        type="number"
        value={!!value ? moment(value, 'YYYY-MM-DDTHH:mm').format('mm') : '00'}
        onChange={onMinuteChange}
        autoComplete="off"
      />
    </div>
  );

  return (
    <div className="date-time-picker" onMouseUp={(e) => e.stopPropagation()}>
      <Input
        className="date-time-picker-input"
        value={value}
        {...rest}
        onFocus={() => setShowCalendar(true)}
        onChange={onChange}
      />
      <div className="date-time-picker-icon" />
      <div
        className="date-time-calendar"
        style={{ display: showCalendar ? 'block' : 'none' }}
      >
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
          {datepickerType === 'date' ? <Datepicker /> : <TimePicker />}
          {datepickerType === 'date' ? <CalendarDays /> : <></>}
        </div>
        <div className="date-time-calendar-footer">
          <Button onClick={() => setShowCalendar(false)}>Готово</Button>
        </div>
      </div>
    </div>
  );
};

export default DatetimePicker;
