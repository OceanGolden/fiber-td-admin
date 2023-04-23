import loginBanner1 from '@/assets/images/login-banner-1.png';

import LoginForm from './components/login-form';

const Login = () => (
  <div className='flex flex-row h-screen w-screen items-center justify-center'>
    <div className='flex justify-between items-center flex-row max-w-5xl shadow-2xl mx-0 rounded-2xl overflow-hidden'>
      <div className='flex max-w-2xl'>
        <img src={loginBanner1} alt='Login-Banner' />
      </div>
      <div className='w-full p-8'>
        <LoginForm />
      </div>
    </div>
  </div>
);

export default Login;
