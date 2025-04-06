import type { GetItemResponse, TRecipeDiet } from '@/types';

export const getRecipeDietMock = (): GetItemResponse<TRecipeDiet[]> => ({
  data: [
    {
      dish_id: 1,
      recipe_order: 1,
      recipe_instruct:
        'Как сварить овсяную кашу на воде и молоке? Подготовьте для этого необходимые ингредиенты. Пропорции воды и молока можно немного изменить в ту или иную сторону. Молоко можно брать любой жирности. В количестве сахара ориентируйтесь на свой вкус. Если планируете добавлять в готовую кашу сладкие ягоды или фрукты, то сахар можно вообще не сыпать. Для приготовления можно использовать крупные или мелкие хлопья. Мелкие быстрее разварятся и каша будет однороднее.',
      recipe_img:
        'https://static.1000.menu/img/content-v2/8e/dd/70531/ovsyanaya-kasha-na-vode-i-moloke_1671823400_0_max.jpg',
    },

    {
      dish_id: 1,
      recipe_order: 2,
      recipe_instruct:
        'Овсяные хлопья промойте и переложите в небольшую кастрюлю или ковш. Затем залейте водой. Поставьте на огонь и доведите до кипения. Проварите несколько минут на небольшом огне, чтобы каша начала набухать. На это уйдет 5-7 минут. Если хотите получить более питательную кашу, то можно её готовить полностью на молоке. Просто замените воду таким же количеством молока. Но лучше, все же, немного разварить хлопья в небольшом количестве воды.',
      recipe_img:
        'https://static.1000.menu/res/380/img/content-v2/8e/dd/70531/ovsyanaya-kasha-na-vode-i-moloke_1671823410_1_max.jpg',
    },

    {
      dish_id: 1,
      recipe_order: 3,
      recipe_instruct: 'Затем влейте молоко. Перемешайте и снова доведите до кипения.',
      recipe_img:
        'https://static.1000.menu/img/content-v2/8e/dd/70531/ovsyanaya-kasha-na-vode-i-moloke_1671823450_2_max.jpg',
    },

    {
      dish_id: 1,
      recipe_order: 4,
      recipe_instruct:
        'По вкусу добавьте в кашу сахар и щепотку соли. Проварите кашу еще 3-4 минуты.',
      recipe_img:
        'https://static.1000.menu/img/content-v2/8e/dd/70531/ovsyanaya-kasha-na-vode-i-moloke_1671823457_3_max.jpg',
    },

    {
      dish_id: 1,
      recipe_order: 5,
      recipe_instruct:
        'За это время каша станет густая. Накройте её крышкой и снимите с огня. Дайте её немного настояться, пропариться. Каша станет еще гуще.',
      recipe_img:
        'https://static.1000.menu/img/content-v2/8e/dd/70531/ovsyanaya-kasha-na-vode-i-moloke_1671823463_4_max.jpg',
    },

    {
      dish_id: 1,
      recipe_order: 6,
      recipe_instruct:
        'Промойте в горячей воде изюм. Банан очистите от кожуры и нарежьте ломтиками. Чтобы банан не успел потемнеть, можно его сбрызнуть лимонным соком.',
      recipe_img:
        'https://static.1000.menu/img/content-v2/8e/dd/70531/ovsyanaya-kasha-na-vode-i-moloke_1671823473_6_max.jpg',
    },

    {
      dish_id: 1,
      recipe_order: 7,
      recipe_instruct:
        'Готовую кашу разложите в подходящие тарелки. Добавьте подготовленный банан и изюм. Кстати, банан и изюм можно заменить на любые сухофрукты, яблоки, груши, или ягоды. Приятного аппетита!',
      recipe_img:
        'https://static.1000.menu/img/content-v2/8e/dd/70531/ovsyanaya-kasha-na-vode-i-moloke_1671823481_8_max.jpg',
    },
  ],
});
