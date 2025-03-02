export type User = {
  app_id: number;
  email: string;
  exp: number;
  uid: number;
  token: string;
};

export type TLoginForm = {
  password: string;
  email: string;
};

export type TLoginResponse = {
  token: string;
};
