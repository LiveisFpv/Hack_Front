<template>
  <section class="training-plan">
    <div class="container">
      <h2 class="training-plan__title">План тренировок</h2>

      <el-table
        :data="commonTableData"
        dark
        style="
          width: 100%;
          --el-table-bg-color: transparent;
          --el-table-tr-bg-color: transparent;
          --el-table-header-bg-color: transparent;
          --el-table-header-text-color: white;
        ">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>

    <div class="training-plan__orange-block"></div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

Intl.DateTimeFormat().format(new Date());
const commonTableData = computed(() => [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]);
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
