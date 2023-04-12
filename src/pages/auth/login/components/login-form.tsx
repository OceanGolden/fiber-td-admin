import { LockOnIcon, UserIcon } from 'tdesign-icons-react';
import { Button, Checkbox, Form, Input, type FormInstanceFunctions, type SubmitContext } from 'tdesign-react';

import { useLoginMutation } from '@/api/auth/query';
import { accessAtomWithLocalStorage, refreshAtomWithLocalStorage } from '@/atom/token_atom';
import { useSetAtom } from 'jotai';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const formRef = useRef<FormInstanceFunctions>();
  const loginMutation = useLoginMutation();
  const navigate = useNavigate();
  const setAccessToken = useSetAtom(accessAtomWithLocalStorage());
  const setRefreshToken = useSetAtom(refreshAtomWithLocalStorage());

  const onSubmit = (e: SubmitContext) => {
    if (e.validateResult === true) {
      const formValue = formRef.current?.getFieldsValue(true) || {};
      loginMutation.mutate(formValue, {
        onSuccess: (data) => {
          setAccessToken(data.access);
          setRefreshToken(data.refresh);
          navigate('/home');
        },
      });
    }
  };

  return (
    <Form ref={formRef} onSubmit={onSubmit} initialData={{ username: 'admin', password: '123456', remember: false }}>
      <p className='text-shadow-sm text-5xl font-bold mb-16'>欢迎回来</p>
      <Form.FormItem name='username' rules={[{ required: true, message: '账号必填!' }]}>
        <Input autofocus prefixIcon={<UserIcon />} size='large' placeholder='请输入用户名称' />
      </Form.FormItem>
      <Form.FormItem name='password' rules={[{ required: true, message: '密码必填!' }]}>
        <Input type='password' prefixIcon={<LockOnIcon />} size='large' placeholder='请输入登录密码 ' />
      </Form.FormItem>
      <Form.FormItem name='remember'>
        <Checkbox>自动登录</Checkbox>
      </Form.FormItem>
      <Form.FormItem>
        <Button type='submit' block size='large' loading={loginMutation.isLoading}>
          登录
        </Button>
      </Form.FormItem>
    </Form>
  );
};
export default LoginForm;
