<template>
  <el-container class="layout-container">
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
import FilterAside from '@/components/layout/FIlterAside.vue';
import { useFultersApp } from '@/utils/useFultersApp';

const { isOpen } = useFultersApp;
</script>

<style lang="scss">
.el-header {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  // background: rgba(235,158,180, 1);
  background: white;
  width: 100%;
  color: var(--el-text-color-primary);
  font-size: 12px;
  z-index: 10;
}

.el-main {
  margin: 0;
  padding: 0;
}
</style>
