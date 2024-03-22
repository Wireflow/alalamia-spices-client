import { Member } from "@prisma/client";
import { create } from "zustand";

type useMembersStoreType = {
  search: string;
  setSearch: (newSearch: string) => void;
  members: Member[];
  setMembers: (members: Member[]) => void;
  setFilteredMembers: (members: Member[]) => void;
  filteredMembers: Member[];
  filterMembers: () => void;
};

export const useMembersStore = create<useMembersStoreType>((set, get) => ({
  search: "",
  setSearch: (newSearch) => set({ search: newSearch }),
  members: [],
  setMembers: (members) => set({ members: members }),
  filteredMembers: [],
  setFilteredMembers: (members) => set({ members: members }),
  filterMembers: () => {
    const search = get().search.toLowerCase();
    const filteredMembers = get().members.filter(
      (member) =>
        member.name.toLowerCase().includes(search) ||
        member.address.toLowerCase().includes(search) ||
        member.phoneNumber.toLowerCase().includes(search)
    );

    const searchDelay = setTimeout(() => {
      set({ filteredMembers });
    }, 1500);

    return () => clearTimeout(searchDelay);
  },
}));
