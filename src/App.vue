<template>
  <el-container class="layout-container">
    <el-container>
      <el-header>
        <!-- <header-layout class="el-header" /> -->
        <header-page />
      </el-header>

      <el-main>
        <RouterView v-if="isLoading" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import HeaderPage from '@/components/layout/HeaderPage.vue';
import type useAuthStore from '@/store/useAuthStore';
import { inject, onMounted, ref } from 'vue';
import { USER_PROVIDE_SYMBOL } from '@/store/useAuthStore';
import { useLoadingDecorator } from '@/utils/useLoadingDecorator';
import useUserApi from '@/api/useUserApi';

const { getUser } = useUserApi();

const { setProfile, user } =
  inject<ReturnType<typeof useAuthStore>>(USER_PROVIDE_SYMBOL)!;

const isLoading = ref(true);

const loadProfile = async () => {
  if (user.value) {
    const { data } = await getUser();
    setProfile(data);
    isLoading.value = false;
  }
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
