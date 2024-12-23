import moment from 'moment';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Containers/Home/Home';
import { lazy, Suspense } from 'react';
import AdminHeader from './Components/AdminHeader/AdminHeader';
import Header from './Components/Header/Header';
import { useAppSelector } from './app/hooks';
import 'moment/locale/ru';
import './App.css';

const SignIn = lazy(() => import('./Containers/SignIn/SignIn'));
const Work = lazy(() => import('./Containers/Work/Work'));
const CreateWork = lazy(() => import('./Containers/CreateWork/CreateWork'));
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
const User = lazy(() => import('./Containers/User/User'));
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
  const location = useLocation();
  const { user } = useAppSelector((state) => state.userState);

  const authRoutes = () => (
    <>
      <Route
        path="work/:workId"
        element={
          <Suspense fallback={<></>}>
            <Work />
          </Suspense>
        }
      />
      <Route
        path="create-work/:templateId"
        element={
          <Suspense fallback={<></>}>
            <CreateWork />
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
    </>
  );

  const nonAuthRoutes = () => (
    <Route
      path="sign-in"
      element={
        <Suspense fallback={<></>}>
          <SignIn />
        </Suspense>
      }
    />
  );

  return (
    <div className="App">
      {!!user ? (
        location.pathname === '/admin-home' ? (
          <AdminHeader />
        ) : (
          <Header />
        )
      ) : (
        <></>
      )}
      <Routes>
        <Route
          path="*"
          element={
            !!user?.token ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />
        {!!user?.token ? authRoutes() : nonAuthRoutes()}
      </Routes>
    </div>
  );
};

export default App;
