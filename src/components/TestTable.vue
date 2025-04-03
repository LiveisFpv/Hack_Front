<template>
  <el-container>
    <el-header>
      <h2>Тестовая таблица</h2>
    </el-header>

    <el-main>
      <el-button type="success" :icon="Plus"> Добавить страну </el-button>
      <el-button type="primary" :icon="Setting"> Настройки фильтров </el-button>
      <el-table
        :data="tableData"
        :default-sort="defaultSort"
        @sort-change="changeSorting">
        <el-table-column prop="country_id" label="id" sortable />
        <el-table-column prop="country_title" label="Название" sortable />
        <el-table-column prop="country_area" label="Площадь" sortable />
        <el-table-column prop="country_capital" label="Столица" sortable />
      </el-table>
      <el-pagination
        :current-page="current"
        :page-size="limit"
        :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
        size="default"
        layout="total, sizes, prev, pager, next, jumper"
        :total="currentPagination.total"
        @size-change="changeLimit"
        @current-change="changeCurrentPage" />
      <!-- <el-button type="success" :icon="Plus" @click="click"> Добавить страну </el-button> -->
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { Setting, Plus } from '@element-plus/icons-vue';
import useCountryApi from '@/api/useCountryApi';
import type {
  GetListRequest,
  TCountry,
  TFilterRequest,
  TPagination,
  TSortDirection,
  TSortingRequest,
} from '@/types';
import { useLoadingDecorator } from '@/utils/useLoadingDecorator';
import { ref, defineProps, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { Sort } from 'element-plus';
import {
  changeSortLibFormatFrom,
  changeSortLibFormatTo,
} from '@/utils/changeSortLibFormat';

type TProps = {
  current: number | string;
  limit: number | string;
  direction: TSortDirection;
  by: keyof TCountry;
};

const props = withDefaults(defineProps<TProps>(), {
  current: 1,
  limit: 20,
  direction: 'asc',
  by: 'country_title',
});
const router = useRouter();
const { getCountries } = useCountryApi();

const currentPagination = ref<TPagination>(getDefaultPagination());
const currentFilter = ref<TFilterRequest[]>([]);
const tableData = ref<TCountry[]>([]);

const current = computed(() => +props.current);
const limit = computed(() => +props.limit);
const defaultSort = computed<Sort>(() =>
  changeSortLibFormatTo({
    direction: props.direction,
    by: props.by,
  }),
);

const click = () => {
  changeAddress({ by: 'country_capital', direction: 'desc' });
};

const changeAddress = (newProps: Partial<TProps>) => {
  router.push({ name: 'test-table', query: { ...props, ...newProps }, replace: true });
};

console.log('router.currentRoute', router.currentRoute.value);

const testChange = (...args: unknown[]) => {
  console.log('args', ...args);
};

const changeSorting = (sorting: Sort) =>
  changeAddress(changeSortLibFormatFrom<keyof TCountry>(sorting));

const changeLimit = (limitPage: number) => changeAddress({ limit: limitPage });

const changeCurrentPage = (currentPage: number) =>
  changeAddress({ current: currentPage });

const getPagination = (): TPagination => ({
  ...currentPagination.value,
  current: current.value,
});

const getSorting = (): TSortingRequest<keyof TCountry>[] => [
  {
    by: props.by,
    direction: props.direction,
  },
];

const onLoadData = async () => {
  const params: GetListRequest = {
    filter: currentFilter.value,
    pagination: getPagination(),
    sort: getSorting(),
  };
  let { data, pagination } = await getCountries(params);
  if (!pagination)
    pagination = {
      total: 100,
      current: 1,
      limit: 10,
    };
  currentPagination.value = pagination;
  if (!data) data = getDefaultData();
  tableData.value = data;
};

const onLoadDataDecorated = useLoadingDecorator(onLoadData);

function getDefaultPagination(): TPagination {
  return {
    total: 0,
    current: +props.current,
    limit: +props.limit,
  };
}

function getDefaultData() {
  const country: TCountry = {
    country_area: 'country_area',
    country_capital: 'string',
    country_id: 1,
    country_title: 'string',
  };

  return Array(5).fill(country);
}

watch(() => router.currentRoute.value, onLoadDataDecorated);

onMounted(onLoadDataDecorated);
</script>
