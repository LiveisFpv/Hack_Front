<template>
  <article class="slide-card">
    <div class="slide-card__svg">
      <slot name="svg"></slot>
    </div>
    <h3 class="slide-card__title">
      <slot name="title"></slot>
    </h3>

    <p class="slide-card__description">
      <slot name="description"></slot>
    </p>
  </article>
</template>

<style lang="scss" scoped>
.slide-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 30px;
  background-color: rgba(46, 54, 60, 0.5);
  border: rgba(255, 255, 255, 0.2) 0.85px solid;
  box-sizing: border-box;
  max-width: 290px;

  &__svg {
    text-align: center;
  }

  &__title {
    font-weight: 700;
    font-size: 20px;
    margin: 0;
    text-align: center;
  }

  &__description {
    font-size: 17px;
    color: rgba(201, 201, 201, 1);
    text-align: justify;
    margin: 0;

    &::after {
      content: '';
      display: inline-block;
      width: 100%;
    }
  }
}
</style>
