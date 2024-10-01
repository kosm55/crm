import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AuthLayout, MainLayout } from './layouts';
import { ErrorPage, LoginPage, OrdersPage, RegisterPage } from './pages';

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
            path: 'register',
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
]);

export { router };
