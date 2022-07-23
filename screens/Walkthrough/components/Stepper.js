import { View, TouchableOpacity, StyleSheet } from "react-native"

import Arrow from "../../../assets/icons/Arrow"

import { DEFAULT_OPACITY } from "../../../utils/units"
import colors from "../../../utils/colors"

export function Stepper({ style, onPress }) {
  function handlePress() {
    !!onPress && onPress()
  }

  return (
    <TouchableOpacity
      touchSoundDisabled
      activeOpacity={DEFAULT_OPACITY}
      disabled={!onPress}
      onPress={handlePress}
      style={style}
    >
      <View style={styles.container(!onPress)}>
        <Arrow />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: isDisabled => ({
    backgroundColor: isDisabled ? colors.GREY : colors.WHITE,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  })
})
