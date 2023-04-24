import type { UseQueryOptions } from '@tanstack/react-query';
import { DialogPlugin, MessagePlugin } from 'tdesign-react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import * as PositionService from './service';

import type {
  IPositionParams,
  IPositionRecord,
  IPositionRequest,
} from './types';

export enum QueryKeys {
  query = 'position-query',
}

export const usePositions = (params: Partial<IPositionParams>) =>
  useQuery({
    queryKey: [QueryKeys.query, params],
    queryFn: () => PositionService.query(params),
    keepPreviousData: true,
  });

export const usePositionsAll = (
  params: Partial<IPositionParams>,
  options?: UseQueryOptions<IPositionRecord[]>,
) =>
  useQuery({
    queryKey: [QueryKeys.query, 'all', params],
    queryFn: () => PositionService.queryAll(params),
    ...options,
  });

export const usePositionMutation = (title = '新增') => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: Partial<IPositionRequest>) => {
      const submit = req.id ? PositionService.update : PositionService.create;
      return submit(req);
    },
    onMutate: () => {
      MessagePlugin.loading(`正在${title}数据...`);
    },
    onSuccess: () => {
      MessagePlugin.closeAll();
      MessagePlugin.success(`${title}成功！`);
      queryClient.invalidateQueries([QueryKeys.query]);
    },
    onError: () => {
      MessagePlugin.closeAll();
      MessagePlugin.error(`${title}失败！`);
    },
  });
};

export const usePositionDelete = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (req: Partial<IPositionRequest>) => PositionService.remove(req),
    onMutate: (variables) => {
      MessagePlugin.loading(`正在删除${variables.name}数据...`);
    },
    onSuccess: (_, variables) => {
      MessagePlugin.closeAll();
      MessagePlugin.success(`${variables.name}删除成功！`);
    },
    onError: (_, variables) => {
      MessagePlugin.closeAll();
      MessagePlugin.error(`${variables.name}删除失败！`);
    },
  });

  const confirmRemove = (
    record: Partial<IPositionRecord>,
    onSuccess: () => boolean,
  ) => {
    const confirmDialog = DialogPlugin.confirm({
      destroyOnClose: true,
      header: '确认删除当前所选职位?',
      body: `删除后，${record.name}将被清空，且无法恢复！`,
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
