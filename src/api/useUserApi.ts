import type { TLoginForm, TLoginResponse } from '@/types/User';
import useBaseApi from './base/useBaseApi';
import type { GetItemResponse } from '@/types';

export default () => {
  const { get, post } = useBaseApi();

  const login = async (loginForm: TLoginForm) => {
    return await post<GetItemResponse<TLoginResponse>>('/auth', loginForm);
  };

  const getUser = async () => {
    return await get('/user');
  };

  return { login, getUser };
};
