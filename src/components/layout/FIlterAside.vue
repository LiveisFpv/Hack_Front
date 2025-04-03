<template>
  <el-container class="filter-aside">
    <el-header class="filter-aside__header">
      <el-button type="text" class="filter-aside__close" @click="onClose">
        <el-icon :size="20"><close /></el-icon>
      </el-button>
      <h2>Фильтрация</h2>
    </el-header>
    <el-main>
      <el-form>
        <el-form-item
          v-for="configure in configFiltersArr"
          :key="configure.name"
          :prop="configure.name"
          :label="configure.config.title">
          <el-input
            v-if="configure.config.type === 'string'"
            v-model="editFilters[configure.name]" />
        </el-form-item>
      </el-form>
    </el-main>
    <el-footer>
      <el-button type="primary">Применить</el-button>
      <el-button type="default">Очистить</el-button>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import type { TFilterRequest, TConfigFilterItem } from '@/types';
import { useFultersApp } from '@/utils/useFultersApp';
import { Close } from '@element-plus/icons-vue';
import { computed } from 'vue';

const {
  close: onClose,
  configFilters,
  currentFilters,
  editFilters,
} = useFultersApp as typeof useFultersApp & {
  currentFilters: TFilterRequest<keyof typeof useFultersApp.configFilters.value>;
  editFilters: TFilterRequest<keyof typeof useFultersApp.configFilters.value>;
};

type TConfig = {
  name: keyof typeof configFilters.value;
  config: TConfigFilterItem;
};

const configFiltersArr = computed(
  () =>
    (Object.keys(configFilters.value) as (keyof typeof configFilters.value)[]).map(
      (key) => ({
        name: key as keyof typeof configFilters.value,
        config: configFilters.value[key]!,
      }),
    ) as TConfig[],
);
</script>

<style lang="scss" scoped>
.filter-aside {
  width: 300px;

  &__header {
    height: fit-content;
    padding: 10px 20px 0;
  }

  &__close {
    padding: 10px;

    & > i {
      height: 100px;
      width: 100px;
    }
  }
}
</style>
