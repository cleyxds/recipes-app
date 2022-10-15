import create from "zustand"

import { colors } from "../utils"

export const useStatusBarStatusStore = create(set => ({
  color: colors.BLACK_I,
  setStatusBarColor: color => set(state => ({ ...state, color })),
  resetStatusBarColor: () => set(state => ({ ...state, color: colors.BLACK_I }))
}))
