import { Reducer, useReducer } from 'react';

const toggleReducer = (state: boolean, nextValue?: any) =>
  typeof nextValue === 'boolean' ? nextValue : !state;

const useToggle = (
  initialValue: boolean,
): [boolean, (nextValue?: any) => void] =>
  useReducer<Reducer<boolean, any>>(toggleReducer, initialValue);

export default useToggle;
