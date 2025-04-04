import type { TLoginResponse, TUser } from '@/types/User';
import { ref, computed } from 'vue';
import { jwtDecode } from 'jwt-decode';

export const USER_PROVIDE_SYMBOL = Symbol('user');
const TOKEN_STORAGE = 'jwt';

export default () => {
  const user = ref<TUser | null>(null);

  const token = computed<string | null>(() => user.value?.token ?? null);

  const setUser = (newUser: TUser | null) => {
    user.value = newUser;

    if (newUser) sessionStorage.setItem(TOKEN_STORAGE, newUser.token);
    else sessionStorage.removeItem(TOKEN_STORAGE);
  };

  const authUser = (loginResponse: TLoginResponse) => {
    const jwtDecoded = jwtDecode<Omit<TUser, 'token'>>(loginResponse.token);
    setUser({ ...jwtDecoded, token: loginResponse.token });
  };

  const logout = () => setUser(null);

  (() => {
    const token = sessionStorage.getItem(TOKEN_STORAGE);
    if (token) authUser({ token });
  })();

  return { user, token: token, authUser, logout };
};
