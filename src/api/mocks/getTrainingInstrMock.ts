import type { GetItemResponse, TTrainingInstr } from '@/types';

export const getTrainingInstrMock = (): GetItemResponse<TTrainingInstr[]> => ({
  data: [
    {
      training_id: 1,
      training_order: 1,
      training_instr:
        'Пальцами рук пройдитесь по длинным мышцам-разгибателям шеи, которые идут вдоль шейного отдела позвоночника: от черепа вниз, в сторону трапеции. Помассируйте их движениями вверх-вниз.',
      training_img:
        'https://secrets.tbank.ru/api/image/?src=https%253A%252F%252Fpublic-static.tinkoffjournal.ru%252Fbusiness-secrets%252Fuploads%252F2024%252F08%252FG2GpGmbX-1.png',
    },
    {
      training_id: 1,
      training_order: 2,
      training_instr:
        'Выполните аккуратные круговые движения снизу вверх, поднимаясь к основанию черепа.',
      training_img:
        'https://secrets.tbank.ru/api/image/?src=https%253A%252F%252Fpublic-static.tinkoffjournal.ru%252Fbusiness-secrets%252Fuploads%252F2024%252F08%252FG2GpGmbX-1.png',
    },
  ],
});
