<template>
  <el-container class="header-page container">
    <el-container>
      <RouterLink class="header-page__logo" :to="{ name: 'home' }">
        <span class="logo__web">WEB-<span class="variable-color">GYM</span></span>
      </RouterLink>
    </el-container>

    <el-container>
      <RouterLink class="router-link" :to="{ name: 'home' }"> Главная </RouterLink>
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
                <el-dropdown-item @click="toProfile">Профиль</el-dropdown-item>
                <el-dropdown-item @click="logout">Выйти</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <span class="text-large font-600 mr-3">
            {{ profile?.user_lastName ?? '-' }}
          </span>
          <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
            {{ profile?.user_firstName ?? '-' }}
          </span>
        </div>
      </template>
      <template v-else>
        <el-button type="default" @click="openModal(true)">Войти</el-button>
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
import { useRouter } from 'vue-router';

const { user, profile, logout } =
  inject<ReturnType<typeof useAuthStore>>(USER_PROVIDE_SYMBOL)!;
const router = useRouter();
const dialogVisible = ref<boolean>(false);
const isAuth = ref<boolean>(false);

const toProfile = () => {
  router.push({ name: 'profile' });
};

const openModal = (value: boolean) => {
  isAuth.value = value;
  dialogVisible.value = true;
};
const close = () => (dialogVisible.value = false);
</script>

<style lang="scss" scoped>
.header-page {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

  &__logo {
    font-size: 33px;
    font-weight: 700;
  }
}

.el-container {
  flex: none;
}

.router-link {
  height: 100%;
  width: 100%;
  font-size: 30px;
  font-weight: 700;
  color: #ffffff;

  &.router-link-active {
    color: var(--variable);
  }
}

.logo {
  &__web {
    color: white;
  }

  &__gym {
    color: #fd4c00;
  }
}
</style>
