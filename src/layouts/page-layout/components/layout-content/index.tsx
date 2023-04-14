import { Layout } from 'tdesign-react';
import { Outlet } from 'react-router-dom';

const LayoutContent = () => (
  <Layout.Content className='flex flex-col'>
    {/* <Breadcrumb /> */}
    <div className='x-6 flex py-4'>
      <Outlet />
    </div>
  </Layout.Content>
);

export default LayoutContent;
