import { View, Text } from "react-native"

import { useRoute } from "@react-navigation/native"

import { getStatusBarHeight } from "react-native-status-bar-height"

import colors from "../../../utils/colors"

export function TermsAndConditions() {
  const { key } = useRoute()

  return (
    <View style={{ flex: 1, backgroundColor: colors.AUTHENTICATION_BLUE }}>
      <View style={{ paddingTop: getStatusBarHeight() }}>
        <Text style={{ color: colors.WHITE }}>{key}</Text>
      </View>
    </View>
  )
}
