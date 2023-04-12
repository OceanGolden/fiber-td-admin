import { RouteObject, createBrowserRouter } from 'react-router-dom';

import PageLayout from '@/layouts/page-layout';
import Login from '@/pages/auth/login';

export const defaultRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: <PageLayout />,
  },
  // {
  //   id: 'root',
  //   path: '/',
  //   element: <Navigate to='/login' />,
  //   // children: [
  //   //   {
  //   //     path: '*',
  //   //     element: <div>403</div>,
  //   //   },
  //   // ],
  // },
  {
    path: '*',
    element: <div>404</div>,
  },
];

const router = createBrowserRouter(defaultRoutes);

export default router;
