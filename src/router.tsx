import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import Package from './content/applications/Packages/Package';
import UpdatePackage from './content/applications/Packages/UpdatePackage';
import { UnauthorizedRoute } from './UnauthorizedRoute';
import { ProtectedRoute } from './ProtectedRoute';

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

const AddNewOffer = Loader(
  lazy(() => import('src/content/applications/Offers/OfferList/AddNewOffer'))
);

const UpdateOffer = Loader(
  lazy(() => import('src/content/applications/Offers/OfferList/UpdateOffer'))
);

const Registration = Loader(
  lazy(
    () => import('src/content/applications/Users/registration/RegistrationForm')
  )
);
const OrderList = Loader(
  lazy(() => import('src/content/applications/Orders/OrderList'))
);

const UserOrder = Loader(
  lazy(() => import('src/content/applications/Orders/orderDetails'))
);

const Error500 = Loader(
  lazy(() => import('src/content/applications/Status/Status500'))
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
        element: (
          <UnauthorizedRoute>
            <Events />
          </UnauthorizedRoute>
        )
      },
      {
        path: ':eventId/offers',
        children: [
          {
            path: '',
            element: <Offers />
          },
          {
            path: 'updateOffer/:offerId',
            element: (
              <ProtectedRoute>
                <UpdateOffer />
              </ProtectedRoute>
            )
          },
          {
            path: 'addOffer',
            element: (
              <ProtectedRoute>
                <AddNewOffer />{' '}
              </ProtectedRoute>
            )
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
        path: ':eventId/:offerId/packageDetails/:packageId',
        element: <Package />
      },
      {
        path: ':eventId/:offerId/package/',
        children: [
          {
            path: '',
            element: (
              <ProtectedRoute>
                <AddNewPackage />
              </ProtectedRoute>
            )
          },
          {
            path: ':packageId',
            element: (
              <ProtectedRoute>
                <UpdatePackage />
              </ProtectedRoute>
            )
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
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        )
      },
      {
        path: 'myEvents',
        element: (
          <ProtectedRoute>
            <OrderList />
          </ProtectedRoute>
        )
      },
      {
        path: 'myEvents/:orderId',
        element: (
          <ProtectedRoute>
            <UserOrder />
          </ProtectedRoute>
        )
      },
      {
        path: 'settings',
        element: (
          <ProtectedRoute>
            <UserSettings />
          </ProtectedRoute>
        )
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
  },
  {
    path: '500',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <Error500 />
      }
    ]
  },
  // Przekierowanie na trasę błędu 500 w przypadku wystąpienia błędu 500
  {
    path: '*',
    element: <Navigate to="500" replace />
  }
];

export default routes;
