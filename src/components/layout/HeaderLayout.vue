<template>
  <el-container class="header-layout">
    <el-container>
      <el-button type="default" link>
        <RouterLink class="router-link" :to="{ name: 'home' }"> Главная </RouterLink>
      </el-button>
    </el-container>
    <el-container>
      <template v-if="user">
        <div class="flex items-center">
          <el-dropdown>
            <el-avatar
              :size="32"
              class="mr-3"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            <template #dropdown>
              <el-dropdown-menu v-if="user">
                <el-dropdown-item @click="logout">Выйти</el-dropdown-item>
              </el-dropdown-menu>
              <el-dropdown-menu v-else>
                <el-dropdown-item @click="openModal(true)">Войти</el-dropdown-item>
                <el-dropdown-item @click="openModal(false)">
                  Зарегистрироваться
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <span class="text-large font-600 mr-3"> Title </span>
          <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
            Sub title
          </span>
          <el-tag>Default</el-tag>
        </div>
      </template>
      <template v-else>
        <el-button type="danger" @click="openModal(true)" round>Войти</el-button>
        <el-button type="danger" @click="openModal(false)" round
          >Зарегистрироваться</el-button
        >
      </template>
    </el-container>
  </el-container>

  <el-dialog
    v-model="dialogVisible"
    :style="{ maxWidth: '500px' }"
    class="header-layout__dialog"
    modal>
    <auth-container v-if="dialogVisible" :is-auth="isAuth" @close="close" />
  </el-dialog>
</template>

<script lang="ts" setup>
import AuthContainer from '@/components/auth/AuthContainer.vue';
import useAuthStore, { USER_PROVIDE_SYMBOL } from '@/store/useAuthStore';
import { inject, ref } from 'vue';

const { user, logout } = inject<ReturnType<typeof useAuthStore>>(USER_PROVIDE_SYMBOL)!;
const dialogVisible = ref<boolean>(false);
const isAuth = ref<boolean>(false);

const openModal = (value: boolean) => {
  isAuth.value = value;
  dialogVisible.value = true;
};
const close = () => (dialogVisible.value = false);
</script>

<style lang="scss" scoped>
.el-header {
  background: linear-gradient(
    180deg,
    rgba(235, 158, 180, 1) 35%,
    rgba(255, 234, 240, 1) 100%
  );
}
.header-layout {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  padding: 15px;
  width: 100%;
  padding-left: 20px;

  &__setting-icon {
    margin-right: 8px;
    margin-top: 1px;
  }

  &__dialog {
    max-width: 500px;
  }
}

.el-container {
  flex: none;
}

.router-link {
  height: 100%;
  width: 100%;
  color: black;
  font-size: 20px;

  &.router-link-active {
    color: rgba(235, 158, 180, 1);

    // color: white;
    // color: var(--el-menu-active-color);
  }
}
</style>
