import { apiRequest } from "./api";
import type { Category, Product, ProductForm, ProductsResponse } from "../types/product";

export type ProductsQuery = {
  search?: string;
  category?: string;
  sortBy?: 'title' | 'price' | 'rating' | 'stock';
  order?: 'asc' | 'desc';
  skip?: number;
  limit?: number;
};

// get products list (search, category filter, sort, pagination)
export const getProductsApi = (query: ProductsQuery = {}): Promise<ProductsResponse> => {
  const { search, category, sortBy, order, skip = 0, limit = 12 } = query;

  let endpoint = '/products';

  if (search) {
    endpoint = `/products/search?q=${encodeURIComponent(search)}`;
  } else if (category) {
    endpoint = `/products/category/${encodeURIComponent(category)}`;
  }

  const params = new URLSearchParams();
  params.set('skip', String(skip));
  params.set('limit', String(limit));
  if (sortBy) {
    params.set('sortBy', sortBy);
    params.set('order', order ?? 'asc');
  }

  const separator = endpoint.includes('?') ? '&' : '?';

  return apiRequest<ProductsResponse>(`${endpoint}${separator}${params.toString()}`);
};

// get product details
export const getProductApi = (id: number): Promise<Product> => {
  return apiRequest<Product>(`/products/${id}`);
};

// get categories list
export const getCategoriesApi = (): Promise<Category[]> => {
  return apiRequest<Category[]>('/products/categories');
};

// get product count for a single category (used on Categories page)
export const getCategoryProductCountApi = async (category: string): Promise<number> => {
  const data = await apiRequest<ProductsResponse>(`/products/category/${encodeURIComponent(category)}?limit=1`);
  return data.total;
};

// create a product
export const createProductApi = (product: ProductForm): Promise<Product> => {
  return apiRequest<Product>('/products/add', { method: 'POST', body: product });
};

// update a product
export const updateProductApi = (id: number, product: ProductForm): Promise<Product> => {
  return apiRequest<Product>(`/products/${id}`, { method: 'PUT', body: product });
};

// delete a product
export const deleteProductApi = (id: number): Promise<Product> => {
  return apiRequest<Product>(`/products/${id}`, { method: 'DELETE' });
};
