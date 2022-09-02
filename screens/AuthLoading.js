import { useEffect } from "react"

import { ActivityIndicator, StyleSheet, View } from "react-native"

import { Screen } from "../components"

import { useAuthStore } from "../stores/Auth"

import { colors, user, wait } from "../utils"
import { config } from "../utils/constants"
import { useUserStore } from "../stores/User"

const { getLocalUserCredentials, setLocalUserCredentials } = user

export function AuthLoading({ navigation }) {
  const { navigate } = navigation
  const { setAuth } = useAuthStore()
  const { setUser } = useUserStore()

  useEffect(() => {
    async function getLocalAuth() {
      const credentials = await getLocalUserCredentials()

      if (!!!credentials) return navigate("Walkthrough")

      const refreshToken = credentials?.refreshToken

      const response = await fetch(`${config.AUTHORIZATION_SERVER}auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: refreshToken
        })
      })

      if (!response.ok) return navigate("Walkthrough")

      const data = await response.json()

      const userDataResponse = await fetch(`${config.API_URL}users/me`, {
        headers: {
          Authorization: `Bearer ${data?.accessToken}`
        }
      })

      const userData = await userDataResponse.json()

      const parsedContract = {
        isAuthenticated: true,
        accessToken: data?.accessToken,
        refreshToken,
        userId: userData?.id
      }

      await setLocalUserCredentials({ credentials: parsedContract })

      await wait(500)
      setAuth(parsedContract)
      setUser(userData)
    }
    getLocalAuth()
  }, [])

  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator size="large" color={colors.ORANGE_NAVIGATION} />
        </View>
      </View>
    </Screen>
  )
}
