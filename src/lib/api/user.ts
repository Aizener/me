import { requestPost } from '../request';

export type LoginUser = {
  id: string;
  email: string;
  role: string;
  name: string;
  username: string;
  password: string;
};

export const userLogin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const res = await requestPost<LoginUser>('/api/user/login', {
    username,
    password,
  });
  return res;
};
