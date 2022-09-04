import { Keyboard, TouchableWithoutFeedback, View } from "react-native"

import { getStatusBarHeight } from "react-native-status-bar-height"

import { colors } from "../utils"
import { isAndroid } from "../utils/constants"

export function Screen({
  children,
  ignoreAndroidStatusBarHeight = isAndroid,
  ...props
}) {
  return (
    <View
      style={[
        props.style,
        {
          flex: 1,
          backgroundColor: colors.BLACK_I,
          paddingTop: getStatusBarHeight(ignoreAndroidStatusBarHeight)
        }
      ]}
      {...props}
    >
      <TouchableWithoutFeedback touchSoundDisabled onPress={Keyboard.dismiss}>
        <>{children}</>
      </TouchableWithoutFeedback>
    </View>
  )
}
