import { useState } from "react"

import {
  View,
  Text,
  ImageBackground,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native"

import { Stepper } from "./components"

import useHandleSkip from "./hooks/useHandleSkip"

import { getStatusBarHeight } from "react-native-status-bar-height"

import CommunicationsImage from "../../assets/images/Walkthrough/communications.png"

import { DEFAULT_OPACITY } from "../../utils/units"
import colors from "../../utils/colors"

const DEFAULT_STATE = {
  LOADING: false
}

export function Communications() {
  const { height } = useWindowDimensions()
  const { handleSkip } = useHandleSkip()
  const [isLoading, setIsLoading] = useState(DEFAULT_STATE["LOADING"])

  const CONTENT_HEIGHT = height * 0.45

  async function handleGetStarted() {
    if (isLoading) return

    setIsLoading(true)

    await handleSkip()

    setIsLoading(false)
  }

  return (
    <ImageBackground source={CommunicationsImage} style={styles.container}>
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

          <Stepper style={styles.stepperStyle} />

          <View style={styles.contentTextContainer}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.contentTitle}>Manage Communications</Text>

              <View style={{ marginTop: 10 }}>
                <Text style={styles.contentDescription}>
                  Update and manage account communications in one spot. Click to
                  review your current settings and get started.
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 33, flexDirection: "row" }}>
              <TouchableOpacity
                disabled={isLoading}
                touchSoundDisabled
                activeOpacity={DEFAULT_OPACITY}
                onPress={handleGetStarted}
                style={styles.getStartedButtonStyle}
              >
                {isLoading ? (
                  <ActivityIndicator
                    color={colors.WALKTHROUGH_BLUE}
                    style={{ height: 22 }}
                  />
                ) : (
                  <Text
                    style={{
                      color: colors.WALKTHROUGH_BLUE,
                      fontWeight: "600",
                      lineHeight: 22,
                      fontSize: 18
                    }}
                  >
                    Let’s Get Started
                  </Text>
                )}
              </TouchableOpacity>
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
    opacity: 0.95,
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
    fontWeight: "700",
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
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 23
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.WHITE,
    lineHeight: 36,
    letterSpacing: 0.2
  },
  contentDescription: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19.5,
    textAlign: "center"
  },
  getStartedButtonStyle: {
    width: "100%",
    backgroundColor: colors.WHITE,
    paddingHorizontal: 72,
    paddingVertical: 12,
    borderRadius: 40,
    alignItems: "center"
  }
})
