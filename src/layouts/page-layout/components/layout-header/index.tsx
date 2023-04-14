import { Input, Layout, Space } from 'tdesign-react';

import Logo from '@/assets/logo.svg';
import UserInfo from './components/user-info';

const LayoutHeader = () => (
  <Layout.Header className='sticky inset-0 z-101 flex shrink-0 justify-between shadow'>
    <div className='flex items-center'>
      <div className='flex items-center pl-6'>
        <img src={Logo} alt='Fiber TDesign Admin Logo' />
      </div>
      <h1 className='flex items-center pl-3 text-lg'>Fiber Arco Pro</h1>
    </div>
    <div className='flex items-center pr-6'>
      <Space size='medium' align='center'>
        <Input type='search' className='rounded-xl' placeholder={'搜索'} />
        <div className='language'>language</div>
        <div className='message-box'>message-box</div>
        <div className='changelight'>dark</div>
        <UserInfo />
        <div className='settings'>settings</div>
      </Space>
    </div>
  </Layout.Header>
);

export default LayoutHeader;
