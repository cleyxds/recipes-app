import {
  View,
  Text,
  ImageBackground,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity
} from "react-native"

import { Stepper } from "./components"

import useHandleSkip from "./hooks/useHandleSkip"

import { getStatusBarHeight } from "react-native-status-bar-height"

import WelcomeImage from "../../assets/images/Walkthrough/welcome.png"
import { DEFAULT_OPACITY } from "../../utils/units"
import colors from "../../utils/colors"

export function Welcome({ screenRef }) {
  const { height } = useWindowDimensions()
  const { handleSkip } = useHandleSkip()

  const CONTENT_HEIGHT = height * 0.45

  return (
    <ImageBackground source={WelcomeImage} style={styles.container}>
      <TouchableOpacity
        touchSoundDisabled
        activeOpacity={DEFAULT_OPACITY}
        style={styles.skipButtonStyle}
        onPress={handleSkip}
      >
        <Text style={styles.skipButtonTextStyle}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <View style={styles.contentContainerWrapper(CONTENT_HEIGHT)}>
          <View style={styles.contentContainerBackground(CONTENT_HEIGHT)} />

          <Stepper
            onPress={() => screenRef?.scrollToIndex({ index: 1 })}
            style={styles.stepperStyle}
          />

          <View style={styles.contentTextContainer}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.contentTitle}
            >
              Welcome to Duke Energy
            </Text>

            <View style={{ marginTop: 10 }}>
              <Text style={styles.contentDescription}>
                Take a quick tour of some of the features you will find in the
                "Gexa Energy" App
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  contentContainerWrapper: height => ({
    height,
    alignItems: "center"
  }),
  contentContainerBackground: height => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    flex: 1,
    opacity: 0.7,
    backgroundColor: colors.WALKTHROUGH_BLUE,
    width: "100%",
    height
  }),
  skipButtonStyle: {
    position: "absolute",
    right: 20,
    top: getStatusBarHeight(true) + 16
  },
  skipButtonTextStyle: {
    textTransform: "uppercase",
    color: colors.WALKTHROUGH_GREEN,
    fontFamily: "MontserratBold",
    fontSize: 14,
    lineHeight: 16
  },
  stepperStyle: {
    position: "absolute",
    zIndex: 1,
    top: -16
  },
  contentTextContainer: {
    marginTop: 60,
    marginHorizontal: 34,
    alignItems: "center"
  },
  contentTitle: {
    fontSize: 24,
    fontFamily: "PoppinsSemiBold",
    color: colors.WHITE,
    lineHeight: 36,
    letterSpacing: 0.2
  },
  contentDescription: {
    color: colors.WHITE,
    fontSize: 16,
    fontFamily: "MontserratRegular",
    lineHeight: 19.5,
    textAlign: "center"
  }
})
