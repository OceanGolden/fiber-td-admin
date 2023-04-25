import { Button } from 'tdesign-react';

import SvgError from '@/assets/svg/assets-result-maintenance.svg';

const ExceptionError = () => (
  <div className='flex flex-col w-full justify-center items-center p-8'>
    <img src={SvgError} />
    <div className='text-lg mt-4'>加载出错</div>
    <div className='m-8'>抱歉，文件加载出错！</div>
    <Button theme='primary'>返回首页</Button>
  </div>
);

export default ExceptionError;
