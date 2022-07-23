import create from "zustand"

const DEFAULT_STATE = {
  id: "",
  accountNumber: "",
  username: "",
  email: ""
}

export const useUserStore = create(set => ({
  user: DEFAULT_STATE,
  setUser: user => set(state => ({ ...state, user })),
  clearUser: () => set(() => ({ user: DEFAULT_STATE }))
}))
