import type { TSortingRequest } from '@/types';
import type { Sort } from 'element-plus';

export const changeSortLibFormatTo = <TByKeys extends string>(
  sorting: TSortingRequest<TByKeys>,
): Sort => ({
  prop: sorting.by,
  order: sorting.direction === 'asc' ? 'ascending' : 'descending',
});

export const changeSortLibFormatFrom = <TByKeys extends string>(
  sorting: Sort,
): TSortingRequest<TByKeys> => ({
  by: sorting.prop as TByKeys,
  direction: sorting.order === 'ascending' ? 'asc' : 'desc',
});
