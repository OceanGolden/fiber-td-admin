import { Token } from '@/common/constants';
import { atomWithStorage } from 'jotai/utils';

export const accessAtomWithLocalStorage = atomWithStorage(Token.Access, '');
export const refreshAtomWithLocalStorage = atomWithStorage(Token.Refresh, '');
