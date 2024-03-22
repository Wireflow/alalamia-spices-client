import { create } from "zustand";
import { Product } from "@prisma/client";

type CounterStore = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => {
    set((state) => ({ count: state.count + 1 }));
  },
  decrement: () => {
    set((state) => ({ count: state.count - 1 }));
  },
}));



type CartStore = {
    cart: Product[];
    setCart: (newCart: Product[]) => void;
  };
  
  export const useCart = create<CartStore>((set) => ({
    cart: [],
    setCart: (newCart) => set({ cart: newCart }),
  }));





  type AmountStore = {
    amount: number;
    setAmount: (newAmount: number) => void
  }
 
  export const useAmount = create<AmountStore>((set) => ({
    amount: 0,
    setAmount: (newAmount) => set({ amount: newAmount })
  }));


  type TotalStore = {
    total: number ;
    setTotal: (newTotal: number) => void
  }

  export const useTotal = create<TotalStore>((set) => ({
    total: 0,
    setTotal: (newTotal) => set({total: newTotal})
  }))
  