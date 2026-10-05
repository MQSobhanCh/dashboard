import { apiRequest } from "./api";
import type { Order, OrdersResponse } from "../types/order";

// get orders list
export const getOrdersApi = (): Promise<OrdersResponse> => {
  return apiRequest<OrdersResponse>('/carts');
};

// get order details
export const getOrderApi = (id: number): Promise<Order> => {
  return apiRequest<Order>(`/carts/${id}`);
};
