import type {
  TRegisterForm,
  TLoginForm,
  TLoginResponse,
  TEditUserForm,
  TRegisterResponse,
  TEditUserResponse,
} from '@/types';
import useBaseApi from './base/useBaseApi';
import type { GetItemResponse } from '@/types';

export default () => {
  const { get, post, put } = useBaseApi();

  const login = async (loginForm: TLoginForm) => {
    return await post<GetItemResponse<TLoginResponse>>('/auth', loginForm);
  };

  const register = async (registerForm: TRegisterForm) => {
    return await post<TRegisterResponse>('/register', registerForm);
  };

  const editUser = async (editUserForm: TEditUserForm) => {
    return await put<TEditUserResponse>('/api/v1/edit-profile', editUserForm);
  };

  const createProfile = async (editUserForm: TEditUserForm) => {
    return await post<TEditUserResponse>('/api/v1/edit-profile', editUserForm);
  };

  const getUser = async () => {
    return await get<GetItemResponse<TEditUserForm>>('/api/v1/user');
  };

  return { login, register, getUser, editUser, createProfile };
};
