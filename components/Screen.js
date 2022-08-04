import { View } from "react-native"

import { getStatusBarHeight } from "react-native-status-bar-height"

import { colors } from "../utils"

export function Screen({ children, ignoreAndroidStatusBarHeight = false }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.BLACK_I,
        paddingTop: getStatusBarHeight(ignoreAndroidStatusBarHeight)
      }}
    >
      {children}
    </View>
  )
}
