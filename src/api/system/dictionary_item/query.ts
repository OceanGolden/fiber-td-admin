import type { PageResponse } from '@/common/types';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DialogPlugin, MessagePlugin } from 'tdesign-react';
import * as DictionaryItemService from './service';
import type {
  DictionaryItemParams,
  DictionaryItemRecord,
  DictionaryItemRequest,
} from './types';

export enum QueryKeys {
  query = 'dictionary-items-query',
}

export const useDictionaryItems = (
  params: Partial<DictionaryItemParams>,
  options?: UseQueryOptions<PageResponse<DictionaryItemRecord>>,
) => {
  const queryInfo = useQuery<PageResponse<DictionaryItemRecord>>({
    queryKey: [QueryKeys.query, params],
    queryFn: () => DictionaryItemService.query(params),
    keepPreviousData: true,
    ...options,
  });
  return queryInfo;
};

export const useDictionaryItemMutation = (title = '新增') => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: Partial<DictionaryItemRequest>) => {
      const submit = req.id
        ? DictionaryItemService.update
        : DictionaryItemService.create;
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

export const useDictionaryItemDelete = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (req: Partial<DictionaryItemRequest>) =>
      DictionaryItemService.remove(req),
    onMutate: (variables) => {
      MessagePlugin.loading(`正在删除${variables.label}数据...`);
    },
    onSuccess: (_, variables) => {
      MessagePlugin.closeAll();
      MessagePlugin.success(`${variables.label}删除成功`);
    },
    onError: (_, variables) => {
      MessagePlugin.closeAll();
      MessagePlugin.error(`${variables.label}删除失败`);
    },
  });

  const confirmRemove = (
    record: Partial<DictionaryItemRecord>,
    onSuccess: () => boolean,
  ) => {
    const confirmDialog = DialogPlugin.confirm({
      destroyOnClose: true,
      header: '确认删除当前所选字典选项?',
      body: `删除后，${record.label}将被清空，且无法恢复`,
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
