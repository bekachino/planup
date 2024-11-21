import { useState } from 'react';
import SearchFilters from './Components/SearchFilters/SearchFilters';
import DatetimePicker from './Components/DatetimePicker/DatetimePicker';
import moment from 'moment';
import 'moment/locale/ru';
import './App.css';
import FileUpload from './Components/File/FileUpload';

moment.locale('ru');

function App() {
  const [state, setState] = useState('');
  const [file, setFile] = useState(null);

  const onChange = (e) => {
    setState(e.target.value);
  };

  const onFileChange = (e) => {
    setFile(e.target.value);
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
      <FileUpload value={file} onChange={onFileChange} />
    </div>
  );
}

export default App;
