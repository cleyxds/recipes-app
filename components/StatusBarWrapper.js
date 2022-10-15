import { View } from "react-native"

import { getStatusBarHeight } from "react-native-status-bar-height"

import { useStatusBarStatusStore } from "../stores/StatusBarState"

export function StatusBarWrapper() {
  const { color } = useStatusBarStatusStore()

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: getStatusBarHeight(),
        backgroundColor: color,
        zIndex: 9999
      }}
    />
  )
}
