// store/useProductStore.ts
import { create } from "zustand";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductStore {
  products: Product[];
  product: Product | null;
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  product: null,

  fetchProducts: async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      set({ products: data });
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  },

  fetchProductById: async (id: number) => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      set({ product: data });
    } catch (error) {
      console.error("Failed to fetch product", error);
    }
  },
}));
