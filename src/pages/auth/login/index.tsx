import loginBanner1 from '@/assets/images/login-banner-1.png';
import LoginForm from './components/login-form';

const Login = () => (
  <div className='flex justify-center items-center h-screen w-screen'>
    <div className='flex justify-between items-center max-w-6xl shadow-2xl rounded-2xl'>
      <div className='w-full'>
        <img className='rounded-l-2xl ' src={loginBanner1} alt='Login-Banner' />
      </div>
      <div className='w-full p-8'>
        <LoginForm />
      </div>
    </div>
  </div>
);

export default Login;
