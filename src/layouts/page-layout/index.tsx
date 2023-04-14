import { Layout } from 'tdesign-react';
import LayoutContent from './components/layout-content';
import LayoutFooter from './components/layout-footer';
import LayoutMenu from './components/layout-menu';
import LayoutHeader from './components/layout-navbar';

const PageLayout = () => (
  <Layout className='h-screen w-screen flex flex-col'>
    <LayoutHeader />
    <Layout>
      <Layout.Aside>
        <LayoutMenu />
      </Layout.Aside>
      <Layout>
        <LayoutContent />
        <LayoutFooter />
      </Layout>
    </Layout>
  </Layout>
);

export default PageLayout;
