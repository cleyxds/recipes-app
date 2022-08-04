import { View, Text } from "react-native"

import { useRoute } from "@react-navigation/native"

import { Screen } from "../components"

import { colors } from "../utils"

export function Basic() {
  const { key } = useRoute()

  return (
    <Screen>
      <Text
        style={{
          color: colors.DASHBOARD_STROKE_GREY,
          fontFamily: "MontserratBold"
        }}
      >
        {key}
      </Text>
    </Screen>
  )
}
