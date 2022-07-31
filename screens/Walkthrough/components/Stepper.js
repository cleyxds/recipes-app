import { Fragment } from "react"

import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions
} from "react-native"

import Svg, { G, Circle } from "react-native-svg"

import { ArrowIcon } from "../../../assets/icons"

import { DEFAULT_OPACITY } from "../../../utils/units"
import colors from "../../../utils/colors"
import { isIOS } from "../../../utils/constants"

export function Stepper({ percentage, style, onPress }) {
  function handlePress() {
    !!onPress && onPress()
  }

  return (
    <Fragment>
      <Progress percentage={percentage} />
      <TouchableOpacity
        touchSoundDisabled
        activeOpacity={DEFAULT_OPACITY + 0.33}
        disabled={percentage === 100}
        onPress={handlePress}
        style={style}
      >
        <View style={styles.container(!onPress)}>
          <ArrowIcon />
        </View>
      </TouchableOpacity>
    </Fragment>
  )
}

function Progress({ percentage }) {
  const { height } = useWindowDimensions()

  const size = 50
  const strokeWidth = 2.5
  const center = size / 2
  const radius = size / 2 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius

  return (
    <Svg
      width={size}
      height={size}
      style={styles.progressPositionStyle(height)}
    >
      <G rotation="90" origin={center}>
        <Circle
          stroke={colors.WHITE}
          opacity={0.2}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={colors.WALKTHROUGH_GREEN}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * percentage) / 100}
        />
      </G>
    </Svg>
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
  }),
  progressPositionStyle: height => ({
    position: "absolute",
    top: isIOS ? `-${(5.5 * height * 0.19) / 100}%` : `-${5.5}%`
  })
})
