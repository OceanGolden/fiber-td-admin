import { Button } from 'tdesign-react';

import Svg404 from '@/assets/svg/assets-result-404.svg';

const Exception404 = () => (
  <div className='flex flex-col justify-center items-center min-h-2/3 p-8'>
    <img src={Svg404} />
    <div className='text-lg mt-4'>404 Forbidden</div>
    <div className='m-8'>抱歉，您访问的页面不存在！</div>
    <Button theme='primary'>返回首页</Button>
  </div>
);

export default Exception404;
