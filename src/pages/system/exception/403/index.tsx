import { Button } from 'tdesign-react';

import light403Icon from '@/assets/svg/assets-result-500.svg';

const Exception403 = () => (
  <div className='flex flex-col justify-center items-center h-full '>
    <img src={light403Icon} />
    <div className='text-lg mt-4'>403 Forbidden</div>
    <div className='m-8'>抱歉，您无权限访问此页面！</div>
    <Button theme='primary'>返回首页</Button>
  </div>
);

export default Exception403;
