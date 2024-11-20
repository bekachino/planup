import React, { useState } from 'react';
import Input from '../Input/Input';
import { ReactComponent as CalendarIcon } from '../../assets/calendar.svg';
import { ReactComponent as ClockIcon } from '../../assets/clock.svg';
import './datetimePicker.css';

const DatetimePicker = ({ ...rest }) => {
  const [datepickerType, setDatepickerType] = useState('date');

  return (
    <div className="date-time-picker">
      <Input
        className="date-time-picker-input"
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
      </div>
    </div>
  );
};

export default DatetimePicker;
