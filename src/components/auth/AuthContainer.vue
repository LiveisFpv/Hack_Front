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
        <div class="buttonContainerId"></div>
      </template>
    </register-form>
  </section>
</template>

<script lang="ts" setup>
import { ref, defineProps, onMounted } from 'vue';
import AuthForm from './AuthForm.vue';
import RegisterForm from './RegisterForm.vue';
import useYandexSuggestApi from '@/api/useYandexSuggestApi';

const props = defineProps<{ isAuth: boolean }>();
const emit = defineEmits({ close: null });

const { getToken } = useYandexSuggestApi();
const isAuth = ref<boolean>(props.isAuth);

const toggleForm = () => (isAuth.value = !isAuth.value);
const close = () => emit('close');

onMounted(getToken);
</script>
