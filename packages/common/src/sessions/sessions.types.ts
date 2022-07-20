import type { UserDto } from '../users';

export interface CreateSessionRequest {
  login: string;
  password: string;
}
export type CreateSessionResponse = UserDto;

export type DeleteSessionResponse = never;
