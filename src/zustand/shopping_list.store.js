import { create } from "zustand";

const shoppingListStore = create((set) => ({
  shoppingList: [],
  editShoppingList: (st) => set({ shoppingList: st }),
}));

export default shoppingListStore;
