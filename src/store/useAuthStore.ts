import type { TLoginResponse, User } from '@/types/User';
import { ref, computed } from 'vue';
import { jwtDecode } from 'jwt-decode';

export const USER_PROVIDE_SYMBOL = Symbol('user');
const TOKEN_STORAGE = 'jwt';

export default () => {
  const user = ref<User | null>(null);

  const token = computed<string | null>(() => user.value?.token ?? null);

  const setUser = (newUser: User | null) => {
    user.value = newUser;

    if (newUser) sessionStorage.setItem(TOKEN_STORAGE, newUser.token);
    else sessionStorage.removeItem(TOKEN_STORAGE);
  };

  const authUser = (loginResponse: TLoginResponse) => {
    const jwtDecoded = jwtDecode<Omit<User, 'token'>>(loginResponse.token);
    console.log('jwtDecoded', jwtDecoded);
    setUser({ ...jwtDecoded, token: loginResponse.token });
  };

  (() => {
    const token = sessionStorage.getItem(TOKEN_STORAGE);
    if (token) authUser({ token });
  })();

  return { user, token: token, authUser };
};
