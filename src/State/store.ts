import { PaymentMethodsType } from "@/constants/cart";
import { PurchasedProductType } from "@/types/transaction";
import { Product } from "@prisma/client";
import { create } from "zustand";

type CartStoreType = {
  cart: PurchasedProductType[];
  memberId: string;
  setMember: (memberId: string) => void;
  setCart: (newCart: PurchasedProductType[]) => void;
  clearCart: () => void;
  addItemToCart: (product: Product) => void;
  removeItemFromCart: (product: PurchasedProductType) => void;
  updateItemQuantity: (product: PurchasedProductType, quantity: number) => void;
  isProductInCart: (productId: string) => boolean;
  selectedPaymentMethod: PaymentMethodsType;
  setSelectedPaymentMethod: (selectedPaymentMethod: PaymentMethodsType) => void;
};

export const useCart = create<CartStoreType>((set, get) => ({
  cart: [],
  setCart: (newCart) => set({ cart: newCart }),
  clearCart: () => set({ cart: [] }),
  addItemToCart: (product) => {
    const purchasedProduct: PurchasedProductType = {
      name: product.name,
      price: product.price,
      productId: product.id,
      purchaseQuantity: 1,
    };

    const cartItem = get().cart.find(
      (item) => item.productId === purchasedProduct.productId
    );

    if (cartItem) {
      const newCart = get().cart.map((item) =>
        item.productId === purchasedProduct.productId
          ? { ...item, purchaseQuantity: (item.purchaseQuantity || 0) + 1 }
          : item
      );

      set({ cart: newCart });
    } else {
      set({ cart: [...get().cart, purchasedProduct] });
    }
  },
  removeItemFromCart: (product) => {
    const updatedCart = get().cart.filter(
      (item) => item.productId !== product.productId
    );
    set({ cart: updatedCart });
  },
  updateItemQuantity: (product, quantity) => {
    if (quantity === 0) {
      return get().removeItemFromCart(product);
    }
    const updatedCart = get().cart.map((item) =>
      item.productId === product.productId
        ? { ...item, purchaseQuantity: quantity }
        : item
    );

    set({ cart: updatedCart });
  },

  isProductInCart: (productId) => {
    return get().cart.some((item) => item.productId === productId);
  },

  selectedPaymentMethod: "CASH",
  setSelectedPaymentMethod: (selectedPaymentMethod) =>
    set({ selectedPaymentMethod }),

  memberId: "",
  setMember: (memberId) => set({ memberId }),
}));
