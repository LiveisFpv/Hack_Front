import type { TResponse } from './common';

export type TUser = {
  app_id: number;
  email: string;
  exp: number;
  uid: number;
  token: string;
};

export type TRegisterForm = {
  password: string;
  email: string;
};

export type TRegisterResponse = TResponse<unknown>;

export type TEditUserResponse = TResponse<unknown>;

export type TEditUserForm = {
  user_firstName: string;
  user_lastName: string;
  user_middleName: string;
  user_birthday: Date | string;
  user_height?: number;
  user_weight?: number;
  user_fitness_target: string;
  user_sex: boolean;
  user_level: '' | number;
};

export type TLoginForm = {
  password: string;
  email: string;
};

export type TLoginResponse = {
  token: string;
};
