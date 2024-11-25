import moment from 'moment';
import { Route, Routes } from 'react-router-dom';
import Home from './Containers/Home/Home';
import Header from './Components/Header/Header';
import 'moment/locale/ru';
import './App.css';

moment.locale('ru');

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
