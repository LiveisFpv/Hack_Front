<template>
  <section class="slide-1">
    <div class="slide-1__container container">
      <div class="slide-1__info">
        <h2 class="slide-1__title">
          ФОРМИРУЙ СВОЕ
          <span class="variable-color">ТЕЛО</span>
        </h2>

        <p class="slide-1__description">
          Хотите улучшить своё здоровье, сбросить лишний вес и привести себя в форму, но
          не знаете, с чего начать? У нас есть идеальный вариант для вас!
        </p>

        <p class="slide-1__description">Достигните своих целей за 20-30 минут в день!</p>
      </div>

      <div class="slide-1__img">
        <div class="slide-1__notification-card">
          <span>Доступен 24 часа</span>
        </div>

        <img class="slide-1__image" src="/assets/sports-1.png" />
      </div>
    </div>
    <div class="slide-1__orange-block"></div>
  </section>
</template>

<style lang="scss" scoped>
.slide-1 {
  overflow: hidden;
  position: relative;
  padding: 41px 0;

  &__container {
    display: flex;
    margin: 41px auto 0;
    justify-content: space-between;
    gap: 45px;
  }

  &__image {
    max-width: 913px;
    max-height: 851px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    max-width: 648px;
    justify-content: center;
    gap: 65px;
  }

  &__title {
    margin: 0;
    font-size: 70px;
    font-weight: 900;
    text-align: justify;
  }

  &__description {
    margin: 0;
    font-size: 24px;
    text-align: justify;

    &::after {
      content: '';
      display: inline-block;
      width: 100%;
    }
  }

  &__img {
    position: relative;
  }

  &__notification-card {
    position: absolute;
    left: -35px;
    padding: 15px 30px;
    top: calc(50% - 100px);
    background: var(--variable);
    font-size: 48px;
    max-width: 213px;
    text-align: center;
  }

  &__orange-block {
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    background: linear-gradient(rgba(253, 76, 0, 1), rgba(244, 117, 63, 0));
    width: 30%;
    height: 100%;
  }
}

@media screen and (max-width: 1000px) {
  .slide-1 {
    &__container {
      flex-direction: column-reverse;
      gap: 25px;
    }

    &__info {
      max-width: 100%;
    }

    &__img {
      padding: 5px;
      max-width: 100%;
    }

    &__image {
      margin: 0 auto;
      max-width: 100%;
    }

    &__notification-card {
      left: -10px;
    }
  }
}
</style>
