<template>
  <el-table
    ref="singleTableRef"
    :data="tableData"
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
    ">
    <el-table-column prop="gramms" label="Граммы" width="180" />
    <el-table-column prop="dish_kcal" label="Калории" width="180" />
    <el-table-column prop="dish_proteins" label="Белки" width="180" />
    <el-table-column prop="dish_fats" label="Жиры" width="180" />
    <el-table-column prop="dish_carbs" label="Углеводы" width="180" />
  </el-table>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { TDiet } from '@/types';

const props = defineProps<{
  diet: TDiet;
}>();

const tableData = computed(() => [
  {
    gramms: 100,
    ...props.diet,
  },
]);
</script>
