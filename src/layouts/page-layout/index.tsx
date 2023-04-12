import { Layout } from 'tdesign-react';
import LayoutContent from './components/layout-content';
import LayoutFooter from './components/layout-footer';
import LayoutHeader from './components/layout-navbar';
import LayoutSidebar from './components/layout-sidebar';

const PageLayout = () => (
  <Layout className='h-screen w-screen flex flex-col'>
    <LayoutHeader />
    <Layout className='flex flex-row overflow-hidden'>
      <LayoutSidebar />
      <Layout className='flex flex-col'>
        <LayoutContent />
        <LayoutFooter />
      </Layout>
    </Layout>
  </Layout>
);

export default PageLayout;
