<template>
  <section class="auth-container">
    <auth-form v-if="isAuth" @toggle-form="toggleForm" @close="close">
      <template #footer>
        <el-button type="primary" link @click="toggleForm">Зарегистрироваться</el-button>
      </template>
    </auth-form>
    <register-form v-else @toggle-form="toggleForm" @close="close">
      <template #footer>
        <el-button type="primary" link @click="toggleForm">Войти</el-button>
      </template>
    </register-form>
  </section>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import AuthForm from './AuthForm.vue';
import RegisterForm from './RegisterForm.vue';

const props = defineProps<{ isAuth: boolean }>();
const emit = defineEmits({ close: null });

const isAuth = ref<boolean>(props.isAuth);

const toggleForm = () => (isAuth.value = !isAuth.value);
const close = () => emit('close');
</script>

<style lang="scss" scoped>
</style>
