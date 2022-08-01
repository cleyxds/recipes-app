import { useEffect } from "react"

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

import { useNavigation } from "@react-navigation/native"

import { useUserStore } from "../../stores/User"
import { useAuthStore } from "../../stores/Auth"

import { usePersistAuthData } from "../../hooks"

import { getStatusBarHeight } from "react-native-status-bar-height"

import WelcomeImage from "../../assets/images/Walkthrough/welcome.png"

import { config } from "../../utils/constants"
import { colors, wait, units } from "../../utils"

const { DEFAULT_OPACITY } = units

export function Welcome({ screenRef }) {
  const { height } = useWindowDimensions()
  const { handleSkip } = useHandleSkip()
  const { reset } = useNavigation()
  const { setUser } = useUserStore()
  const { setAuth } = useAuthStore()

  const { AuthState } = usePersistAuthData()

  useEffect(() => {
    if (!AuthState.accessToken) return

    async function handleGetUserData() {
      try {
        const response = await fetch(`${config.API_URL}users/me`, {
          headers: {
            Authorization: `Bearer ${AuthState.accessToken}`
          }
        })

        if (!response.ok) {
          return
        }

        const userData = await response.json()

        const parsedAuthData = {
          isAuthenticated: true,
          accessToken: AuthState.accessToken,
          refreshToken: AuthState.refreshToken,
          userId: userData?.id
        }

        setUser(userData)
        setAuth(parsedAuthData)

        reset({ index: 0, routes: [{ name: "SMain" }] })

        await wait(300)
      } catch (error) {
        console.error(error)
      }
    }

    handleGetUserData()
  }, [AuthState])

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
            percentage={0}
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
