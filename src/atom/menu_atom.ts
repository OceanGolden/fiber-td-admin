import * as MenuService from '@/api/system/menu/service';

import { atom } from 'jotai';

export const menuAsyncAtom = atom(async () => MenuService.queryTree());
