import { View } from "react-native"

import { getStatusBarHeight } from "react-native-status-bar-height"

import colors from "../utils/colors"

export function StatusBarWrapper() {
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: getStatusBarHeight(),
        backgroundColor: colors.BLACK_I,
        zIndex: 9999
      }}
    />
  )
}
