import { createElement } from 'react';
import { Loading } from 'tdesign-react';

import loadable from '@loadable/component';

export const LazyComponent = (componentPath: string) => {
  const [catalog, component] = componentPath.split('/');
  const asyncComponent = loadable(
    () =>
      import(
        /* webpackChunkName: "[request]" */ `../../pages/${catalog}/${component}/index.tsx`
      ),
  );
  return createElement(asyncComponent);
};

export const LoadablePage = loadable(
  (props: { path: string }) =>
    import(
      /* webpackChunkName: "[request]" */
      `../../pages/${props.path.split('/')[0]}/${
        props.path.split('/')[1]
      }/index.tsx`
    ),
  {
    fallback: <Loading />,
    cacheKey: (props: { path: string }) => props.path,
  },
);
