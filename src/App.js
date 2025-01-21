import moment from 'moment';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Containers/Home/Home';
import { lazy, Suspense, useEffect } from 'react';
import AdminHeader from './Components/AdminHeader/AdminHeader';
import Header from './Components/Header/Header';
import { useAppDispatch, useAppSelector } from './app/hooks';
import UpdatePassword from './Containers/UpdatePassword/UpdatePassword';
import { resetAlerts } from './features/data/dataSlice';
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
const ServiceEngineer = lazy(
  () => import('./Containers/ServiceEngineer/ServiceEngineer')
);
const SectionChiefs = lazy(
  () => import('./Containers/SectionChiefs/SectionChiefs')
);
const SectionChief = lazy(
  () => import('./Containers/SectionChief/SectionChief')
);
const CreateSectionChief = lazy(
  () => import('./Containers/CreateSectionChief/CreateSectionChief')
);
const CreateServiceEngineer = lazy(
  () => import('./Containers/CreateServiceEngineer/CreateServiceEngineer')
);
const EditSectionChief = lazy(
  () => import('./Containers/EditSectionChief/EditSectionChief')
);
const Locations = lazy(() => import('./Containers/Locations/Locations'));

moment.locale('ru');

const App = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userState);

  useEffect(() => {
    if (user) dispatch(resetAlerts());
  }, [user]);

  const authRoutes = () => (
    <>
      <Route
        path="home"
        element={
          <Suspense fallback={<></>}>
            <Home />
          </Suspense>
        }
      />
      {['admin', 'chief'].includes(user?.role) && (
        <Route
          path="admin/squares"
          element={
            <Suspense fallback={<></>}>
              <Squares />
            </Suspense>
          }
        />
      )}
      {user.role === 'admin' && (
        <>
          <Route
            path="admin/home"
            element={
              <Suspense fallback={<></>}>
                <Users />
              </Suspense>
            }
          />
          <Route
            path="admin/locations"
            element={
              <Suspense fallback={<></>}>
                <Locations />
              </Suspense>
            }
          />
          <Route
            path="admin/create-square"
            element={
              <Suspense fallback={<></>}>
                <CreateSquare />
              </Suspense>
            }
          />
          <Route
            path="admin/edit-square/:squareId"
            element={
              <Suspense fallback={<></>}>
                <CreateSquare isEdit />
              </Suspense>
            }
          />
          <Route
            path="admin/user/:userId"
            element={
              <Suspense fallback={<></>}>
                <User />
              </Suspense>
            }
          />
          <Route
            path="admin/create-user"
            element={
              <Suspense fallback={<></>}>
                <CreateUser />
              </Suspense>
            }
          />
          <Route
            path="admin/edit-user/:userId"
            element={
              <Suspense fallback={<></>}>
                <CreateUser isEdit />
              </Suspense>
            }
          />
          <Route
            path="admin/section-chiefs"
            element={
              <Suspense fallback={<></>}>
                <SectionChiefs />
              </Suspense>
            }
          />
          <Route
            path="admin/section-chief/:userId"
            element={
              <Suspense fallback={<></>}>
                <SectionChief />
              </Suspense>
            }
          />
          <Route
            path="admin/service-engineers"
            element={
              <Suspense fallback={<></>}>
                <ServiceEngineers />
              </Suspense>
            }
          />
          <Route
            path="admin/service-engineer/:userId"
            element={
              <Suspense fallback={<></>}>
                <ServiceEngineer />
              </Suspense>
            }
          />
          <Route
            path="admin/create-section-chief"
            element={
              <Suspense fallback={<></>}>
                <CreateSectionChief />
              </Suspense>
            }
          />
          <Route
            path="admin/edit-section-chief/:userId"
            element={
              <Suspense fallback={<></>}>
                <EditSectionChief />
              </Suspense>
            }
          />
          <Route
            path="admin/create-service-engineer"
            element={
              <Suspense fallback={<></>}>
                <CreateServiceEngineer />
              </Suspense>
            }
          />
          <Route
            path="admin/user/update-password/:userId"
            element={
              <Suspense fallback={<></>}>
                <UpdatePassword />
              </Suspense>
            }
          />
        </>
      )}
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
        path="edit-work/:workId/:templateId"
        element={
          <Suspense fallback={<></>}>
            <CreateWork isEdit />
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
        location.pathname.includes('/admin') ? (
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
