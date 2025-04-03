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

export type TLoginForm = {
  password: string;
  email: string;
};

export type TLoginResponse = {
  token: string;
};
