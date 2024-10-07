import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AuthLayout, MainLayout } from './layouts';
import {
  AdminPanelPage,
  ErrorPage,
  LoginPage,
  OrdersPage,
  RecoveryPasswordPage,
  RegisterPage,
} from './pages';

const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to={'login'} />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'orders',
            element: <OrdersPage />,
          },
          {
            path: 'orders/:orderId',
            element: <OrdersPage />,
          },
          {
            path: 'adminPanel',
            element: <AdminPanelPage />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: '/:action/:token',
        element: <RecoveryPasswordPage />,
      },
    ],
  },
]);

export { router };
