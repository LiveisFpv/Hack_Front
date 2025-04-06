<template>
  <section class="profile">
    <div class="container">
      <h2 class="profile__title">Профиль пользователя</h2>

      <el-form
        ref="formRef"
        :model="dynamicValidateForm"
        label-width="auto"
        style="--el-text-color-regular: white"
        class="demo-dynamic">
        <el-form-item
          label="Фамилия"
          prop="user_lastName"
          colo
          :rules="[
            {
              required: true,
              message: 'Пожалуйста, введите фамилию',
              trigger: 'blur',
            },
          ]">
          <el-input v-model="dynamicValidateForm.user_lastName" />
        </el-form-item>
        <el-form-item
          label="Имя"
          prop="user_firstName"
          :rules="[
            {
              required: true,
              message: 'Пожалуйста, введите имя',
              trigger: 'blur',
            },
          ]">
          <el-input v-model="dynamicValidateForm.user_firstName" />
        </el-form-item>
        <el-form-item label="Отчество" prop="user_middleName" :rules="[]">
          <el-input v-model="dynamicValidateForm.user_middleName" />
        </el-form-item>
        <el-form-item
          label="Дата рождения"
          prop="user_birthday"
          :rules="[
            {
              required: true,
              message: 'Пожалуйста, введите дату рождения',
              trigger: 'blur',
            },
          ]">
          <el-date-picker v-model="dynamicValidateForm.user_birthday" type="date" />
        </el-form-item>

        <el-form-item
          label="Рост (см)"
          prop="user_height"
          :rules="[
            {
              required: true,
              message: 'Пожалуйста, введите рост',
              trigger: 'blur',
            },
          ]">
          <el-input-number
            v-model="dynamicValidateForm.user_height"
            :max="300"
            :min="50" />
        </el-form-item>

        <el-form-item
          label="Вес (кг)"
          prop="user_weight"
          :rules="[
            {
              required: true,
              message: 'Пожалуйста, введите вес',
              trigger: 'blur',
            },
          ]">
          <el-input-number
            v-model="dynamicValidateForm.user_weight"
            :precision="2"
            :step="0.1"
            :max="300"
            :min="20" />
        </el-form-item>

        <el-form-item
          label="Уровень подготовки"
          prop="user_level"
          :rules="[
            {
              required: true,
              message: 'Пожалуйста, введите уровень подготовки',
              trigger: 'blur',
            },
          ]">
          <el-select v-model="dynamicValidateForm.user_level" placeholder="Выбрать">
            <el-option
              v-for="item in userLevelList"
              :key="item.id"
              :label="item.title"
              :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item
          label="Цель тренировок"
          prop="user_fitness_target"
          :rules="[
            {
              required: true,
              message: 'Пожалуйста, введите цель тренировок',
              trigger: 'blur',
            },
          ]">
          <el-select
            v-model="dynamicValidateForm.user_fitness_target"
            placeholder="Выбрать">
            <el-option
              v-for="item in fitnessTargetList"
              :key="item.id"
              :label="item.title"
              :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="Пол" prop="user_sex" :rules="[]" @click="toggleSex">
          <el-switch v-model="dynamicValidateForm.user_sex" class="hidden" />
          {{ dynamicValidateForm.user_sex ? 'Мужской' : 'Женский' }}
          <el-icon :size="20">
            <male v-if="dynamicValidateForm.user_sex" />
            <female v-else />
          </el-icon>
        </el-form-item>

        <el-form-item label-position="left">
          <el-button type="primary" @click="submitForm(formRef)"> Изменить </el-button>
          <el-button style="--el-text-color-regular: black" @click="resetForm"
            >Очистить</el-button
          >
        </el-form-item>
        <el-footer class="text-center">
          <slot name="footer"></slot>
        </el-footer>
      </el-form>
    </div>

    <div class="profile__orange-block"></div>
  </section>
</template>

<script lang="ts" setup>
import { ElNotification, type FormInstance } from 'element-plus';
import { getFitnessTargetList } from './getFitnessTargetList';
import { getUserLevelList } from './getUserLevelList';
import { ref, inject } from 'vue';
import type { TEditUserForm } from '@/types';
import type useAuthStore from '@/store/useAuthStore';
import { USER_PROVIDE_SYMBOL } from '@/store/useAuthStore';
import { useRouter } from 'vue-router';
import { useLoadingDecorator } from '@/utils/useLoadingDecorator';
import useUserApi from '@/api/useUserApi';

const userLevelList = getUserLevelList();
const fitnessTargetList = getFitnessTargetList();
const { profile, setProfile } =
  inject<ReturnType<typeof useAuthStore>>(USER_PROVIDE_SYMBOL)!;
const router = useRouter();
const { editUser, getUser } = useUserApi();

// if (!profile.value) router.push({ name: 'home' });

const formRef = ref<FormInstance>();
const dynamicValidateForm = ref<TEditUserForm>({ ...profile.value! });

const toggleSex = () => {
  dynamicValidateForm.value.user_sex = !dynamicValidateForm.value.user_sex;
};

const submit = async () => {
  await editUser(dynamicValidateForm.value);
  const { data: profileData } = await getUser();
  setProfile(profileData);

  ElNotification({
    title: 'Изменение профиля',
    message: 'Профиль успешно изменен!',
    type: 'success',
  });

  close();
};

const submitDecorated = useLoadingDecorator(submit);

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) await submitDecorated();
  });
};

const resetForm = () => {
  dynamicValidateForm.value = { ...profile.value! };
};
</script>

<style lang="scss" scoped>
.profile {
  position: relative;

  .container {
    margin: 0 auto;
    max-width: 720px;
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

.hidden {
  display: none;
}
</style>
