import { useState } from "react"

import {
  ImageBackground,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
} from "react-native"

import { getStatusBarHeight } from "react-native-status-bar-height"

import RegisterBackground from "../../assets/images/Authentication/register.png"
import LogoIcon from "../../assets/images/Authentication/logo.png"

import { DEFAULT_OPACITY } from "../../utils/units"
import wait from "../../utils/wait"
import colors from "../../utils/colors"

export function Register() {
  const { height } = useWindowDimensions()
  const [isLoading, setIsLoading] = useState(false)

  async function handleRegister() {
    if (isLoading) return

    setIsLoading(true)

    await wait(3000)

    setIsLoading(false)
  }

  return (
    <ImageBackground source={RegisterBackground} style={styles.container}>
      <TouchableWithoutFeedback touchSoundDisabled onPress={Keyboard.dismiss}>
        <View style={styles.containerWrapper}>
          <View
            style={{
              backgroundColor: colors.WHITE,
              height: height * 0.7,
              marginHorizontal: 16,
              marginTop: 64,
              borderRadius: 12,
              paddingHorizontal: 21,
              paddingTop: 24,
              paddingBottom: 7.55
            }}
          >
            <Image source={LogoIcon} style={{ alignSelf: "center" }} />

            <Text
              style={{
                marginTop: 32,
                alignSelf: "center",
                fontSize: 22,
                lineHeight: 28.64,
                letterSpacing: 0.2,
                fontWeight: "700",
                color: colors.AUTHENTICATION_BLUE
              }}
            >
              Register for MyDuke
            </Text>

            <View
              style={{
                marginTop: 16.78,
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 14,
                  lineHeight: 22,
                  letterSpacing: 0.2,
                  color: colors.AUTHENTICATION_LIGHTBLUE
                }}
              >
                Please enter your
              </Text>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 14,
                  lineHeight: 22,
                  letterSpacing: 0.2,
                  color: colors.AUTHENTICATION_LIGHTBLUE
                }}
              >
                Account Number to register.
              </Text>
            </View>

            <View style={{ marginTop: 48.25 }}>
              <TextInput
                placeholder="Account number"
                placeholderTextColor={colors.AUTHENTICATION_BLUE_II}
                autoCapitalize="characters"
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  lineHeight: 18.23,
                  letterSpacing: 0.2,
                  paddingHorizontal: 14.68,
                  paddingVertical: 17.83,
                  borderColor: colors.AUTHENTICATION_BLUE_II,
                  borderWidth: 1,
                  borderRadius: 8
                }}
              />

              <TouchableOpacity
                activeOpacity={DEFAULT_OPACITY}
                touchSoundDisabled
              >
                <Text
                  style={{
                    marginTop: 14.68,
                    color: colors.WALKTHROUGH_BLUE,
                    alignSelf: "flex-end",
                    fontSize: 12,
                    lineHeight: 16,
                    fontWeight: "400"
                  }}
                >
                  Retrieve account
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              touchSoundDisabled
              activeOpacity={DEFAULT_OPACITY}
              onPress={handleRegister}
              style={{
                marginTop: 50.42,
                backgroundColor: colors.AUTHENTICATION_BLUE_II,
                paddingVertical: 17.83,
                height: 54.54,
                borderRadius: 40,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.WHITE} />
              ) : (
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 14,
                    lineHeight: 18.23,
                    letterSpacing: 0.2,
                    color: colors.WHITE
                  }}
                >
                  Register
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 21,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: colors.WHITE,
                fontWeight: "500",
                lineHeight: 16,
                fontSize: 14
              }}
            >
              Haven’t enrolled yet on Duke Energy?
            </Text>

            <TouchableOpacity style={{ marginTop: 4.2 }}>
              <Text
                style={{
                  color: colors.AUTHENTICATION_GREEN,
                  fontSize: 14,
                  lineHeight: 16,
                  fontWeight: "800"
                }}
              >
                Enroll now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerWrapper: { paddingTop: getStatusBarHeight() }
})
