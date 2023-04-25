import { Navigate, RouteObject } from 'react-router-dom';

import PageLayout from '@/layouts/page-layout';
import Login from '@/pages/auth/login';
import Exception404 from '@/pages/system/exception/404';
import Home from '@/pages/system/home';

import RouterGuard from './guard';

export const ConstantsRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/home'} replace={true} />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home/*',
    element: (
      <RouterGuard>
        <PageLayout />
      </RouterGuard>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '*',
    element: <Exception404 />,
  },
];
