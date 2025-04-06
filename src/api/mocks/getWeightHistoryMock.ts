import type { GetListResponse, TWeightHistory } from '@/types';

export const getWeightHistoryMock = (): GetListResponse<TWeightHistory> => ({
  pagination: {
    current: 0,
    limit: 20,
    total: 100,
  },
  data: [],
});
