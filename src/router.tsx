import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import Package from './content/applications/Packages/Package';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const Events = Loader(lazy(() => import('src/content/applications/Events')));

const Offers = Loader(
  lazy(() => import('src/content/applications/Offers/OfferList'))
);
const OfferDetails = Loader(
  lazy(() => import('src/content/applications/Offers/OfferDetails'))
);

const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

const Login = Loader(
  lazy(() => import('src/content/applications/Users/Login'))
);

const AddNewPackage = Loader(
  lazy(() => import('src/content/applications/Packages/AddNewPackage'))
);

const Registration = Loader(
  lazy(
    () => import('src/content/applications/Users/registration/RegistrationForm')
  )
);

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <SidebarLayout />,
        children: [
          {
            path: '',
            element: <Navigate to="events" replace />
          }
        ]
      }
    ]
  },
  {
    path: 'events',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Events />
      }
    ]
  },
  {
    path: 'events',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Events />
      },
      {
        path: ':eventId/offers',
        children: [
          {
            path: '',
            element: <Offers />
          },
          {
            path: ':offerId',
            element: <OfferDetails />
          }
        ]
      }
    ]
  },
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: 'packageDetails/:packageId',
        element: <Package />
      },
      {
        path: ':eventId/:offerId/package',
        children: [
          {
            path: '',
            element: <AddNewPackage />
          },
          {
            path: ':packageId',
            element: <Offers />
          }
        ]
      }
    ]
  },
  {
    path: 'user',
    element: <SidebarLayout />,
    children: [
      {
        path: 'details',
        element: <UserProfile />
      },
      {
        path: 'settings',
        element: <UserSettings />
      },
      {
        path: 'registration',
        element: <Registration />
      },
      {
        path: 'login',
        element: <Login />
      }
    ]
  }
];

export default routes;
