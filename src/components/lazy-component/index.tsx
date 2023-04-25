import { Loading } from 'tdesign-react';

import loadable from '@loadable/component';

// export const LazyComponent = (componentPath: string) => {
//   const asyncComponent = loadable(
//     () =>
//       import(
//         /* webpackChunkName: "[request]" */ `../../pages/${componentPath}`
//       ),
//   );
//   return createElement(asyncComponent);
// };

export const LoadablePage = loadable(
  (props: { path: string }) =>
    import(
      /* webpackChunkName: "[request]" */
      `../../pages/${props.path}`
    ),
  {
    fallback: <Loading />,
    cacheKey: (props: { path: string }) => props.path,
  },
);
