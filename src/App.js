import moment from 'moment';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Containers/Home/Home';
import Header from './Components/Header/Header';
import 'moment/locale/ru';
import { lazy, Suspense } from 'react';
import './App.css';

const Work = lazy(() => import('./Containers/Work/Work'));
const Templates = lazy(() => import('./Containers/Templates/Templates'));
const CreateTemplate = lazy(
  () => import('./Containers/CreateTemplate/CreateTemplate')
);
const Template = lazy(() => import('./Containers/Template/Template'));
const Resolutions = lazy(() => import('./Containers/Resolutions/Resolutions'));
const CreateResolution = lazy(
  () => import('./Containers/CreateResolution/CreateResolution')
);

moment.locale('ru');

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route
          path="work/:workId"
          element={
            <Suspense fallback={<></>}>
              <Work />
            </Suspense>
          }
        />
        <Route
          path="home"
          element={
            <Suspense fallback={<></>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="templates"
          element={
            <Suspense fallback={<></>}>
              <Templates />
            </Suspense>
          }
        />
        <Route
          path="resolutions"
          element={
            <Suspense fallback={<></>}>
              <Resolutions />
            </Suspense>
          }
        />
        <Route
          path="create-template"
          element={
            <Suspense fallback={<></>}>
              <CreateTemplate />
            </Suspense>
          }
        />
        <Route
          path="create-resolution"
          element={
            <Suspense fallback={<></>}>
              <CreateResolution />
            </Suspense>
          }
        />
        <Route
          path="edit-template/:templateId"
          element={
            <Suspense fallback={<></>}>
              <CreateTemplate isEdit />
            </Suspense>
          }
        />
        <Route
          path="edit-resolution/:resolutionId"
          element={
            <Suspense fallback={<></>}>
              <CreateResolution isEdit />
            </Suspense>
          }
        />
        <Route
          path="templates/:templateId"
          element={
            <Suspense fallback={<></>}>
              <Template />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
