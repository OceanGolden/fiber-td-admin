import { DialogPlugin, MessagePlugin } from 'tdesign-react';
import * as MenuService from './service';

import { SystemStatus, SystemTreeRoot } from '@/common/constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { MenuParams, MenuRecord, MenuRequest } from './types';

import type { UseQueryOptions } from '@tanstack/react-query';

export enum QueryKeys {
  query = 'menu-query',
}

export const useMenus = (
  params: Partial<MenuParams>,
  options?: UseQueryOptions<MenuRecord[]>,
) => {
  const queryInfo = useQuery<MenuRecord[]>({
    queryKey: [QueryKeys.query, params],
    queryFn: () => MenuService.queryTreeAll(params),
    ...options,
  });
  return {
    ...queryInfo,
    treeSelectData: [
      {
        id: SystemTreeRoot.Root as string,
        name: '根目录',
        status: SystemStatus.Enable as string,
      } as MenuRecord,
    ].concat(queryInfo.data || []),
  };
};

export const useMenusTree = (
  token: string,
  options?: UseQueryOptions<MenuRecord[]>,
) => {
  const queryInfo = useQuery<MenuRecord[]>({
    queryKey: [QueryKeys.query, { token }],
    queryFn: () => MenuService.queryTree(),
    ...options,
  });
  return {
    ...queryInfo,
  };
};

export const useMenuMutation = (title = '新增') => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: Partial<MenuRequest>) => {
      const submit = req.id ? MenuService.update : MenuService.create;
      return submit(req);
    },
    onMutate: () => {
      MessagePlugin.loading(`正在${title}数据...`);
    },
    onSuccess: () => {
      MessagePlugin.closeAll();
      MessagePlugin.success(`${title}成功`);
      queryClient.invalidateQueries([QueryKeys.query]);
    },
    onError: () => {
      MessagePlugin.closeAll();
      MessagePlugin.error(`${title}失败`);
    },
  });
};

export const useMenuDelete = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    (req: Partial<MenuRequest>) => MenuService.remove(req),
    {
      onMutate: (variables) => {
        MessagePlugin.loading(`正在删除${variables.name}数据...`);
      },
      onSuccess: (_, variables) => {
        MessagePlugin.closeAll();
        MessagePlugin.success(`${variables.name}删除成功`);
        queryClient.invalidateQueries([QueryKeys.query]);
      },
      onError: (_, variables) => {
        MessagePlugin.closeAll();
        MessagePlugin.error(`${variables.name}删除失败`);
      },
    },
  );

  const confirmRemove = (record: Partial<MenuRecord>) => {
    const confirmDialog = DialogPlugin.confirm({
      destroyOnClose: true,
      header: '确认删除当前所选菜单?',
      body: `删除后，${record.name}将被清空，且无法恢复`,
      confirmBtn: { theme: 'danger' },
      onConfirm: () =>
        deleteMutation.mutate(record, {
          onSuccess: () => {
            confirmDialog.hide();
            confirmDialog.destroy();
            queryClient.invalidateQueries([QueryKeys.query]);
          },
        }),
      onClose: () => {
        confirmDialog.hide();
      },
    });
  };

  return { deleteMutation, confirmRemove };
};
