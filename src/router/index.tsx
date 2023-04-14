import { RouteObject, createBrowserRouter } from 'react-router-dom';

import PageLayout from '@/layouts/page-layout';
import Login from '@/pages/auth/login';
import Organization from '@/pages/system/organization';
import Staff from '@/pages/system/staff';

export const defaultRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: <PageLayout />,
  },
  {
    path: '/system',
    element: <PageLayout />,
    children: [
      {
        path: '/system/staffs',
        element: <Staff />,
      },
      {
        path: '/system/organizations',
        element: <Organization />,
      },
    ],
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
