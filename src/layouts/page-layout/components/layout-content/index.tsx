import { Outlet } from 'react-router-dom';
import { Layout } from 'tdesign-react';

const LayoutContent = () => (
  <Layout.Content className='flex flex-col transition duration-200'>
    {/* <Breadcrumb /> */}
    <div className='px-6 py-4 h-full'>
      <Outlet />
    </div>
  </Layout.Content>
);

export default LayoutContent;
