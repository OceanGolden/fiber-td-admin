import { Layout } from 'tdesign-react';
import LayoutContent from './components/layout-content';
import LayoutFooter from './components/layout-footer';
import LayoutHeader from './components/layout-header';
import LayoutMenu from './components/layout-menu';

const PageLayout = () => (
  <Layout className='h-screen flex flex-col'>
    <Layout>
      <LayoutHeader />
      <Layout direction='horizontal'>
        <LayoutMenu />
        <Layout>
          <LayoutContent />
          <LayoutFooter />
        </Layout>
      </Layout>
    </Layout>
  </Layout>
);

export default PageLayout;
