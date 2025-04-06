<template>
  <section class="instruction-page">
    <div class="container">
      <h2 class="instruction-page__title"></h2>
    </div>
  </section>
</template>

<script lang="ts" setup>
import usePlanTrainingApi from '@/api/usePlanTrainingApi';
import type { TDiet, TRecipeDiet } from '@/types';
import { useLoadingDecorator } from '@/utils/useLoadingDecorator';
import { computed, onMounted, ref } from 'vue';

const props = defineProps<{
  id: string;
}>();

const { getDiet, getRecipeDiet } = usePlanTrainingApi();

const item = ref<TDiet | null>(null);
const instructions = ref<TRecipeDiet[] | null>(null);

const trainingId = computed(() => +props.id);

const loadData = async (id: number) => {
  const [{ data: itemData }, { data: instructionsData }] = await Promise.all([
    getDiet({ id }),
    getRecipeDiet({ id }),
  ]);
  item.value = itemData;
  instructions.value = instructionsData;
};

const loadDataDecorated = useLoadingDecorator(loadData);
onMounted(() => loadDataDecorated(trainingId.value));
</script>

<style lang="scss" scoped>
.instruction-page {
}
</style>
