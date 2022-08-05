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

import { Screen } from "../../../components"

import { colors, units, wait } from "../../../utils"
import { config } from "../../../utils/constants"

import FeijoadaImage from "../../../assets/images/Walkthrough/Feijoada.png"

const { DEFAULT_OPACITY } = units

export function Auth() {
  const { width } = useWindowDimensions()
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const { setAuth } = useAuthStore()

  async function handleSignIn() {
    if (isAuthenticating) return
    setIsAuthenticating(true)

    const { type } = await openAuthSessionAsync(`${config.API_URL}auth`)

    if (type === "dismiss") {
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
      <Image
        source={FeijoadaImage}
        style={{
          transform: [{ scale: 0.6 }, { translateX: -width * 0.31 }]
        }}
      />
      <View
        style={{
          marginTop: 32,
          paddingHorizontal: 32,
          justifyContent: "center",
          alignItems: "center"
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
    </Screen>
  )
}
