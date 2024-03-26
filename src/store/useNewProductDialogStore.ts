import { create } from "zustand";

type useNewProductDialogType = {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
};

export const useNewProductDialog = create<useNewProductDialogType>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
