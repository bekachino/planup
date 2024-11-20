import { useState } from 'react';
import SearchFilters from './Components/SearchFilters/SearchFilters';
import './App.css';
import DatetimePicker from './Components/DatetimePicker/DatetimePicker';
import moment from 'moment';

function App() {
  const [state, setState] = useState(moment());

  const onChange = (e) => {
    setState(moment(e.target.value, 'YYYY-MM-DDThh:mm'));
  };

  return (
    <div className="App">
      <SearchFilters placeholder="Поиск" />
      <br />
      <DatetimePicker
        type="datetime-local"
        placeholder="Желаемая дата приезда"
        label="Желаемая дата приезда"
        value={!!state ? state.format('YYYY-MM-DDTHH:mm') : ''}
        onChange={onChange}
      />
    </div>
  );
}

export default App;
