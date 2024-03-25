import { SearchOptions } from "@/constants/cart";
import { create } from "zustand";

type useSelectMemberStoreType = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;

  searchType: SearchOptions;
  setSearchType: (searchType: SearchOptions) => void;
  isDialogOpen: boolean;
  setDialogOpen: (isDialogOpen: boolean) => void;
};

export const useSelectMemberStore = create<useSelectMemberStoreType>((set) => ({
  searchTerm: "",
  searchType: "address",
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSearchType: (searchType) => set({ searchType }),
  isDialogOpen: false,
  setDialogOpen: (isDialogOpen) => set({ isDialogOpen }),
}));
