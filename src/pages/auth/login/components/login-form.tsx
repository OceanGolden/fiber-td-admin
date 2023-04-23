import { useSetAtom } from 'jotai';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOnIcon, UserIcon } from 'tdesign-icons-react';
import {
  Alert,
  Button,
  Checkbox,
  Form,
  FormInstanceFunctions,
  Input,
  SubmitContext,
} from 'tdesign-react';

import { useLoginMutation } from '@/api/auth/query';
import {
  accessAtomWithLocalStorage,
  refreshAtomWithLocalStorage,
} from '@/atom/token_atom';

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const formRef = useRef<FormInstanceFunctions>();
  const loginMutation = useLoginMutation();
  const navigate = useNavigate();
  const setAccessToken = useSetAtom(accessAtomWithLocalStorage);
  const setRefreshToken = useSetAtom(refreshAtomWithLocalStorage);

  const onSubmit = (e: SubmitContext) => {
    if (e.validateResult === true) {
      const formValue = formRef.current?.getFieldsValue(true) || {};
      loginMutation.mutate(formValue, {
        onSuccess: (data) => {
          setAccessToken(data.access);
          setRefreshToken(data.refresh);
          navigate('/home');
        },
        onError: (error) => setErrorMessage(error as string),
      });
    }
  };

  return (
    <div>
      <p className='text-center drop-shadow-2xl text-5xl font-bold mb-6'>
        欢迎回来
      </p>
      <Form
        ref={formRef}
        onSubmit={onSubmit}
        initialData={{ username: 'admin', password: '123456', remember: false }}
      >
        <Form.FormItem>
          {errorMessage && (
            <Alert
              className='w-full'
              theme='error'
              message={errorMessage}
              close
              onClose={() => setErrorMessage('')}
            />
          )}
        </Form.FormItem>
        <Form.FormItem
          name='username'
          rules={[{ required: true, message: '账号必填!' }]}
        >
          <Input
            autofocus
            prefixIcon={<UserIcon />}
            size='large'
            placeholder='请输入用户名称'
          />
        </Form.FormItem>
        <Form.FormItem
          name='password'
          rules={[{ required: true, message: '密码必填!' }]}
        >
          <Input
            type='password'
            prefixIcon={<LockOnIcon />}
            size='large'
            placeholder='请输入登录密码 '
          />
        </Form.FormItem>
        <Form.FormItem name='remember'>
          <Checkbox>自动登录</Checkbox>
        </Form.FormItem>
        <Form.FormItem>
          <Button
            type='submit'
            block
            size='large'
            loading={loginMutation.isLoading}
          >
            登录
          </Button>
        </Form.FormItem>
      </Form>
    </div>
  );
};
export default LoginForm;
