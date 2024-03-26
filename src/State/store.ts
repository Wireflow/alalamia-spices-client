import { PaymentMethodsType } from "@/constants/cart";
import { PurchasedProductType } from "@/types/transaction";
import { Member, Product } from "@prisma/client";
import { create } from "zustand";

type CartStoreType = {
  cart: PurchasedProductType[];
  memberId: string;
  member: Member | null;
  getTotal: () => number;
  getTotalQuantity: () => number;
  setMember: (member: Member) => void;
  clearMember: () => void;
  setCart: (newCart: PurchasedProductType[]) => void;
  resetCart: () => void;
  addItemToCart: (product: Product, allProducts: Product[]) => void;
  increaseProductQuantity: (
    product: PurchasedProductType,
    allProducts: Product[]
  ) => void;
  decreaseProductQuantity: (product: PurchasedProductType) => void;
  removeItemFromCart: (product: PurchasedProductType) => void;
  updateItemQuantity: (product: PurchasedProductType, quantity: number) => void;
  isProductInCart: (productId: string) => boolean;
  selectedPaymentMethod: PaymentMethodsType;
  setSelectedPaymentMethod: (selectedPaymentMethod: PaymentMethodsType) => void;
  isCheckingOut: boolean;
  setIsCheckingOut: (isCheckingOut: boolean) => void;
};

export const useCart = create<CartStoreType>((set, get) => ({
  cart: [],
  setCart: (newCart) => set({ cart: newCart }),
  getTotal: () => {
    return get().cart.reduce(
      (total, product) =>
        total + (product.price || 0) * (product.purchaseQuantity || 0),
      0
    );
  },
  getTotalQuantity: () => {
    return get().cart.reduce(
      (total, product) => total + (product.purchaseQuantity || 0),
      0
    );
  },
  resetCart: () => set({ cart: [], member: null, memberId: "" }),

  isCheckingOut: false,

  setIsCheckingOut: (isCheckingOut) =>
    set({
      isCheckingOut,
    }),

  addItemToCart: (product, allProducts) => {
    const productQuantity = (product.boxQuantity && product.boxQuantity) || 0;

    if (productQuantity < 1) return;

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
      get().increaseProductQuantity(cartItem, allProducts);
    } else {
      set({ cart: [...get().cart, purchasedProduct] });
    }
  },
  increaseProductQuantity: (productToUpdate, allProducts) => {
    const defaultProduct =
      allProducts &&
      allProducts.find((p) => p.id === productToUpdate.productId);

    if (!defaultProduct) return;

    const productQuantity = defaultProduct.boxQuantity
      ? defaultProduct.boxQuantity
      : 0;

    if (productToUpdate.purchaseQuantity < productQuantity) {
      const updatedCart = get().cart.map((item) =>
        item.productId === productToUpdate.productId
          ? { ...item, purchaseQuantity: item.purchaseQuantity + 1 }
          : item
      );

      set({ cart: updatedCart });
    }
  },

  decreaseProductQuantity: (productToUpdate) => {
    if (productToUpdate.purchaseQuantity === 1) {
      return;
    }

    const updatedCart = get().cart.map((item) =>
      item.productId === productToUpdate.productId
        ? { ...item, purchaseQuantity: item.purchaseQuantity - 1 }
        : item
    );

    set({ cart: updatedCart });
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
  member: null,
  setMember: (member) => set({ memberId: member.id, member }),
  clearMember: () => set({ member: null }),
}));
