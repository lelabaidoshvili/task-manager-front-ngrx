import { UsersResponse } from './users.interface';

export interface Register {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: UsersResponse;
  token: Token;
}

export interface Token {
  expiresIn: number;
  accessToken: string;
  refreshToken: string;
}
