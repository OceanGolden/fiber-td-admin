import Logo from '@/assets/logo.svg';
import { Input, Layout, Space } from 'tdesign-react';
import UserInfo from './components/user-info';

const LayoutHeader = () => (
  <Layout.Header className='w-full flex justify-between shadow'>
    <div className='flex items-center'>
      <div className='flex items-center pl-6 text-4xl'>
        <img src={Logo} alt='Fiber TDesign Admin Logo' />
      </div>
      <h1 className='flex items-center pl-3'>Fiber Arco Pro</h1>
    </div>
    <div className='flex pr-6 items-center'>
      <Space size='medium' align='center'>
        <Input type='search' className='rounded-2xl' placeholder={'搜索'} />
        <div className='language'>language</div>
        <div className='message-box'>message-box</div>
        <div className='changelight'>dark</div>
        <div className='settings'>settings</div>
        <UserInfo />
      </Space>
    </div>
  </Layout.Header>
);

export default LayoutHeader;
