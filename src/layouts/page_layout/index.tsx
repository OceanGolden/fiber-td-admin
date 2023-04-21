import { Layout } from 'tdesign-react';

import LayoutHeader from './components/layout-header';
import LayoutContent from './components/layout_content';
import LayoutFooter from './components/layout_footer';
import LayoutMenu from './components/layout_menu';

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
