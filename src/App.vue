<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <nav-layout />
    </el-aside>

    <el-container>
      <el-header>
        <header-layout class="el-header" />
      </el-header>

      <el-main>
        <RouterView />
      </el-main>
    </el-container>

    <el-aside :width="isOpen ? '300px' : '0'">
      <filter-aside />
    </el-aside>
  </el-container>
</template>

<script lang="ts" setup>
import HeaderLayout from '@/components/layout/HeaderLayout.vue';
import NavLayout from '@/components/layout/NavLayout.vue';
import FilterAside from '@/components/layout/FIlterAside.vue';
import { useFultersApp } from '@/utils/useFultersApp';

const { isOpen } = useFultersApp;
</script>

<style lang="scss">
.el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  text-align: right;
  font-size: 12px;
}
.layout-container .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container .el-menu {
  border-right: none;
}
.layout-container .el-main {
  padding: 20px;
}
.layout-container .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  right: 20px;
}
</style>
