import type { GetListResponse, TWeightHistory } from '@/types';

export const getWeightHistoryMock = (): GetListResponse<TWeightHistory> => ({
  pagination: {
    current: 0,
    limit: 20,
    total: 100,
  },
  data: [
    {
      user_id: 1,
      weight: 65.1,
      date: '2025-03-31',
    },
    {
      user_id: 1,
      weight: 64.1,
      date: '2025-04-01',
    },
    {
      user_id: 1,
      weight: 63.1,
      date: '2025-04-02',
    },

    {
      user_id: 1,
      weight: 64.2,
      date: '2025-04-03',
    },

    {
      user_id: 1,
      weight: 63.4,
      date: '2025-04-04',
    },

    {
      user_id: 1,
      weight: 64.1,
      date: '2025-04-05',
    },

    {
      user_id: 1,
      weight: 63.0,
      date: '2025-04-06',
    },
  ],
});
