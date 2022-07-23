import { View, Text } from "react-native"

import { getStatusBarHeight } from "react-native-status-bar-height"

import colors from "../utils/colors"
import { useUserStore } from "../stores/User"
import { useAuthStore } from "../stores/Auth"

export function Welcome() {
  const { user } = useUserStore()
  const { auth } = useAuthStore()

  return (
    <View style={{ flex: 1, backgroundColor: colors.AUTHENTICATION_BLUE }}>
      <View style={{ paddingTop: getStatusBarHeight() }}>
        <Text style={{ color: colors.WHITE }}>{JSON.stringify(user)}</Text>
        <Text style={{ color: colors.WHITE }}>{JSON.stringify(auth)}</Text>
      </View>
    </View>
  )
}
