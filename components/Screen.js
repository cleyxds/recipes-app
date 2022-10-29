import { View } from "react-native"

import { getStatusBarHeight } from "react-native-status-bar-height"

import { colors } from "../utils"
import { isAndroid } from "../utils/constants"

export function Screen({
  children,
  noPadding = false,
  ignoreAndroidStatusBarHeight = isAndroid,
  ...props
}) {
  const parsePaddingTop = noPadding
    ? 0
    : getStatusBarHeight(ignoreAndroidStatusBarHeight)

  return (
    <View
      style={[
        props.style,
        {
          flex: 1,
          backgroundColor: colors.BLACK_I,
          paddingTop: parsePaddingTop
        }
      ]}
      {...props}
    >
      {!!children ? children : <View />}
    </View>
  )
}
