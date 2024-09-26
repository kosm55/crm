import { createBrowserRouter, Navigate } from 'react-router-dom';

import { OrderDetails } from './components/OrdersContainer/OrderDetails';
import { AuthLayout, MainLayout } from './layouts';
import { LoginPage, OrdersPage, RegisterPage } from './pages';

const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
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
