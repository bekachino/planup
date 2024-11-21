import { useState } from 'react';
import SearchFilters from './Components/SearchFilters/SearchFilters';
import DatetimePicker from './Components/DatetimePicker/DatetimePicker';
import moment from 'moment';
import 'moment/locale/ru';
import './App.css';

moment.locale('ru');

function App() {
  const [state, setState] = useState('');

  const onChange = (e) => {
    setState(e.target.value);
  };

  return (
    <div className="App">
      <SearchFilters placeholder="Поиск" />
      <br />
      <DatetimePicker
        type="datetime-local"
        placeholder="Желаемая дата приезда"
        label="Желаемая дата приезда"
        value={!!state ? state : ''}
        onChange={onChange}
      />
    </div>
  );
}

export default App;
