import type { PageResponse } from '@/common/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DialogPlugin, MessagePlugin } from 'tdesign-react';
import * as DictionaryService from './service';
import type {
  DictionaryParams,
  DictionaryRecord,
  DictionaryRequest,
} from './types';

export enum QueryKeys {
  query = 'dictionary-query',
}

export const useDictionaries = (params: Partial<DictionaryParams>) =>
  useQuery<PageResponse<DictionaryRecord>>({
    queryKey: [QueryKeys.query, params],
    queryFn: () => DictionaryService.query(params),
    keepPreviousData: true,
  });

export const useDictionaryMutation = (title = '新增') => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: Partial<DictionaryRequest>) => {
      const submit = req.id
        ? DictionaryService.update
        : DictionaryService.create;
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

export const useDictionaryDelete = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (req: Partial<DictionaryRequest>) =>
      DictionaryService.remove(req),
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
    record: Partial<DictionaryRecord>,
    onSuccess: () => boolean,
  ) => {
    const confirmDialog = DialogPlugin.confirm({
      destroyOnClose: true,
      theme: 'danger',
      header: '确认删除当前所选字典?',
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
