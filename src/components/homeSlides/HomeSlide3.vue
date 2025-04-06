<template>
  <section class="slide-3">
    <h2 class="slide-3__title">Наши преимущества</h2>
    <div class="slide-3__cards">
      <Slide3Card class="slide-3__card">
        <template #image>
          <img
            class="slide-3__image"
            src="https://static.tildacdn.com/tild6262-6135-4666-b961-303161653666/Rectangle_15_1.png"
            alt="train-img" />
        </template>
        <template #title>
          Занимайся прямо у себя на кухне, без пробок, очередей к тренажерам и
          общественных душевых
        </template>
        <template #description>
          Не нужно никуда ехать, искать фитнес-зал или перекраивать своё расписание.
          Появилось&nbsp;15&nbsp;–&nbsp;20&nbsp;минут — провели тренировку прямо на кухне
          или в спальне
        </template>
      </Slide3Card>

      <div class="slide-3__orange-block">
        <Slide3Card class="slide-3__card">
          <template #image>
            <img
              class="slide-3__image"
              src="https://static.tildacdn.com/tild6563-3431-4434-b935-626135366134/Rectangle_16_1.png"
              alt="train-img" />
          </template>
          <template #title>
            Увидишь первые результаты уже через&nbsp;4&nbsp;–&nbsp;5&nbsp;дней, а через
            месяц достигнешь больших целей
          </template>
          <template #description>
            Мы поможем тебе с питанием, тренировками и созданием комфортных тренировок,
            которые ты захочешь повторять снова и снова, потому что это легко и интересно
          </template>
        </Slide3Card>
      </div>

      <Slide3Card class="slide-3__card">
        <template #image>
          <img
            class="slide-3__image"
            src="https://static.tildacdn.com/tild6339-6237-4537-a463-336366303163/Rectangle_17_1.png"
            alt="train-img" />
        </template>
        <template #title>
          Сбалансируешь питание при этом сохранишь свой текущий рацион
          на&nbsp;70&nbsp;–&nbsp;80%
        </template>
        <template #description>
          Давиться спаржей и кормить ей своих близких НЕ ОБЯЗАТЕЛЬНО. Мы покажем рецепты
          блюд, которые можно приготовить из привычных продуктов, которые есть в каждой
          Пятёрочке или Магните
        </template>
      </Slide3Card>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.slide-3 {
  display: flex;
  flex-direction: column;
  padding: 50px 0 20px;
  gap: 80px;
  margin: 0 auto;

  &__title {
    font-size: 53px;
    font-weight: 700;
    text-align: center;
    margin: 0;
  }

  &__cards {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
  }

  &__card {
    max-width: 1000px;
    flex-direction: row-reverse;
  }

  &__orange-block {
    background: linear-gradient(
      0.3turn,
      rgba(254, 76, 0, 0.7),
      rgba(244, 117, 63, 0) 90%
    );
    padding: 25px 0;
    width: 100%;
    display: flex;
    justify-content: center;

    & > .slide-3__card {
      flex-direction: row;
    }
  }

  &__image {
    max-width: 100%;
  }
}

@media screen and (max-width: 720px) {
  .slide-3 {
    & &__card {
      padding: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 100%;
    }
  }
}
</style>
