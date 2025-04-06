<template>
  <section class="training-plan">
    <div class="container">
      <h2 class="training-plan__title">План тренировок</h2>

      <el-table
        ref="singleTableRef"
        :data="simpleTableData"
        highlight-current-row
        current-row-key="dateStr"
        style="
          width: 100%;
          --el-table-bg-color: transparent;
          --el-table-tr-bg-color: transparent;
          --el-table-header-bg-color: transparent;
          --el-table-header-text-color: white;
          --el-table-text-color: #ccc;
          --el-table-row-hover-bg-color: rgba(253, 76, 0, 0.2);
          --el-table-current-row-bg-color: rgba(253, 76, 0, 0.2);
        "
        @current-change="setCurrent">
        <el-table-column prop="dateStr" label="Дата" />
        <el-table-column prop="weekDay" label="День недели" width="180" />
        <el-table-column label="Завтрак" width="180">
          <template #default="simpleRow">
            <div style="display: flex; flex-direction: column">
              <router-link
                v-for="(dietItem, idx) in simpleRow.row.diet['Завтрак']"
                :key="idx"
                :to="{ name: 'recipe', query: { id: dietItem.dish_id } }">
                {{ dietItem.dish_title }}
              </router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Обед" width="180">
          <template #default="simpleRow">
            <div style="display: flex; flex-direction: column">
              <router-link
                v-for="(dietItem, idx) in simpleRow.row.diet['Обед']"
                :key="idx"
                :to="{ name: 'recipe', query: { id: dietItem.dish_id } }">
                {{ dietItem.dish_title }}
              </router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Полдник" width="180">
          <template #default="simpleRow">
            <div style="display: flex; flex-direction: column">
              <router-link
                v-for="(dietItem, idx) in simpleRow.row.diet['Ужин']"
                :key="idx"
                :to="{ name: 'recipe', query: { id: dietItem.dish_id } }">
                {{ dietItem.dish_title }}
              </router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Ужин" width="180">
          <template #default="simpleRow">
            <div style="display: flex; flex-direction: column">
              <router-link
                v-for="(dietItem, idx) in simpleRow.row.diet['Ужин']"
                :key="idx"
                :to="{ name: 'recipe', query: { id: dietItem.dish_id } }">
                {{ dietItem.dish_title }}
              </router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Тренировка" width="180">
          <template #default="simpleRow">
            <div style="display: flex; flex-direction: column">
              <router-link
                v-for="(dietItem, idx) in simpleRow.row.training"
                :key="idx"
                :to="{ name: 'training', query: { id: dietItem.training_id } }">
                {{ dietItem.training_title }}
              </router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Вес" width="180">
          <template #default="simpleRow">
            <div style="display: flex">
              <el-input-number
                v-model="simpleRow.row.weight"
                :precision="2"
                :step="0.1"
                :max="300"
                :min="20"
                style="--el-text-color-regular: black"
                @blur="onBlurWeight(simpleRow.row.dateStr, simpleRow.row.weight)" />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="training-plan__orange-block"></div>
  </section>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue';
import usePlanTrainingApi from '@/api/usePlanTrainingApi';
import type {
  TDietPlan,
  TSimpleRow,
  TTrainingPlan,
  TTrainingPlanByDate,
  TWeightHistory,
} from '@/types';
import { generateWeekDates } from '@/utils/generateWeekDates';
import type useAuthStore from '@/store/useAuthStore';
import { USER_PROVIDE_SYMBOL } from '@/store/useAuthStore';
import { useLoadingDecorator } from '@/utils/useLoadingDecorator';
import { getMondayByWeekDay } from '@/utils/getMondayByWeekDay';
import { getWeekDay } from '@/utils/getWeekDay';
import { RouterLink } from 'vue-router';
import type { TableInstance } from 'element-plus';

const { getDietPlan, getTrainingPlan, getWeightHistory, changeWeightHistory } =
  usePlanTrainingApi();

const { profile } = inject<ReturnType<typeof useAuthStore>>(USER_PROVIDE_SYMBOL)!;

const singleTableRef = ref<TableInstance>();
const dietPlan = ref<TDietPlan[]>([]);
const trainingPlan = ref<TTrainingPlan[]>([]);
const weightHistory = ref<TWeightHistory[]>([]);
const currentMondayDate = ref<Date>(getMondayByWeekDay(new Date()));
const currentRow = ref('2025-04-06');
console.log('currentRow', currentRow);

