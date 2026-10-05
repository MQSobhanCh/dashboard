export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  sku: string;
  thumbnail: string;
  images: string[];
}

export interface ProductForm {
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  brand?: string;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}
