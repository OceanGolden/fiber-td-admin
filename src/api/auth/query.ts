import { DialogPlugin, MessagePlugin } from 'tdesign-react';

import { useMutation } from '@tanstack/react-query';

import * as AuthService from './service';

import type { ILoginRequest } from './types';

export const useLoginMutation = (title = '登录') =>
  useMutation(
    (req: Partial<ILoginRequest>) => {
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
    mutationFn: AuthService.logout,
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

  const confirmLogout = (callback: () => void) => {
    const confirmDialog = DialogPlugin.confirm({
      destroyOnClose: true,
      theme: 'warning',
      header: '温馨提示',
      body: `确认退出当前用户?`,
      confirmBtn: {
        content: '去意已决',
        theme: 'warning',
        loading: logoutMutation.isLoading,
      },
      cancelBtn: '再想想',
      onConfirm: () =>
        logoutMutation.mutate(undefined, {
          onSuccess: (data) => {
            if (data) {
              callback();
            }
            confirmDialog.hide();
          },
        }),
      onClose: () => confirmDialog.hide(),
    });
  };

  return { logoutMutation, confirmLogout };
};
