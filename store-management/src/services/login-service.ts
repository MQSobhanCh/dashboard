import { apiRequest } from "./api";
import type { LoginFormData } from "../pages/login";
import type { LoginResponse } from "../types/general";

export const loginApi = (loginData: LoginFormData): Promise<LoginResponse> => {
  return apiRequest<LoginResponse>('/auth/login', { method: 'POST', body: loginData });
};
