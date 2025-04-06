<template>
  <section class="instruction-page">
    <div class="container">
      <h2 class="instruction-page__title">{{ item?.training_title }}</h2>
      <h3 class="instruction-page__sub-title">{{ item?.training_desc }}</h3>

      <div v-if="instructions" class="instruction-page__cards">
        <instruction-card
          v-for="itemInstr in instructions"
          :key="itemInstr.training_order"
          class="instruction-page__card">
          <template #image>
            <img
              v-if="itemInstr.training_img"
              class="instruction-page__image"
              :src="itemInstr.training_img"
              alt="train-img" />
          </template>
          <template #title>
            {{ itemInstr.training_order }}. {{ itemInstr.training_instr }}
          </template>
        </instruction-card>
      </div>
      <span v-else>Данные не найдены</span>
    </div>

    <div class="instruction-page__orange-block"></div>
  </section>
</template>

<script lang="ts" setup>
import usePlanTrainingApi from '@/api/usePlanTrainingApi';
import type { TTraining, TTrainingInstr } from '@/types';
import { useLoadingDecorator } from '@/utils/useLoadingDecorator';
import { computed, onMounted, ref } from 'vue';

const props = defineProps<{
  id: string;
}>();

const { getTraining, getTrainingInstr } = usePlanTrainingApi();

const item = ref<TTraining | null>(null);
const instructions = ref<TTrainingInstr[] | null>(null);

const trainingId = computed(() => +props.id);

const loadData = async (id: number) => {
  const [{ data: itemData }, { data: instructionsData }] = await Promise.all([
    getTraining({ id }),
    getTrainingInstr({ id }),
  ]);
  item.value = itemData;
  instructions.value = instructionsData;
};

const loadDataDecorated = useLoadingDecorator(loadData);
onMounted(() => loadDataDecorated(trainingId.value));
</script>

<style lang="scss" scoped>
.instruction-page {
  &__title {
    font-size: 53px;
    font-weight: 700;
    text-align: center;
    margin: 0;
  }

  &__sub-title {
    font-size: 24px;
    font-weight: 700;
    margin: 0;
    margin-bottom: 15px;
  }

  &__image {
    float: left;
    max-width: 100%;
    border-radius: 15px;
  }

  &__cards {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__card {
    padding: 5px;

    &:nth-child(2n) {
      flex-direction: row-reverse;
    }
  }

  &__orange-block {
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    background: linear-gradient(rgba(253, 76, 0, 1), rgba(244, 117, 63, 0));
    width: 30%;
    height: 100%;
  }
}

@media screen and (max-width: 720px) {
  .instruction-page {
    &__card {
      flex-direction: column-reverse;

      &:nth-child(2n) {
        flex-direction: column-reverse;
      }
    }
  }
}
</style>
