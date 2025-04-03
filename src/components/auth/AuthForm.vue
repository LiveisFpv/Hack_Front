<template>
  <el-form
    ref="formRef"
    :model="dynamicValidateForm"
    label-width="auto"
    label="1111"
    class="demo-dynamic">
    <h2 class="text-center">Вход</h2>
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
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)">Войти</el-button>
      <el-button @click="resetForm(formRef)">Очистить</el-button>
    </el-form-item>
    <el-footer class="text-center">
      <slot name="footer"></slot>
    </el-footer>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, inject, defineEmits } from 'vue';
import { type FormInstance } from 'element-plus';
import type { TLoginForm } from '@/types/User';
import useUserApi from '@/api/useUserApi';
import useAuthStore, { USER_PROVIDE_SYMBOL } from '@/store/useAuthStore';
import { useLoadingDecorator } from '@/utils/useLoadingDecorator';

const emit = defineEmits({ 'toggle-form': null, close: null });

const { login } = useUserApi();
const { authUser } = inject<ReturnType<typeof useAuthStore>>(USER_PROVIDE_SYMBOL)!;

const formRef = ref<FormInstance>();
const dynamicValidateForm = reactive<TLoginForm>({
  password: '',
  email: '',
});

const submit = async () => {
  const loginResponse = await login(dynamicValidateForm);
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
