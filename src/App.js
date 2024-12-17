import moment from 'moment';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Containers/Home/Home';
import { lazy, Suspense, useEffect } from 'react';
import AdminHeader from './Components/AdminHeader/AdminHeader';
import Header from './Components/Header/Header';
import { useAppDispatch, useAppSelector } from './app/hooks';
import 'moment/locale/ru';
import { setUser } from './features/user/usersSlice';
import './App.css';
import User from './Containers/User/User';

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
const Squares = lazy(() => import('./Containers/Squares/Squares'));
const CreateSquare = lazy(
  () => import('./Containers/CreateSquare/CreateSquare')
);
const Users = lazy(() => import('./Containers/Users/Users'));
const CreateUser = lazy(() => import('./Containers/CreateUser/CreateUser'));
const ServiceEngineers = lazy(
  () => import('./Containers/ServiceEngineers/ServiceEngineers')
);
const SectionChiefs = lazy(
  () => import('./Containers/SectionChiefs/SectionChiefs')
);
const CreateSectionChief = lazy(
  () => import('./Containers/CreateSectionChief/CreateSectionChief')
);
const CreateServiceEngineer = lazy(
  () => import('./Containers/CreateServiceEngineer/CreateServiceEngineer')
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
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0NDQxNjMyLCJpYXQiOjE3MzQ0MzgwMzIsImp0aSI6ImRmMTEzYmU0ZTVlYzQ0NDBhNTYzNTAwYzgxOThiM2NhIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJlbmdpbmVlciIsImZ1bGxfbmFtZSI6bnVsbH0.0BTySsLkWN8UATt9yC7t2np_D-w0Up-_3sc9jZG1Ua4',
      })
    );
  }, [dispatch]);

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
        <Route
          path="users"
          element={
            <Suspense fallback={<></>}>
              <Users />
            </Suspense>
          }
        />
        <Route
          path="user/:userId"
          element={
            <Suspense fallback={<></>}>
              <User />
            </Suspense>
          }
        />
        <Route
          path="create-user"
          element={
            <Suspense fallback={<></>}>
              <CreateUser />
            </Suspense>
          }
        />
        <Route
          path="section-chiefs"
          element={
            <Suspense fallback={<></>}>
              <SectionChiefs />
            </Suspense>
          }
        />
        <Route
          path="service-engineers"
          element={
            <Suspense fallback={<></>}>
              <ServiceEngineers />
            </Suspense>
          }
        />
        <Route
          path="create-section-chief"
          element={
            <Suspense fallback={<></>}>
              <CreateSectionChief />
            </Suspense>
          }
        />
        <Route
          path="create-service-engineer"
          element={
            <Suspense fallback={<></>}>
              <CreateServiceEngineer />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
