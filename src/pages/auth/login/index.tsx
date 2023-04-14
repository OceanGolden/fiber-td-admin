import loginBanner1 from '@/assets/images/login-banner-1.png';
import LoginForm from './components/login-form';

const Login = () => (
  <div className='h-screen w-screen flex items-center justify-center'>
    <div className='w-5xl flex flex-row rounded-2xl shadow-2xl'>
      <div className='flex'>
        <img
          className='w-full flex rounded-l-2xl'
          src={loginBanner1}
          alt='Login-Banner'
        />
      </div>
      <div className='w-full p-8'>
        <LoginForm />
      </div>
    </div>
  </div>
);

export default Login;
