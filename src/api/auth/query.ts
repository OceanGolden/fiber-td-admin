import * as AuthService from './service';

import { DialogPlugin, MessagePlugin } from 'tdesign-react';

import { useMutation } from '@tanstack/react-query';
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

export const useLogoutMutation = () => {
  const logoutMutation = useMutation({
    mutationFn: () => AuthService.logout(),
    onMutate: () => {
      MessagePlugin.loading(`正在登出中...`);
    },
    onSuccess: () => {
      MessagePlugin.closeAll();
      MessagePlugin.success(`退出成功！`);
    },
    onError: () => {
      MessagePlugin.closeAll();
      MessagePlugin.error(`退出失败！`);
    },
  });

  const confirmLogout = (success: () => void) => {
    const confirmDialog = DialogPlugin.confirm({
      destroyOnClose: true,
      theme: 'warning',
      header: '温馨提示',
      body: `确认退出当前用户?`,
      confirmBtn: { content: '去意已决', theme: 'warning' },
      cancelBtn: '再想想',
      onConfirm: () =>
        logoutMutation.mutate(undefined, {
          onSuccess: (data) => {
            confirmDialog.hide();
            confirmDialog.destroy();
            if (data) {
              success();
            }
          },
        }),
      onClose: () => {
        confirmDialog.hide();
      },
    });
  };

  return { logoutMutation, confirmLogout };
};
