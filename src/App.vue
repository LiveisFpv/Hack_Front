<template>
  <el-container class="layout-container">
    <el-container>
      <el-header>
        <!-- <header-layout class="el-header" /> -->
        <header-page />
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
import HeaderPage from '@/components/layout/HeaderPage.vue';
import FilterAside from '@/components/layout/FIlterAside.vue';
import { useFultersApp } from '@/utils/useFultersApp';
import type useAuthStore from '@/store/useAuthStore';
import { inject, onMounted } from 'vue';
import { USER_PROVIDE_SYMBOL } from '@/store/useAuthStore';
import { useLoadingDecorator } from '@/utils/useLoadingDecorator';
import useUserApi from '@/api/useUserApi';

const { isOpen } = useFultersApp;
const { getUser } = useUserApi();

const { setProfile } = inject<ReturnType<typeof useAuthStore>>(USER_PROVIDE_SYMBOL)!;

const loadProfile = async () => {
  const { data } = await getUser();
  setProfile(data);
};

const loadProfileDecorated = useLoadingDecorator(loadProfile);

onMounted(loadProfileDecorated);
</script>

<style lang="scss">
.el-header {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  background: var(--dark);
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
