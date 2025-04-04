<template>
  <el-scrollbar>
    <el-menu :default-openeds="['1', '3']">
      <el-menu-item index="0">
        <RouterLink class="router-link" :to="{ name: 'home' }"> Главная </RouterLink>
      </el-menu-item>

      <el-menu-item index="1">
        <RouterLink class="router-link" :to="{ name: 'test-table' }">
          Таблица
        </RouterLink>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100vh;
}

.el-menu-item {
  padding-left: 0 !important;
  padding-right: 0;
}

.router-link {
  height: 100%;
  width: 100%;
  padding-left: 20px;

  &.router-link-active {
    color: var(--el-menu-active-color);
  }
}
</style>
