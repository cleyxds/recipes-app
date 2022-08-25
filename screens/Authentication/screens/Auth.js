import { useState } from "react"

import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native"

import { openAuthSessionAsync } from "expo-web-browser"

import { useAuthStore } from "../../../stores/Auth"
import { useUserStore } from "../../../stores/User"

import { Screen } from "../../../components"

import { colors, units, wait, user } from "../../../utils"
import { config } from "../../../utils/constants"

import FeijoadaImage from "../../../assets/images/Walkthrough/Feijoada.png"

const { DEFAULT_OPACITY } = units
const { setLocalUserCredentials } = user

export function Auth() {
  const { height } = useWindowDimensions()
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const { setAuth } = useAuthStore()
  const { setUser } = useUserStore()

  async function handleSignIn() {
    if (isAuthenticating) return
    setIsAuthenticating(true)

    const { type, url } = await openAuthSessionAsync(
      `${config.AUTHORIZATION_SERVER}auth/login`,
      "myapp://auth"
    )

    if (type === "success") {
      const route = url?.replace(/.*?:\/\//g, "")
      const [refreshToken] = route.split("/")

      const response = await fetch(`${config.AUTHORIZATION_SERVER}auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: refreshToken
        })
      })

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

      setAuth(parsedContract)
      setUser(userData)
      await setLocalUserCredentials({ credentials: parsedContract })

      await wait(500)
      setIsAuthenticating(false)
      return
    }

    await wait(300)
    setIsAuthenticating(false)
  }

  return (
    <Screen>
      <View style={{ height: height * 0.85 }}>
        <View
          style={{
            height: height * 0.5,
            backgroundColor: colors.WHITE,
            marginBottom: "5%"
          }}
        />

        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 32
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "MontserratBold",
                fontSize: 24,
                color: colors.WHITE
              }}
            >
              Melhor aplicativo{"\n"}de receitas de todos os tempos
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              paddingHorizontal: 32,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              activeOpacity={DEFAULT_OPACITY}
              onPress={handleSignIn}
              style={{
                height: 50,
                backgroundColor: colors.WHITE,
                borderRadius: 10,
                paddingVertical: 10,
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {isAuthenticating ? (
                <ActivityIndicator color={colors.BLACK_I} />
              ) : (
                <Text
                  style={{
                    fontFamily: "MontserratBold",
                    fontSize: 16,
                    color: colors.BLACK_I
                  }}
                >
                  Cadastre-se com e-mail
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  )
}
