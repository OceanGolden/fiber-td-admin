import { DialogPlugin, MessagePlugin } from 'tdesign-react';

import { SystemStatus, SystemTreeRoot } from '@/common/constants';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';

import * as OrganizationService from './service';

import type {
  IOrganizationParams,
  IOrganizationRecord,
  IOrganizationRequest,
} from './types';

export enum QueryKeys {
  query = 'organization-query',
}

export const useOrganizations = (
  params: Partial<IOrganizationParams>,
  options?: UseQueryOptions<IOrganizationRecord[]>,
) => {
  const queryInfo = useQuery<IOrganizationRecord[]>({
    queryKey: [QueryKeys.query, params],
    queryFn: () => OrganizationService.queryTree(params),
    ...options,
  });
  return {
    ...queryInfo,
    treeData: [
      {
        id: SystemTreeRoot.Root as string,
        name: '顶级组织',
        status: SystemStatus.Enable as string,
      },
    ].concat(queryInfo.data || []),
  };
};

export const useOrganizationMutation = (title = '新增') => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: Partial<IOrganizationRequest>) => {
      const submit = req.id
        ? OrganizationService.update
        : OrganizationService.create;
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

export const useOrganizationDelete = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (req: Partial<IOrganizationRequest>) =>
      OrganizationService.remove(req),
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
  });

  const confirmRemove = (record: Partial<IOrganizationRecord>) => {
    const confirmDialog = DialogPlugin.confirm({
      destroyOnClose: true,
      header: '确认删除当前所选组织?',
      body: `删除后，${record.name}将被清空，且无法恢复`,
      confirmBtn: { theme: 'danger' },
      onConfirm: () =>
        deleteMutation.mutate(record, {
          onSuccess: () => {
            confirmDialog.hide();
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
