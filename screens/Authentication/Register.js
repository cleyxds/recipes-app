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
  ActivityIndicator,
  ScrollView
} from "react-native"

import { locale } from "expo-localization"

import { useNavigation } from "@react-navigation/native"

import { TextInputMask } from "react-native-masked-text"

import { useUserStore } from "../../stores/User"
import { useAuthStore } from "../../stores/Auth"

import { getStatusBarHeight } from "react-native-status-bar-height"

import RegisterBackground from "../../assets/images/Authentication/register.png"
import LogoIcon from "../../assets/images/Authentication/logo.png"

import { DEFAULT_OPACITY } from "../../utils/units"
import wait from "../../utils/wait"
import { config } from "../../utils/constants"
import colors from "../../utils/colors"

const DEFAULT_STATES = {
  IS_LOADING: false,
  FIRST_NAME: "",
  LAST_NAME: "",
  EMAIL: "",
  PASSWORD: "",
  PHONE_NUMBER: ""
}

export function Register() {
  const { height } = useWindowDimensions()
  const { navigate, reset } = useNavigation()

  const { setUser } = useUserStore()
  const { logInUser } = useAuthStore()

  const [isLoading, setIsLoading] = useState(DEFAULT_STATES["IS_LOADING"])

  const [firstName, setFirstName] = useState(DEFAULT_STATES["FIRST_NAME"])
  const [lastname, setLastname] = useState(DEFAULT_STATES["LAST_NAME"])
  const [email, setEmail] = useState(DEFAULT_STATES["EMAIL"])
  const [password, setPassword] = useState(DEFAULT_STATES["PASSWORD"])
  const [phoneNumber, setPhoneNumber] = useState(DEFAULT_STATES["PHONE_NUMBER"])

  function clearForm() {
    setFirstName(DEFAULT_STATES["FIRST_NAME"])
    setLastname(DEFAULT_STATES["LAST_NAME"])
    setEmail(DEFAULT_STATES["EMAIL"])
    setPassword(DEFAULT_STATES["PASSWORD"])
    setPhoneNumber(DEFAULT_STATES["PHONE_NUMBER"])
  }

  async function handleRegister() {
    if (isLoading) return

    setIsLoading(true)

    const parsedInputs = {
      firstName: firstName?.trim(),
      lastName: lastname?.trim(),
      password: password?.trim(),
      phone: phoneNumber?.trim(),
      email: email?.trim(),
      locale
    }

    try {
      const response = await fetch(`${config.API_URL}users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(parsedInputs)
      })

      if (!response.ok) {
        await wait(300)
        setIsLoading(false)
        return
      }

      const parsedLoginData = {
        email: parsedInputs?.email,
        password: parsedInputs?.password
      }

      const responseLogin = await fetch(`${config.API_URL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(parsedLoginData)
      })

      if (!response.ok) {
        await wait(300)
        setIsLoading(false)
        return
      }

      const userData = await response.json()
      const { accessToken, refreshToken } = await responseLogin.json()

      const userAuthData = {
        isAuthenticated: true,
        accessToken,
        refreshToken,
        userId: userData?.id
      }

      setUser(userData)
      setAuth(userAuthData)

      reset({ index: 0, routes: [{ name: "SMain" }] })

      await wait(300)
      clearForm()
      setIsLoading(false)
    } catch (error) {
      await wait(300)
      clearForm()
      setIsLoading(false)
    }
  }

  return (
    <ImageBackground source={RegisterBackground} style={styles.container}>
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
                fontFamily: "DMSansBold",
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
                  fontFamily: "DMSansRegular",
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
                  fontFamily: "DMSansRegular",
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
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Text>First name</Text>
                  <TextInput
                    placeholder="First name"
                    placeholderTextColor={colors.AUTHENTICATION_BLUE_II}
                    autoCapitalize="words"
                    onChangeText={setFirstName}
                    value={firstName}
                    style={{
                      marginTop: 4,
                      fontSize: 14,
                      color: colors.NOTIFICATION_BELL_GREEN,
                      fontFamily: "DMSansRegular",
                      lineHeight: 18.23,
                      letterSpacing: 0.2,
                      paddingHorizontal: 14.68,
                      paddingVertical: 17.83,
                      borderColor: colors.AUTHENTICATION_BLUE_II,
                      borderWidth: 1,
                      borderRadius: 8,
                      flex: 1,
                      marginRight: 8
                    }}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text>Last name</Text>
                  <TextInput
                    placeholder="Last name"
                    placeholderTextColor={colors.AUTHENTICATION_BLUE_II}
                    autoCapitalize="words"
                    onChangeText={setLastname}
                    value={lastname}
                    style={{
                      marginTop: 4,
                      fontSize: 14,
                      color: colors.NOTIFICATION_BELL_GREEN,
                      fontFamily: "DMSansRegular",
                      lineHeight: 18.23,
                      letterSpacing: 0.2,
                      paddingHorizontal: 14.68,
                      paddingVertical: 17.83,
                      borderColor: colors.AUTHENTICATION_BLUE_II,
                      borderWidth: 1,
                      borderRadius: 8,
                      flex: 1
                    }}
                  />
                </View>
              </View>

              <View style={{ marginTop: 18 }}>
                <View>
                  <Text>E-mail</Text>
                  <TextInput
                    placeholder="customer@energy-app.com"
                    keyboardType="email-address"
                    placeholderTextColor={colors.AUTHENTICATION_BLUE_II}
                    autoCapitalize="none"
                    onChangeText={setEmail}
                    value={email}
                    style={{
                      marginTop: 4,
                      fontSize: 14,
                      color: colors.NOTIFICATION_BELL_GREEN,
                      fontFamily: "DMSansRegular",
                      lineHeight: 18.23,
                      letterSpacing: 0.2,
                      paddingHorizontal: 14.68,
                      paddingVertical: 17.83,
                      borderColor: colors.AUTHENTICATION_BLUE_II,
                      borderWidth: 1,
                      borderRadius: 8,
                      marginBottom: 18
                    }}
                  />
                </View>

                <View>
                  <Text>Password</Text>
                  <TextInput
                    placeholder="********"
                    keyboardType="default"
                    placeholderTextColor={colors.AUTHENTICATION_BLUE_II}
                    autoCapitalize="none"
                    onChangeText={setPassword}
                    secureTextEntry
                    value={password}
                    style={{
                      marginTop: 4,
                      fontSize: 14,
                      color: colors.NOTIFICATION_BELL_GREEN,
                      fontFamily: "DMSansRegular",
                      lineHeight: 18.23,
                      letterSpacing: 0.2,
                      paddingHorizontal: 14.68,
                      paddingVertical: 17.83,
                      borderColor: colors.AUTHENTICATION_BLUE_II,
                      borderWidth: 1,
                      borderRadius: 8
                    }}
                  />
                </View>
              </View>

              <View style={{ marginTop: 18 }}>
                <View>
                  <Text>Phone number</Text>
                  <TextInputMask
                    placeholder="(**) *****-****"
                    type="cel-phone"
                    options={{
                      maskType: "BRL",
                      withDDD: true
                    }}
                    onChangeText={setPhoneNumber}
                    value={phoneNumber}
                    style={{
                      marginTop: 4,
                      fontSize: 14,
                      color: colors.NOTIFICATION_BELL_GREEN,
                      fontFamily: "DMSansRegular",
                      lineHeight: 18.23,
                      letterSpacing: 0.2,
                      paddingHorizontal: 14.68,
                      paddingVertical: 17.83,
                      borderColor: colors.AUTHENTICATION_BLUE_II,
                      borderWidth: 1,
                      borderRadius: 8
                    }}
                  />
                </View>
              </View>

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
                    fontFamily: "MontserratRegular"
                  }}
                >
                  Retrieve account
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              touchSoundDisabled
              disabled={isLoading}
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
                    fontFamily: "DMSansBold",
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
                  fontFamily: "NunitoSansRegular",
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
                  fontFamily: "MontserratRegular",
                  color: colors.AUTHENTICATION_GREY,
                  fontSize: 14,
                  lineHeight: 16
                }}
              >
                Already registed?{" "}
              </Text>
              <TouchableOpacity
                touchSoundDisabled
                onPress={() => navigate("Login")}
                activeOpacity={DEFAULT_OPACITY}
              >
                <Text
                  style={{
                    fontFamily: "MontserratBold",
                    color: colors.WALKTHROUGH_BLUE,
                    fontSize: 14,
                    lineHeight: 16
                  }}
                >
                  Login
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
                    fontFamily: "MontserratRegular",
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
                  fontFamily: "MontserratRegular",
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
                    fontFamily: "MontserratRegular",
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
                fontFamily: "MontserratMedium",
                lineHeight: 16,
                fontSize: 14
              }}
            >
              Haven’t enrolled yet on Duke Energy?
            </Text>

            <TouchableOpacity
              touchSoundDisabled
              activeOpacity={DEFAULT_OPACITY}
              style={{ marginTop: 4.2 }}
            >
              <Text
                style={{
                  color: colors.AUTHENTICATION_GREEN,
                  fontSize: 14,
                  lineHeight: 16,
                  fontFamily: "MontserratExtraBold"
                }}
              >
                Enroll now
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 30.24,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap"
            }}
          >
            <Text
              style={{
                color: colors.WHITE,
                fontFamily: "MontserratMedium",
                fontSize: 14,
                lineHeight: 16
              }}
            >
              By Signing In, you agree to our{" "}
            </Text>
            <TouchableOpacity
              touchSoundDisabled
              activeOpacity={DEFAULT_OPACITY}
              onPress={() => navigate("PrivPol")}
            >
              <Text
                style={{
                  color: colors.AUTHENTICATION_GREEN,
                  fontFamily: "MontserratRegular",
                  fontSize: 14,
                  lineHeight: 16
                }}
              >
                Privacy Policy
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: colors.WHITE,
                fontFamily: "MontserratMedium",
                fontSize: 14,
                lineHeight: 16
              }}
            >
              {" "}
              and{" "}
            </Text>
            <TouchableOpacity
              touchSoundDisabled
              activeOpacity={DEFAULT_OPACITY}
              onPress={() => navigate("TermAndCond")}
            >
              <Text
                style={{
                  color: colors.AUTHENTICATION_GREEN,
                  fontFamily: "MontserratRegular",
                  fontSize: 14,
                  lineHeight: 16
                }}
              >
                Terms and Conditions
              </Text>
            </TouchableOpacity>
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
