import { apiRequest } from "./api";
import type { User } from "../types/user";

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

// get users list (used as "Customers")
export const getUsersApi = (): Promise<UsersResponse> => {
  return apiRequest<UsersResponse>('/users?limit=20');
};

// get single user details
export const getUserApi = (id: number): Promise<User> => {
  return apiRequest<User>(`/users/${id}`);
};

// get the currently logged-in user (reads the token from sessionStorage)
export const getMeApi = (): Promise<User> => {
  return apiRequest<User>('/auth/me', {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
  });
};
