import * as AuthService from './service';

import { useMutation } from '@tanstack/react-query';
import { MessagePlugin } from 'tdesign-react';
import type { LoginRequest } from './types';

export const useLoginMutation = (title = '登录') =>
  useMutation(
    (req: Partial<LoginRequest>) => {
      const submit = AuthService.login;
      return submit(req);
    },
    {
      onMutate: () => {
        MessagePlugin.loading(`正在${title}...`);
      },
      onSuccess: () => {
        MessagePlugin.closeAll();
        MessagePlugin.success(`${title}成功`);
      },
      onError: () => {
        MessagePlugin.closeAll();
        MessagePlugin.error(`${title}失败`);
      },
    },
  );
