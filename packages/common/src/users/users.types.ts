import type { UserRoleName } from '@prisma/client';

export interface UserDto {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  roles: UserRoleName[];
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}
export type CreateUserResponse = UserDto;

export type GetAuthenticatedUserResponse = UserDto;
