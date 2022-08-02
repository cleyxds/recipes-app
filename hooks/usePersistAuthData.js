import AsyncStorage from "@react-native-async-storage/async-storage"

export function usePersistAuthData() {
  async function persistAuthData({ accessToken, refreshToken, userData }) {
    const authDataToBeStored = { accessToken, refreshToken, userData }

    await AsyncStorage.setItem("auth.data", JSON.stringify(authDataToBeStored))
  }

  async function getPersistedAuthData() {
    const data = await AsyncStorage.getItem("auth.data")

    if (!data) return setAuthData(undefined)

    setAuthData(JSON.parse(data))
  }

  return { persistAuthData, getPersistedAuthData }
}
