<template>
  <section class="slide-2">
    <h2 class="slide-2__title">Программа тренировок</h2>
    <div class="slide-2__content">
      <div class="slide-2__cards">
        <Slide2Card v-for="card in cards" :key="card.svg" class="slide-2__card">
          <template #svg>
            <img class="slide-2__image" :src="card.svg" alt="train-img" />
          </template>
          <template #title>{{ card.title }}</template>
          <template #description>{{ card.description }}</template>
        </Slide2Card>
      </div>
      <p class="slide-2__description">
        Присоединяйтесь к нам и сделайте первый шаг к своему новому "я"!
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import Slide2Card from './Slide2Card.vue';
import cardioSvg from './slide2Svg/cardio.svg';
import helathSvg from './slide2Svg/helath.svg';
import shapeSvg from './slide2Svg/shape.svg';
import strengthSvg from './slide2Svg/strength.svg';

const cards: { svg: string; title: string; description: string }[] = [
  {
    svg: strengthSvg,
    title: 'Силовая тренировка',
    description:
      'Способствует улучшению обмена веществ и более эффективному сжиганию жира',
  },
  {
    svg: cardioSvg,
    title: 'Кардиотренировка',
    description:
      'Позволяет улучшить общую физическую выносливость и повысить уровень энергии в повседневной жизни',
  },
  {
    svg: helathSvg,
    title: 'Оздоровительная тренировка',
    description:
      'Помогает снизить уровень стресса, улучшить психоэмоциональное состояние, повышает подвижность и гибкость суставов',
  },
  {
    svg: shapeSvg,
    title: 'Формирование тела',
    description:
      'Помогает подчеркнуть мышечный рельеф, создавать стройный силуэт и обеспечивает тонус мышц',
  },
];
</script>

<style lang="scss" scoped>
.slide-2 {
  display: flex;
  flex-direction: column;
  padding: 15px 0;
  gap: 120px;
  max-width: 1400px;
  margin: 0 auto;

  &__title {
    font-size: 53px;
    font-weight: 700;
    text-align: center;
    margin: 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 60px;
  }

  &__cards {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }

  &__description {
    max-width: 70%;
    margin: 0 auto;
    font-size: 26px;
    text-align: center;
    color: rgba(201, 201, 201, 1);
  }

  &__image {
    max-width: 57px;
  }
}
</style>
