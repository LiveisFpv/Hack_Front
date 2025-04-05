import type { TEditUserForm, TLoginResponse, TUser } from '@/types/User';
import { ref, computed } from 'vue';
import { jwtDecode } from 'jwt-decode';

export const USER_PROVIDE_SYMBOL = Symbol('user');
const TOKEN_STORAGE = 'jwt';

export default () => {
  const user = ref<TUser | null>(null);
  const profile = ref<TEditUserForm | null>(null);

  const token = computed<string | null>(() => user.value?.token ?? null);

  const setUser = async (newUser: TUser | null) => {
    user.value = newUser;

    if (newUser) sessionStorage.setItem(TOKEN_STORAGE, newUser.token);
    else sessionStorage.removeItem(TOKEN_STORAGE);
  };

  const setProfile = async (newProfile: TEditUserForm | null) => {
    profile.value = {
      user_firstName: newProfile?.user_firstName ?? '',
      user_lastName: newProfile?.user_lastName ?? '',
      user_middleName: newProfile?.user_middleName ?? '',
      user_birthday: newProfile?.user_birthday ? new Date(newProfile.user_birthday) : '',
      user_height: newProfile?.user_height ?? undefined,
      user_weight: newProfile?.user_weight ?? undefined,
      user_fitness_target: newProfile?.user_fitness_target ?? '',
      user_sex: newProfile?.user_sex ?? false,
      user_level: newProfile?.user_level ?? '',
    };
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

  return { user, token, profile, authUser, logout, setProfile };
};
