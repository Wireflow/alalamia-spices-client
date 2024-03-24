import { create } from "zustand";
import { Product } from "@prisma/client";

type CartStore = {
  cart: Product[];
  setCart: (newCart: Product[]) => void;
  clearCart: () => void;
  addItemToCart: (product: Product) => void;
  removeItemFromCart: (product: Product) => void;
  updateItemQuantity: (product: Product, quantity: number) => void;
  isProductInCart: (productId: string) => boolean;
};

export const useCart = create<CartStore>((set, get) => ({
  cart: [],
  setCart: (newCart) => set({ cart: newCart }),

  clearCart: () => set({ cart: [] }),

  addItemToCart: (product) => {
    const newItem = { ...product, quantity: 1 };

    const cartItem = get().cart.find((item) => item.id === product.id);
    if (cartItem) {
      const newCart = get().cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 0) + 1 }
          : item
      );
      get().setCart(newCart);
    } else {
      get().setCart([...get().cart, newItem]);
    }
  },

  removeItemFromCart: (product) => {
    const updatedCart = get().cart.filter((item) => item.id !== product.id);
    get().setCart(updatedCart);
  },

  updateItemQuantity: (product, quantity) => {
    if (quantity === 0) {
      return get().removeItemFromCart(product);
    }
    const updatedCart = get().cart.map((item) =>
      item.id === product.id ? { ...item, quantity } : item
    );

    get().setCart(updatedCart);
  },

  isProductInCart: (productId) => {
    return get().cart.some((item) => item.id === productId);
  },
}));

type AmountStore = {
  amount: number;
  setAmount: (newAmount: number) => void;
};

export const useAmount = create<AmountStore>((set) => ({
  amount: 0,
  setAmount: (newAmount) => set({ amount: newAmount }),
}));

type TotalStore = {
  total: number;
  setTotal: (newTotal: number) => void;
};

export const useTotal = create<TotalStore>((set) => ({
  total: 0,
  setTotal: (newTotal) => set({ total: newTotal }),
}));
