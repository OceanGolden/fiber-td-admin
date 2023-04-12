import type { PageResponse } from '@/common/types';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as RoleService from './service';

import { DialogPlugin, MessagePlugin } from 'tdesign-react';

import type {
  RoleMenuParams,
  RoleMenuRecord,
  RoleMenuRequest,
  RoleParams,
  RoleRecord,
  RoleRequest,
} from './types';

export enum QueryKeys {
  query = 'role-query',
}

export const useRoles = (params: Partial<RoleParams>) =>
  useQuery<PageResponse<RoleRecord>>({
    queryKey: [QueryKeys.query, params],
    queryFn: () => RoleService.query(params),
    keepPreviousData: true,
  });

export const useRolesAll = (
  params: Partial<RoleParams>,
  options?: UseQueryOptions<RoleRecord[]>,
) =>
  useQuery<RoleRecord[]>({
    queryKey: [QueryKeys.query, 'all', params],
    queryFn: () => RoleService.queryAll(params),
    ...options,
  });

export const useGrantMenus = (
  params: RoleMenuParams,
  options?: UseQueryOptions<RoleMenuRecord[]>,
) =>
  useQuery<RoleMenuRecord[]>({
    queryKey: [QueryKeys.query, params],
    queryFn: () => RoleService.queryMenus(params),
    ...options,
  });

export const useRoleMutation = (title = '新增') => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: Partial<RoleRequest>) => {
      const submit = req.id ? RoleService.update : RoleService.create;
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

export const useRoleMenuMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: Partial<RoleMenuRequest>) => {
      const submit = RoleService.grantMenus;
      return submit(req);
    },
    onMutate: () => {
      MessagePlugin.loading(`正在给角色授权菜单数据...`);
    },
    onSuccess: (_data, variables) => {
      MessagePlugin.closeAll();
      MessagePlugin.success(`授权成功`);
      queryClient.invalidateQueries([
        QueryKeys.query,
        { role_id: variables.role_id },
      ]);
    },
    onError: () => {
      MessagePlugin.closeAll();
      MessagePlugin.error(`授权失败`);
    },
  });
};

export const useRoleDelete = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (req: Partial<RoleRequest>) => RoleService.remove(req),
    onMutate: (variables) => {
      MessagePlugin.loading(`正在删除${variables.name}数据...`);
    },
    onSuccess: (_, variables) => {
      MessagePlugin.closeAll();
      MessagePlugin.success(`${variables.name}删除成功`);
    },
    onError: (_, variables) => {
      MessagePlugin.closeAll();
      MessagePlugin.error(`${variables.name}删除失败`);
    },
  });

  const confirmRemove = (
    record: Partial<RoleRecord>,
    onSuccess: () => boolean,
  ) => {
    const confirmDialog = DialogPlugin.confirm({
      destroyOnClose: true,
      header: '确认删除当前所选角色?',
      body: `删除后，${record.name}将被清空，且无法恢复`,
      confirmBtn: { theme: 'danger' },
      onConfirm: () =>
        deleteMutation.mutate(record, {
          onSuccess: () => {
            confirmDialog.hide();
            if (onSuccess()) {
              queryClient.invalidateQueries([QueryKeys.query]);
            }
            confirmDialog.destroy();
          },
        }),
      onClose: () => {
        confirmDialog.hide();
      },
    });
  };

  return { deleteMutation, confirmRemove };
};
