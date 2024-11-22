import moment from 'moment';
import 'moment/locale/ru';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Containers/Home/Home';
import Header from './Components/Header/Header';

moment.locale('ru');

const App = () => (
  <div className="App">
    <Header />
    <Routes>
      <Route path="home" element={<Home />} />
    </Routes>
  </div>
);

export default App;
