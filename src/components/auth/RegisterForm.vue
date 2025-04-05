<template>
  <el-form
    ref="formRef"
    :model="dynamicValidateForm"
    label-width="auto"
    class="demo-dynamic">
    <h2 class="text-center">Регистрация</h2>
    <el-form-item
      prop="email"
      label="Почта"
      :rules="[
        {
          required: true,
          message: 'Пожалуйста, введите адрес электронной почты',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: 'Пожалуйста, введите корректный адрес электронной почты',
          trigger: ['blur', 'change'],
        },
      ]">
      <el-input v-model="dynamicValidateForm.email" />
    </el-form-item>
    <el-form-item
      label="Пароль"
      prop="password"
      :rules="[
        {
          required: true,
          message: 'Пожалуйста, введите пароль для учетной записи',
          trigger: 'blur',
        },
      ]">
      <el-input
        v-model="dynamicValidateForm.password"
        type="password"
        autocomplete="off" />
    </el-form-item>
    <el-form-item
      label="Фамилия"
      prop="user_lastName"
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
      <el-input-number v-model="dynamicValidateForm.user_height" :max="300" :min="50" />
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
      <el-select v-model="dynamicValidateForm.user_fitness_target" placeholder="Выбрать">
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
      <el-button type="primary" @click="submitForm(formRef)">
        Зарегистрироваться
      </el-button>
      <el-button @click="resetForm(formRef)">Очистить</el-button>
    </el-form-item>
    <el-footer class="text-center">
      <slot name="footer"></slot>
    </el-footer>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, inject } from 'vue';
import { Male, Female } from '@element-plus/icons-vue';
import { ElNotification, type FormInstance } from 'element-plus';
import type { TEditUserForm, TRegisterForm } from '@/types/User';
import useUserApi from '@/api/useUserApi';
import useAuthStore, { USER_PROVIDE_SYMBOL } from '@/store/useAuthStore';
import { useLoadingDecorator } from '@/utils/useLoadingDecorator';
import { getUserLevelList } from './getUserLevelList';
import { getFitnessTargetList } from './getFitnessTargetList';

const emit = defineEmits({ 'toggle-form': null, close: null });

const { login, register, editUser, getUser } = useUserApi();
const { authUser, setProfile, user } =
  inject<ReturnType<typeof useAuthStore>>(USER_PROVIDE_SYMBOL)!;

const userLevelList = getUserLevelList();
const fitnessTargetList = getFitnessTargetList();

const formRef = ref<FormInstance>();
const dynamicValidateForm = reactive<TRegisterForm & TEditUserForm>({
  password: '',
  email: '',
  user_firstName: '',
  user_lastName: '',
  user_middleName: '',
  user_birthday: '',
  user_height: undefined,
  user_weight: undefined,
  user_fitness_target: '',
  user_sex: false,
  user_level: '',
});

const toggleSex = () => {
  dynamicValidateForm.user_sex = !dynamicValidateForm.user_sex;
};

const submit = async () => {
  const { data: registerData } = await register(dynamicValidateForm);
  if (!registerData) return;

  const loginResponse = await login({
    email: dynamicValidateForm.email,
    password: dynamicValidateForm.password,
  });
  console.log('loginResponse', loginResponse);
  authUser(loginResponse.data);
  console.log('user', user.value?.uid);
  await editUser(dynamicValidateForm);
  try {
    const { data: profileData } = await getUser();
    setProfile(profileData);
  } catch (e) {
    setProfile({
      user_firstName: '',
      user_lastName: '',
      user_middleName: '',
      user_birthday: '',
      user_height: undefined,
      user_weight: undefined,
      user_fitness_target: '',
      user_sex: false,
      user_level: '',
    });
  }

  ElNotification({
    title: 'Регистрация',
    message: 'Пользователь успешно зарегистрирован!',
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

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const close = () => emit('close');
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}
</style>
