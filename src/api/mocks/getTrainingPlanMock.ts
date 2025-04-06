import type { GetListResponse, TTrainingPlan } from '@/types';

export const getTrainingPlanMock = (): GetListResponse<TTrainingPlan> => ({
  pagination: {
    current: 0,
    limit: 20,
    total: 100,
  },
  data: [
    {
      training_id: 1,
      date: '2025-04-01',
      training_title: 'Самомассаж шеи',
      training_desc:
        'Небольшой массаж поможет разогреть и расслабить мышцы шеи, подготовить их к дальнейшим упражнениям.',
      training_user_level: 1,
    },

    {
      training_id: 2,
      date: '2025-04-01',
      training_title: 'Растяжение в наклоне',
      training_desc:
        'Растяжение в наклоне поможет мягко расслабить мышцы надлопаточной области, которые напрягаются, пока работаете сидя.',
      training_user_level: 1,
    },

    {
      training_id: 1,
      date: '2025-04-05',
      training_title: 'Самомассаж шеи',
      training_desc:
        'Небольшой массаж поможет разогреть и расслабить мышцы шеи, подготовить их к дальнейшим упражнениям.',
      training_user_level: 1,
    },

    {
      training_id: 2,
      date: '2025-04-05',
      training_title: 'Растяжение в наклоне',
      training_desc:
        'Растяжение в наклоне поможет мягко расслабить мышцы надлопаточной области, которые напрягаются, пока работаете сидя.',
      training_user_level: 1,
    },
  ],
});

// https://secrets.tbank.ru/lifestyle/uprazhneniya-dlya-spiny/
