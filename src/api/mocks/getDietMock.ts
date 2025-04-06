import type { GetItemResponse, TDiet } from '@/types';

export const getDietMock = (): GetItemResponse<TDiet> => ({
  data: {
    dish_id: 1,
    dish_time: 'Завтрак',
    dish_title: 'Овсяная каша',
    dish_kcal: 97.7,
    dish_proteins: 3.5,
    dish_fats: 1.7,
    dish_carbs: 17,
    dish_desc:
      'Вкусная, аппетитная и сытная, для всей семьи! Овсяная каша на воде и молоке станет отличным вариантом завтрака. Различные добавки подарят вам возможность каждый раз угощаться новыми вкусами. Это быстрое и простое блюдо!',
  },
});
