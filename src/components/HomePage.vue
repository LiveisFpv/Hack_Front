<template>
  <section>
    <home-slide1 />
    <home-slide2 />
    <home-slide3 />
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import HomeSlide1 from './homeSlides/HomeSlide1.vue';
import HomeSlide2 from './homeSlides/HomeSlide2.vue';
import HomeSlide3 from './homeSlides/HomeSlide3.vue';

const props = defineProps<{ token?: string }>();
console.log('props', props);

onMounted(() => {
  if (props.token) {
    (
      window as unknown as { YaSendSuggestToken: (...args: unknown[]) => void }
    ).YaSendSuggestToken('https://hackatonsite.jumpingcrab.com', {
      flag: true,
    });
  }
});
</script>
