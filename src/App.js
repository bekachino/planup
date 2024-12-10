import moment from 'moment';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Containers/Home/Home';
import { lazy, Suspense, useEffect } from 'react';
import AdminHeader from './Components/AdminHeader/AdminHeader';
import Header from './Components/Header/Header';
import { useAppDispatch, useAppSelector } from './app/hooks';
import 'moment/locale/ru';
import './App.css';
import { setUser } from './features/user/usersSlice';
import Squares from './Containers/Squares/Squares';
import CreateSquare from './Containers/CreateSquare/CreateSquare';

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
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userState);

  useEffect(() => {
    dispatch(
      setUser({
        name: 'Админ',
        role: 'admin',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzODM1MTMzLCJpYXQiOjE3MzM4MzE1MzMsImp0aSI6IjlhNmFlMDhhOTg4ZTQ2MTdhZDljMTg3YzA4ZTUzM2M2IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJlbmdpbmVlciIsImZ1bGxfbmFtZSI6bnVsbH0.fthAuiIhP52ZVpUHzt8uPitp3CdPPqJlOS_AOVqC9as',
      })
    );
  }, []);

  return (
    <div className="App">
      {user.role === 'admin' ? <AdminHeader /> : <Header />}
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
        <Route
          path="squares"
          element={
            <Suspense fallback={<></>}>
              <Squares />
            </Suspense>
          }
        />
        <Route
          path="create-square"
          element={
            <Suspense fallback={<></>}>
              <CreateSquare />
            </Suspense>
          }
        />
        <Route
          path="edit-square/:squareId"
          element={
            <Suspense fallback={<></>}>
              <CreateSquare isEdit />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
