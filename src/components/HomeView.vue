<template>
  <el-container class="home-view">
    <el-main class="home-view__main">
      <el-container class="home-view__section section-1">
        <el-main class="section-1__main">
          <h2>
            Хотите улучшить своё здоровье, сбросить лишний вес и привести себя в форму, но
            не знаете, с чего начать? У нас есть идеальный вариант для вас!
          </h2>
          <h3>Достигните своих целей за 20-30 минут в день!</h3>

          <el-button class="section-1__btn" type="danger" round>Да, хочу</el-button>

          <div class="section-1__img-1"></div>
          <div class="section-1__img-2"></div>
        </el-main>
      </el-container>
      <el-container class="home-view__section section-1">
        <el-main class="section-1__main">
          <h2>
            Хочешь скинуть лишние 3-5 килограмм в этом месяце, привести себя в форму,
            закалить до предела и снова полюбить свое тело?
          </h2>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.section-1 {
  min-height: 100vh;

  background: linear-gradient(
    180deg,
    rgba(235, 158, 180, 1) 35%,
    rgba(255, 234, 240, 1) 100%
  );

  &__main {
    position: relative;
    font-size: 32px;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding-bottom: 10%;
    overflow: visible;

    & h2,
    & h3 {
      margin: 0;
    }
  }

  &__btn {
    max-width: 300px !important;
    font-size: 24px !important;
    margin: 0 auto;
    padding: 20px;
  }

  &__img-1 {
    position: absolute;
    bottom: 10px;
    left: -158px;
    height: 462px;
    width: 468px;
    background-image: url('https://static.tildacdn.com/tild3933-3463-4365-b039-376464353530/Vector_11_1.png');
    border-radius: 0px 0px 0px 0px;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    border-color: transparent;
    border-style: solid;
  }

  &__img-2 {
    position: absolute;
    bottom: 10px;
    right: -149px;
    height: 462px;
    width: 468px;
    background-image: url('https://static.tildacdn.com/tild6431-6662-4461-b562-613362346635/Vector_10_1.png');
    border-radius: 0px 0px 0px 0px;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    border-color: transparent;
    border-style: solid;
  }
}
</style>
