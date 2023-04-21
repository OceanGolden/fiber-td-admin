import { Button } from 'tdesign-react';

import light500Icon from '@/assets/svg/assets-result-500.svg';

const Exception500 = () => (
  <div className='flex flex-col justify-center items-center h-full '>
    <img src={light500Icon} />
    <div className='text-lg mt-4'>500 Internal Server Error</div>
    <div className='m-8'>抱歉，服务器出错啦！</div>
    <Button theme='primary'>返回首页</Button>
  </div>
);

export default Exception500;
