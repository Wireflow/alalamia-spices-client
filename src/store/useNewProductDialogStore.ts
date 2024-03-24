import { create } from "zustand";

type useNewProductDialogType = {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
};

export const useNewProductDialog = create<useNewProductDialogType>(
  (set, get) => ({
    open: false,
    setOpen: (isOpen) => undefined,
  })
);
