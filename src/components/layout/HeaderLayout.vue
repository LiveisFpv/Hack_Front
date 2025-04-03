<template>
  <div class="toolbar">
    <el-dropdown>
      <el-icon class="toolbar__setting-icon">
        <setting />
      </el-icon>
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
    <span>{{ user ? 'Том' : '-' }}</span>
  </div>

  <el-dialog
    v-model="dialogVisible"
    :style="{ maxWidth: '500px' }"
    class="toolbar__dialog"
    modal>
    <auth-container v-if="dialogVisible" :is-auth="isAuth" @close="close" />
  </el-dialog>
</template>

<script lang="ts" setup>
import AuthContainer from '@/components/auth/AuthContainer.vue';
import useAuthStore, { USER_PROVIDE_SYMBOL } from '@/store/useAuthStore';
import { Setting } from '@element-plus/icons-vue';
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
.toolbar {
  height: 60px;

  &__setting-icon {
    margin-right: 8px;
    margin-top: 1px;
  }

  &__dialog {
    max-width: 500px;
  }
}
</style>
