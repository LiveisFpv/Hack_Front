<template>
  <section>
    <home-slide1 />
    <home-slide2 />
    <home-slide3 />
  </section>
</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import HomeSlide1 from './homeSlides/HomeSlide1.vue';
import HomeSlide2 from './homeSlides/HomeSlide2.vue';
import HomeSlide3 from './homeSlides/HomeSlide3.vue';
import { useRouter } from 'vue-router';
import useYandexSuggestApi from '@/api/useYandexSuggestApi';
// import { ElNotification } from 'element-plus';

const props = defineProps<{ access_token?: string }>();
const router = useRouter();
const { getYandexData } = useYandexSuggestApi();

watch(
  () => router.currentRoute.value,
  () => {
    if (props.access_token) {
      getYandexData(props.access_token);
      // ElNotification({
      //   title: '',
      //   message: '',
      //   type: 'warning',
      // });
    }

    router.push({ name: 'home' });
  },
);

onMounted(() => {
  if (router.currentRoute.value.name === 'ya-token') {
    if (router.currentRoute.value.fullPath.includes('#')) {
      router.push(router.currentRoute.value.fullPath.replace('#', '?'));
    }
  }
});
</script>
