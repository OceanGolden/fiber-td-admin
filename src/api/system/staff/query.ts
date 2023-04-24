import { DialogPlugin, MessagePlugin } from 'tdesign-react';

import { IPageResponse } from '@/common/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import * as StaffService from './service';

import type {
  IStaffParams,
  IStaffRecord,
  IStaffRequest,
  IStaffRoleRequest,
} from './types';

export enum QueryKeys {
  query = 'staff-query',
}

export const useStaffs = (params: Partial<IStaffParams>) =>
  useQuery<IPageResponse<IStaffRecord>>({
    queryKey: [QueryKeys.query, params],
    queryFn: () => StaffService.query(params),
    keepPreviousData: true,
  });

export const useStaffMutation = (title = '新增') => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: Partial<IStaffRequest>) => {
      const submit = req.id ? StaffService.update : StaffService.create;
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

export const useStaffRoleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: IStaffRoleRequest) => {
      const submit = StaffService.assignRole;
      return submit(req);
    },
    onMutate: () => {
      MessagePlugin.loading(`正在分配角色数据...`);
    },
    onSuccess: () => {
      MessagePlugin.closeAll();
      MessagePlugin.success(`角色分配成功`);
      queryClient.invalidateQueries([QueryKeys.query]);
    },
    onError: () => {
      MessagePlugin.closeAll();
      MessagePlugin.error(`角色分配失败`);
    },
  });
};

export const useStaffDelete = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (req: Partial<IStaffRequest>) => StaffService.remove(req),
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
    record: Partial<IStaffRecord>,
    onSuccess: () => boolean,
  ) => {
    const confirmDialog = DialogPlugin.confirm({
      destroyOnClose: true,
      header: '确认删除当前所选用户?',
      body: `删除后，${record.name}将被清空，且无法恢复`,
      confirmBtn: { theme: 'danger' },
      onConfirm: () =>
        deleteMutation.mutateAsync(record, {
          onSuccess: () => {
            confirmDialog.hide();
            confirmDialog.destroy();
            if (onSuccess()) {
              queryClient.invalidateQueries([QueryKeys.query]);
            }
          },
        }),
      onClose: () => {
        confirmDialog.hide();
      },
    });
  };

  return { deleteMutation, confirmRemove };
};
