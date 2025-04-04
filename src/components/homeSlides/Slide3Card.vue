<template>
  <section class="slide-card">
    <div class="slide-card__content">
      <h2 class="slide-card__title">
        <slot name="title"></slot>
      </h2>

      <p class="slide-card__description">
        <slot name="description"></slot>
      </p>
    </div>

    <div class="slide-card__img">
      <slot name="image"></slot>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.slide-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;

  &__content {
    display: flex;
    flex-direction: column;
    gap: 15px;
    flex: 1;
  }

  &__title {
    font-size: 24px;
    font-weight: 700;
    margin: 0;
  }

  &__description {
    font-size: 17px;
    color: rgba(201, 201, 201, 1);
    margin: 0;
  }

  &__img {
    flex: 1;
  }
}
</style>
