import { Input, Layout, Space } from 'tdesign-react';

import Logo from '@/assets/svg/logo.svg';

import UserInfo from './components/user-info';

const LayoutHeader = () => (
  <Layout.Header className='sticky inset-0 z-101 flex shrink-0 justify-between shadow'>
    <Space className='flex items-center pl-2'>
      <img src={Logo} alt='Fiber Dashboard Logo' />
      <p className='font-bold'>Fiber Dashboard</p>
    </Space>
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
