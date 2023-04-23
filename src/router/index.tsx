import type { RouteObject } from 'react-router-dom';

import { MenuRecord } from '@/api/system/menu/types';
import PageLayout from '@/layouts/page-layout';
import Login from '@/pages/auth/login';
import Exception404 from '@/pages/system/exception/404';
import Home from '@/pages/system/home';

import { LoadablePage } from '../components/lazy-component/index';

export const generateRoutesFromMenus = (menus: MenuRecord[]): RouteObject[] => {
  const routes: RouteObject[] = [];
  menus.map((item) =>
    routes.push({
      path: item.path,
      id: item.id,
      element: item.component ? (
        <LoadablePage path={item.component} />
      ) : (
        <PageLayout />
      ),
      children: item.children
        ? [...generateRoutesFromMenus(item.children)]
        : undefined,
    }),
  );
  return routes;
};

export const defaultRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home/*',
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <Home />,
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
    element: <Exception404 />,
  },
];
