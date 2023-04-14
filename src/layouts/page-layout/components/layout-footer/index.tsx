import { Layout } from 'tdesign-react';

const LayoutFooter = () => (
  <Layout.Footer
    className={'flex items-center justify-center h-12 text-center'}
  >
    Copyright @ 2021-{new Date().getFullYear()} Fiber TDesign React. All Rights
    Reserved
  </Layout.Footer>
);

export default LayoutFooter;
