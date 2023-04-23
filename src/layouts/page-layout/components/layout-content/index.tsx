import { Outlet } from 'react-router-dom';
import { Layout } from 'tdesign-react';

const LayoutContent = () => (
  <Layout.Content className='flex flex-col'>
    {/* <Breadcrumb /> */}
    <div className='flex px-6 py-4'>
      <Outlet />
    </div>
  </Layout.Content>
);

export default LayoutContent;
