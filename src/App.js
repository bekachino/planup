import moment from 'moment';
import { Route, Routes } from 'react-router-dom';
import Home from './Containers/Home/Home';
import Header from './Components/Header/Header';
import 'moment/locale/ru';
import Templates from './Containers/Templates/Templates';
import CreateTemplate from './Containers/CreateTemplate/CreateTemplate';
import './App.css';
import Template from './Containers/Template/Template';
import Resolutions from './Containers/Resolutions/Resolutions';

moment.locale('ru');

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="templates" element={<Templates />} />
        <Route path="resolutions" element={<Resolutions />} />
        <Route path="create-template" element={<CreateTemplate />} />
        <Route
          path="edit-template/:templateId"
          element={<CreateTemplate isEdit />}
        />
        <Route path="templates/:templateId" element={<Template />} />
      </Routes>
    </div>
  );
};

export default App;
