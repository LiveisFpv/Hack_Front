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
  uid?: number;
  firstName: string;
  lastName: string;
  middleName: string;
  birthday: Date | string;
  height?: number;
  weight?: number;
  fitness_target: null;
  sex: boolean;
  hypertain: boolean;
  diabet: boolean;
};

export type TLoginForm = {
  password: string;
  email: string;
};

export type TLoginResponse = {
  token: string;
};
