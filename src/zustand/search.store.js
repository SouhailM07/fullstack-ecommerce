import { create } from "zustand"

const searchStore = create((set) => ({
    searchText: "",
    searchToggle: false,
    editSearchText: (st) => set({ searchText: st }),
    editSearchToggle: (st) => set({ searchToggle: st })
}))

export default searchStore