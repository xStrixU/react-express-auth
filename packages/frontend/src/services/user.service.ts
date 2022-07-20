import { axiosWrapper } from '../lib/axios';

import type {
  CreateUserRequest,
  CreateUserResponse,
  GetAuthenticatedUserResponse,
} from '@react-express-auth/common';

export const createUser = async (requestData: CreateUserRequest) => {
  const { data } = await axiosWrapper.post<
    typeof requestData,
    CreateUserResponse
  >('/users', requestData);

  return data;
};

export const getAuthenticatedUser = async () => {
  const { data } = await axiosWrapper.get<GetAuthenticatedUserResponse>(
    '/users/me'
  );

  return data;
};
