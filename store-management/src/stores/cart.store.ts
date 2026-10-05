import toast from 'react-hot-toast';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '../types/cart';
import type { Product } from '../types/product';

type CartStore = {
  items: CartItem[];

  onAddToCart: (product: Product) => void;

  // increases one cart item's quantity by one
  onIncreaseQuantity: (id: number) => void;

  onDecreaseQuantity: (id: number) => void;

  onRemoveFromCart: (id: number) => void;

  onClearCart: () => void;

  getTotalCount: () => number;
  getTotalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      onAddToCart: (product) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          }

          return {
            items: [
              ...state.items,
              {
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                quantity: 1
              }
            ]
          };
        });

        toast.success(`${product.title} added to cart`);
      },

      onIncreaseQuantity: (id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          )
        }));
      },

      onDecreaseQuantity: (id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        }));
      },

      onRemoveFromCart: (id) => {
        const item = get().items.find((item) => item.id === id);

        set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        }));

        if (item) {
          toast.success(`${item.title} removed from cart`);
        }
      },

      onClearCart: () => {
        set({ items: [] });
        toast.success('Cart cleared');
      },

      getTotalCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      getTotalPrice: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }),
    { name: 'cart-storage' }
  )
);
