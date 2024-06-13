import { create } from "zustand"

const confirmBuyStore = create((set) => ({
    confirmBuy: false,
    editConfirmBuy: (st) => set({ confirmBuy: st })
}))

export default confirmBuyStore