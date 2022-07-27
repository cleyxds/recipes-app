import { useEffect, useState } from "react"

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
  ActivityIndicator,
  ScrollView
} from "react-native"

import { useNavigation } from "@react-navigation/native"

import { useUserStore } from "../../stores/User"
import { useAuthStore } from "../../stores/Auth"

import { getStatusBarHeight } from "react-native-status-bar-height"

import LoginBackground from "../../assets/images/Authentication/login.png"
import LogoIcon from "../../assets/images/Authentication/logo.png"

import { DEFAULT_OPACITY } from "../../utils/units"
import { config } from "../../utils/constants"
import wait from "../../utils/wait"
import colors from "../../utils/colors"

const DEFAULT_STATES = {
  IS_LOADING: false,
  EMAIL: "",
  PASSWORD: ""
}

export function Login() {
  const { height } = useWindowDimensions()
  const { navigate, reset } = useNavigation()

  const { setUser } = useUserStore()
  const { logUserIn } = useAuthStore()

  const [isLoading, setIsLoading] = useState(DEFAULT_STATES["IS_LOADING"])
  const [email, setEmail] = useState(DEFAULT_STATES["EMAIL"])
  const [password, setPassword] = useState(DEFAULT_STATES["PASSWORD"])

  async function handleLogin() {
    if (isLoading) return

    setIsLoading(true)

    const response = await fetch(`${config.API_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    if (response.ok) {
      const {
        user: { id, status, statusChanged, credentials, ...rest }
      } = await response.json()

      setUser({
        id,
        ...rest
      })

      logUserIn(id)

      reset({ index: 0, routes: [{ name: "SMain" }] })

      await wait(300)
      setIsLoading(false)
    }

    await wait(300)
    setIsLoading(false)
  }

  return (
    <ImageBackground source={LoginBackground} style={styles.container}>
      <TouchableWithoutFeedback touchSoundDisabled onPress={Keyboard.dismiss}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.contentContainerStyle}
          style={styles.containerWrapper}
        >
          <View
            style={{
              backgroundColor: colors.WHITE,
              minHeight: height * 0.7,
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
                placeholder="E-mail"
                keyboardType="email-address"
                placeholderTextColor={colors.AUTHENTICATION_BLUE_II}
                autoCapitalize="none"
                onChangeText={setEmail}
                value={email}
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

              <TextInput
                placeholder="Password"
                keyboardType="default"
                placeholderTextColor={colors.AUTHENTICATION_BLUE_II}
                autoCapitalize="none"
                onChangeText={setPassword}
                secureTextEntry
                value={password}
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  lineHeight: 18.23,
                  letterSpacing: 0.2,
                  marginTop: 18,
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
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              touchSoundDisabled
              disabled={isLoading}
              activeOpacity={DEFAULT_OPACITY}
              onPress={handleLogin}
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
                  Login
                </Text>
              )}
            </TouchableOpacity>

            <View
              style={{
                marginTop: 16.78,
                height: 20,
                flex: 1,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flex: 2,
                  height: 1,
                  backgroundColor: colors.AUTHENTICATION_BLUE_II
                }}
              />
              <Text
                style={{
                  marginHorizontal: 16.78,
                  fontWeight: "400",
                  fontSize: 14,
                  lineHeight: 19.1,
                  letterSpacing: 0.3,
                  color: colors.AUTHENTICATION_BLUE_II
                }}
              >
                Or
              </Text>
              <View
                style={{
                  flex: 2,
                  height: 1,
                  backgroundColor: colors.AUTHENTICATION_BLUE_II
                }}
              />
            </View>

            <View
              style={{
                marginTop: 12.56,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontWeight: "400",
                  color: colors.AUTHENTICATION_GREY,
                  fontSize: 14,
                  lineHeight: 16
                }}
              >
                Not registered yet?{" "}
              </Text>
              <TouchableOpacity
                touchSoundDisabled
                onPress={() => navigate("Register")}
                activeOpacity={DEFAULT_OPACITY}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    color: colors.WALKTHROUGH_BLUE,
                    fontSize: 14,
                    lineHeight: 16
                  }}
                >
                  Register
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginTop: 26,
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                touchSoundDisabled
                activeOpacity={DEFAULT_OPACITY}
              >
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 12,
                    lineHeight: 16,
                    color: colors.BLACK
                  }}
                >
                  Contact us
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 12,
                  lineHeight: 16,
                  color: colors.BLACK
                }}
              >
                {" "}
                |{" "}
              </Text>
              <TouchableOpacity
                touchSoundDisabled
                activeOpacity={DEFAULT_OPACITY}
              >
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 12,
                    lineHeight: 16,
                    color: colors.BLACK
                  }}
                >
                  Report an error
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerWrapper: { marginTop: getStatusBarHeight(), flex: 1 },
  contentContainerStyle: { paddingBottom: 32 }
})
