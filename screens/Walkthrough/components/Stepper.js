import { View, TouchableOpacity, StyleSheet } from "react-native"

import Arrow from "../../../assets/icons/Arrow"

import colors from "../../../utils/colors"

export function Stepper({ style, onPress }) {
  function handlePress() {
    !!onPress && onPress()
  }

  return (
    <TouchableOpacity
      touchSoundDisabled
      activeOpacity={0.65}
      onPress={handlePress}
      style={style}
    >
      <View style={styles.container}>
        <Arrow />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  }
})
