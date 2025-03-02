<template>
  <register-form />
</template>

<script setup lang="ts">
import RegisterForm from '@/components/RegisterForm.vue';
import useCountryApi from '@/api/useCountryApi';
import type useAuthStore from './store/useAuthStore';
import { inject, onMounted } from 'vue';
import { USER_PROVIDE_SYMBOL } from './store/useAuthStore';

const { getCountries } = useCountryApi();
onMounted(async () => {
  const countries = await getCountries();
  console.log('getCountries', countries);
});
console.log('aa', inject<ReturnType<typeof useAuthStore>>(USER_PROVIDE_SYMBOL));
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
