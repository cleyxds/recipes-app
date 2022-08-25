import AsyncStorage from "@react-native-async-storage/async-storage"

async function getLocalUserCredentials() {
  const user = await AsyncStorage.getItem("user")

  const userObject = JSON.parse(user)

  return userObject
}

async function setLocalUserCredentials({ credentials }) {
  await AsyncStorage.setItem("user", JSON.stringify(credentials))
}

async function removeLocalUserCredentials() {
  await AsyncStorage.removeItem("user")
}

export default {
  getLocalUserCredentials,
  setLocalUserCredentials,
  removeLocalUserCredentials
}
