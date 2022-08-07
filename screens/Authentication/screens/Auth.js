import { useState } from "react"

import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native"

import { openAuthSessionAsync, openBrowserAsync } from "expo-web-browser"

import { useAuthStore } from "../../../stores/Auth"

import { Screen } from "../../../components"

import { colors, units, wait } from "../../../utils"
import { config } from "../../../utils/constants"

import FeijoadaImage from "../../../assets/images/Walkthrough/Feijoada.png"

const { DEFAULT_OPACITY } = units

export function Auth() {
  const { height } = useWindowDimensions()
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const { setAuth } = useAuthStore()

  async function handleSignIn() {
    if (isAuthenticating) return
    setIsAuthenticating(true)

    const { type } = await openAuthSessionAsync(
      `${config.API_URL}auth`,
      "myapp://auth"
    )

    if (type === "cancel" || type === "dismiss" || type === "success") {
      await wait(2000)
      setAuth({
        isAuthenticated: true
      })

      await wait(300)
      setIsAuthenticating(false)
      return
    }

    await wait(3000)
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
