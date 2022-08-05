import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"

import { useRoute } from "@react-navigation/native"

import { useAuthStore } from "../stores/Auth"

import { Screen } from "../components"

import { colors, wait, units } from "../utils"
import { useState } from "react"

const { DEFAULT_OPACITY } = units

export function Basic() {
  const { key } = useRoute()
  const { setAuth } = useAuthStore()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout() {
    if (isLoggingOut) return
    setIsLoggingOut(true)

    await wait(1000)

    setAuth({
      isAuthenticated: false
    })

    await wait(300)
    setIsLoggingOut(false)
  }

  return (
    <Screen>
      <View style={{ paddingHorizontal: 32, paddingTop: 32 }}>
        <Text
          style={{
            color: colors.DASHBOARD_STROKE_GREY,
            fontFamily: "MontserratBold"
          }}
        >
          {key}
        </Text>

        <TouchableOpacity
          activeOpacity={DEFAULT_OPACITY}
          onPress={handleLogout}
          style={{
            width: 80,
            height: 40,
            paddingHorizontal: 16,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.WHITE,
            borderRadius: 12,
            position: "absolute",
            right: 32,
            top: 32
          }}
        >
          {isLoggingOut ? (
            <ActivityIndicator color={colors.BLACK_I} />
          ) : (
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={{
                fontFamily: "PoppinsSemiBold",
                color: colors.BLACK_I
              }}
            >
              Logout
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </Screen>
  )
}