const weekDates = computed<Date[]>(() => [...generateWeekDates(currentMondayDate.value)]);
const weekDatesStr = computed<string[]>(() =>
  weekDates.value.map(Intl.DateTimeFormat().format),
);

const weekDatesObj = computed(() =>
  weekDates.value.reduce((obj, date) => {
    const dateStr = Intl.DateTimeFormat().format(date);
    obj[dateStr] = {
      diet: {
        Завтрак: [],
        Обед: [],
        Полдник: [],
        Ужин: [],
      },
      dateStr: dateStr,
      date,
      weekDay: getWeekDay(date),
      training: [],
      weight: profile.value?.user_weight ?? 0,
    };
    return obj;
  }, {} as TTrainingPlanByDate),
);

const dietPlanByDate = computed<TTrainingPlanByDate>(() =>
  dietPlan.value.reduce((obj: TTrainingPlanByDate, dietPlanItem) => {
    const date = Intl.DateTimeFormat().format(new Date(dietPlanItem.date));
    if (!(date in obj)) return obj;

    const dish_time = dietPlanItem.dish_time;

    obj[date].diet[dish_time].push({
      dish_id: dietPlanItem.dish_id,
      dish_weight: dietPlanItem.dish_weight,
      dish_title: dietPlanItem.dish_title,
      dish_kcal: dietPlanItem.dish_kcal,
      dish_proteins: dietPlanItem.dish_proteins,
      dish_fats: dietPlanItem.dish_fats,
      dish_carbs: dietPlanItem.dish_carbs,
    });

    return obj;
  }, weekDatesObj.value),
);

const trainingPlanByDate = computed<TTrainingPlanByDate>(() =>
  trainingPlan.value.reduce((obj: TTrainingPlanByDate, trainingPlanItem) => {
    const date = Intl.DateTimeFormat().format(new Date(trainingPlanItem.date));
    if (!(date in obj)) return obj;

    obj[date].training.push({
      training_id: trainingPlanItem.training_id,
      training_title: trainingPlanItem.training_title,
      training_desc: trainingPlanItem.training_desc,
    });

    return obj;
  }, dietPlanByDate.value),
);

const setCurrent = () => {
  singleTableRef.value!.setCurrentRow(
    simpleTableData.value.find(
      (row) => row.dateStr === Intl.DateTimeFormat().format(new Date()),
    ),
  );
};

const weightPlanByDate = computed<TTrainingPlanByDate>(() =>
  weightHistory.value.reduce((obj: TTrainingPlanByDate, weightItem) => {
    const date = Intl.DateTimeFormat().format(new Date(weightItem.date));
    if (!(date in obj)) return obj;

    obj[date].weight = weightItem.weight;

    return obj;
  }, trainingPlanByDate.value),
);

const simpleTableData = computed<TSimpleRow[]>(() =>
  weekDatesStr.value.map((dateStr) => weightPlanByDate.value[dateStr]),
);

const loadData = async (mondayDateStr: string) => {
  const [
    { data: dietPlanData },
    { data: trainingPlanData },
    { data: weightHistoryData },
  ] = await Promise.all([
    getDietPlan({ date: mondayDateStr }),
    getTrainingPlan({ date: mondayDateStr }),
    getWeightHistory({ date: mondayDateStr }),
  ]);
  dietPlan.value = dietPlanData;
  trainingPlan.value = trainingPlanData;
  weightHistory.value = weightHistoryData;

  setCurrent();
};

const loadDataDecorated = useLoadingDecorator(loadData);
const onBlurWeight = useLoadingDecorator(async (date: string, weight: number) => {
  await changeWeightHistory({ date, weight });
});

onMounted(() => loadDataDecorated(Intl.DateTimeFormat().format(currentMondayDate.value)));
</script>

<style lang="scss" scoped>
:root {
  --el-table-bg-color: transparent !important;
}

.training-plan {
  position: relative;
  min-height: calc(100vh - 60px);

  .container {
    margin: 0 auto;
  }

  &__title {
    font-size: 53px;
    font-weight: 700;
    text-align: center;
    margin: 0;
    margin-bottom: 30px;
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
</style>
