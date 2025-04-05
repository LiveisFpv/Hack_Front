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
      label="Имя"
      prop="firstName"
      :rules="[
        {
          required: true,
          message: 'Пожалуйста, введите имя',
          trigger: 'blur',
        },
      ]">
      <el-input v-model="dynamicValidateForm.user_firstName" />
    </el-form-item>
    <el-form-item
      label="Фамилия"
      prop="lastName"
      :rules="[
        {
          required: true,
          message: 'Пожалуйста, введите фамилию',
          trigger: 'blur',
        },
      ]">
      <el-input v-model="dynamicValidateForm.user_lastName" />
    </el-form-item>
    <el-form-item label="Отчество" prop="middleName" :rules="[]">
      <el-input v-model="dynamicValidateForm.user_middleName" />
    </el-form-item>
    <el-form-item
      label="Дата рождения"
      prop="birthday"
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
      prop="height"
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
      prop="weight"
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
      prop="fitness_target"
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

    <el-form-item label="Пол" prop="sex" :rules="[]" @click="toggleSex">
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
      <div class="buttonContainerId"></div>
    </el-footer>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, inject, onMounted, watch } from 'vue';
import { Male, Female } from '@element-plus/icons-vue';
import type { FormInstance } from 'element-plus';
import type { TEditUserForm, TRegisterForm } from '@/types/User';
import useUserApi from '@/api/useUserApi';
import useAuthStore, { USER_PROVIDE_SYMBOL } from '@/store/useAuthStore';
import { useLoadingDecorator } from '@/utils/useLoadingDecorator';
import { getUserLevelList } from './getUserLevelList';
import { getFitnessTargetList } from './getFitnessTargetList';

const emit = defineEmits({ 'toggle-form': null, close: null });

const { login, register, editUser } = useUserApi();
const { authUser, user } = inject<ReturnType<typeof useAuthStore>>(USER_PROVIDE_SYMBOL)!;

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

watch(
  () => dynamicValidateForm.user_level,
  () => {
    console.log('dynamicValidateForm.user_level', dynamicValidateForm.user_level);
  },
);

const toggleSex = () => {
  dynamicValidateForm.user_sex = !dynamicValidateForm.user_sex;
};

const submit = async () => {
  const { data } = await register(dynamicValidateForm);
  console.log('register data', data);
  const loginResponse = await login({
    email: dynamicValidateForm.email,
    password: dynamicValidateForm.password,
  });
  console.log('loginResponse', loginResponse);
  authUser(loginResponse.data);
  console.log('user', user.value?.uid);
  const { data: editData } = await editUser({
    ...dynamicValidateForm,
  });
  console.log('editData', editData);

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

onMounted(() => {
  (
    window as typeof window & {
      YaAuthSuggest: {
        init: (...args: unknown[]) => Promise<{ handler: () => unknown }>;
      };
    }
  ).YaAuthSuggest.init(
    {
      client_id: 'bc1e55c07b414058ab0ce164c4d45d0c',
      response_type: 'token',
    },
    {
      view: 'button',
      parentId: 'buttonContainerId',
      buttonSize: 'm',
      buttonView: 'main',
      buttonTheme: 'light',
      buttonBorderRadius: '0',
      buttonIcon: 'ya',
    },
  )
    .then(({ handler }) => handler())
    .then((data) => console.log('Сообщение с токеном', data))
    .catch((error) => console.log('Обработка ошибки', error));
});
</script>

<style lang="scss" scoped>
.hidden {
  display: none;
}
</style>
