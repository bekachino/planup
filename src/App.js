import moment from 'moment';
import 'moment/locale/ru';
import { Route, Routes } from 'react-router-dom';
import Home from './Containers/Home/Home';
import Header from './Components/Header/Header';
import Alerts from './Components/Alerts/Alerts';
import './App.css';

moment.locale('ru');

const App = () => (
  <div className="App">
    <Header />
    <Alerts />
    <Routes>
      <Route path="home" element={<Home />} />
    </Routes>
  </div>
);

export default App;
