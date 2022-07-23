import create from "zustand"

const DEFAULT_STATE = {
  isAuthenticated: false,
  token: null,
  userId: null
}

export const useAuthStore = create(set => ({
  auth: DEFAULT_STATE,
  toggleIsAuthenticated: () =>
    set(state => ({
      auth: { ...state.auth, isAuthenticated: !state.isAuthenticated }
    })),
  logUserIn: (userId = null) =>
    set(state => ({
      auth: { ...state.auth, userId, isAuthenticated: true }
    }))
}))
