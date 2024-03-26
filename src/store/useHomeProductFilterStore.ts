import { Product } from "@prisma/client";
import { create } from "zustand";

type useHomeProductFilterType = {
  search: string | null;
  setSearch: (newSearch: string) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  setFilteredProducts: (products: Product[]) => void;
  filteredProducts: Product[];
  filterProducts: () => void;
};

export const useHomeProductFilter = create<useHomeProductFilterType>(
  (set, get) => ({
    search: null,
    setSearch: (newSearch) => set({ search: newSearch }),
    products: [],
    setProducts: (products) => set({ products }),
    filteredProducts: [],
    setFilteredProducts: (products) => set({ filteredProducts: products }),
    filterProducts: () => {
      const search = get().search?.toLowerCase();
      const filteredProducts = get().products.filter((product) =>
        product.name.toLowerCase().includes(search!)
      );

      set({ filteredProducts });
    },
  })
);
