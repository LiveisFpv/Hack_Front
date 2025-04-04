<template>
  <el-form
    ref="formRef"
    :model="dynamicValidateForm"
    label-width="auto"
    class="demo-dynamic">
    <h2 class="text-center">Регистрация</h2>
    <el-form-item
      prop="email"
      label="Email"
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
      label="Password"
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
import { ElLoading, type FormInstance } from 'element-plus';
import type { TRegisterForm } from '@/types/User';
import useUserApi from '@/api/useUserApi';
import useAuthStore, { USER_PROVIDE_SYMBOL } from '@/store/useAuthStore';
import { useLoadingDecorator } from '@/utils/useLoadingDecorator';

const emit = defineEmits({ 'toggle-form': null, close: null });

const { login, register } = useUserApi();
const { authUser } = inject<ReturnType<typeof useAuthStore>>(USER_PROVIDE_SYMBOL)!;

const formRef = ref<FormInstance>();
const dynamicValidateForm = reactive<TRegisterForm>({
  password: '',
  email: '',
});

const submit = async () => {
  await register(dynamicValidateForm);
  const loginResponse = await login({
    email: dynamicValidateForm.email,
    password: dynamicValidateForm.password,
  });
  authUser(loginResponse.data);
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
