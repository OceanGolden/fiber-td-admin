import { atom } from 'jotai';
import { RouteObject } from 'react-router-dom';

import { ConstantsRoutes } from '@/router/constants';

export const routesAtom = atom<RouteObject[]>(ConstantsRoutes);
