import type { GetItemResponse, TTraining } from '@/types';

export const getTrainingMock = (): GetItemResponse<TTraining> => ({
  data: {
    training_id: 1,
    training_title: 'Самомассаж шеи',
    training_desc:
      'Небольшой массаж поможет разогреть и расслабить мышцы шеи, подготовить их к дальнейшим упражнениям.',
    training_user_level: 1,
  },
});
