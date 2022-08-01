import { useEffect, useState } from "react"

import AsyncStorage from "@react-native-async-storage/async-storage"

const DEFAULT_STATE = {
  AUTH_DATA: {
    accessToken: null,
    refreshToken: null,
    userId: null
  }
}

export function usePersistAuthData() {
  const [authData, setAuthData] = useState(DEFAULT_STATE["AUTH_DATA"])

  useEffect(() => {
    getPersistedAuthData()
  }, [])

  async function persistAuthData({ accessToken, refreshToken, userData }) {
    const authDataToBeStored = { accessToken, refreshToken, userData }

    await AsyncStorage.setItem("auth.data", JSON.stringify(authDataToBeStored))
  }

  async function getPersistedAuthData() {
    const data = await AsyncStorage.getItem("auth.data")

    if (!data) return setAuthData(undefined)

    setAuthData(JSON.parse(data))
  }

  return { persistAuthState: persistAuthData, AuthState: authData }
}
