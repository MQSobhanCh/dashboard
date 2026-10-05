import { DUMMY_BASE_URL } from "../constants";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type ApiConfig = {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
};

export const apiRequest = async <TResponse>(
  endpoint: string,
  config: ApiConfig = {}
): Promise<TResponse> => {
  const { method = 'GET', body, headers } = config;

  let response: Response;

  try {
    response = await fetch(`${DUMMY_BASE_URL}${endpoint}`, {
      method,
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined
    });
  } catch {

    throw new Error('Network error: could not reach the server. Check your internet connection.');
  }

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};
