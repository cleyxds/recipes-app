import { useState } from "react"

import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native"

import { openAuthSessionAsync } from "expo-web-browser"

import { useAuthStore } from "../../../stores/Auth"
import { useUserStore } from "../../../stores/User"

import { Screen } from "../../../components"

import { MaterialIcons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { colors, units, wait, user } from "../../../utils"
import { config } from "../../../utils/constants"

import FeijoadaImage from "../../../assets/images/Walkthrough/Feijoada.png"

const { DEFAULT_OPACITY } = units
const { setLocalUserCredentials } = user

export function Auth() {
  const { height } = useWindowDimensions()
  const [isRegistering, setIsRegistering] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const { setAuth } = useAuthStore()
  const { setUser } = useUserStore()

  async function handleSignIn() {
    if (isRegistering) return
    setIsSigningIn(true)

    try {
      const { type, url } = await openAuthSessionAsync(
        `${config.AUTHORIZATION_SERVER}auth/login?redirectUrl=${config.APP_SCHEMA}`,
        config.APP_SCHEMA
      )

      if (type === "success") {
        const route = url?.replace(/.*?:\/\//g, "")
        const [host, doubleDashes, refreshToken] = route.split("/")

        const response = await fetch(
          `${config.AUTHORIZATION_SERVER}auth/token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              token: refreshToken
            })
          }
        )

        const data = await response.json()

        const userDataResponse = await fetch(`${config.API_URL}users/me`, {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`
          }
        })

        const userData = await userDataResponse.json()

        const parsedContract = {
          isAuthenticated: true,
          accessToken: data?.accessToken,
          refreshToken,
          userId: userData?.id
        }

        setAuth(parsedContract)
        setUser(userData)
        await setLocalUserCredentials({ credentials: parsedContract })

        await wait(500)
        setIsSigningIn(false)
        return
      }

      await wait(300)
      setIsSigningIn(false)
    } catch (error) {
      alert("Ocorreu um erro 😢, por favor tente novamente.")

      await wait(300)
      setIsSigningIn(false)
    }
  }

  async function handleRegister() {
    if (isRegistering) return
    setIsRegistering(true)

    try {
      const { type, url } = await openAuthSessionAsync(
        `${config.AUTHORIZATION_SERVER}auth/register?redirectUrl=${config.APP_SCHEMA}`,
        config.APP_SCHEMA
      )

      if (type === "success") {
        const route = url?.replace(/.*?:\/\//g, "")
        const [host, doubleDashes, refreshToken] = route.split("/")

        const response = await fetch(
          `${config.AUTHORIZATION_SERVER}auth/token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              token: refreshToken
            })
          }
        )

        const data = await response.json()

        const userDataResponse = await fetch(`${config.API_URL}users/me`, {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`
          }
        })

        const userData = await userDataResponse.json()

        const parsedContract = {
          isAuthenticated: true,
          accessToken: data?.accessToken,
          refreshToken,
          userId: userData?.id
        }

        setAuth(parsedContract)
        setUser(userData)
        await setLocalUserCredentials({ credentials: parsedContract })

        await wait(500)
        setIsRegistering(false)
        return
      }

      await wait(300)
      setIsRegistering(false)
    } catch (error) {
      alert("Ocorreu um erro 😢, por favor tente novamente.")

      await wait(300)
      setIsRegistering(false)
    }

    await wait(300)
    setIsRegistering(false)
  }

  async function handleGoogleSignIn() {}

  return (
    <Screen>
      <View style={{ height: height * 0.85 }}>
        <View
          style={{
            height: height * 0.5,
            backgroundColor: colors.WHITE,
            marginBottom: "5%"
          }}
        />

        <View style={{ flex: 1 }}>
          <View
            style={{
              paddingHorizontal: 32
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "MontserratBold",
                fontSize: 24,
                color: colors.WHITE
              }}
            >
              Melhor aplicativo{"\n"}de receitas de todos os tempos
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: 32,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              activeOpacity={DEFAULT_OPACITY}
              onPress={handleRegister}
              style={{
                marginTop: 16,
                height: 50,
                backgroundColor: colors.WHITE,
                borderRadius: 10,
                marginRight: 8,
                paddingVertical: 10,
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {isRegistering ? (
                <ActivityIndicator color={colors.BLACK_I} />
              ) : (
                <Text
                  style={{
                    fontFamily: "MontserratBold",
                    fontSize: 16,
                    color: colors.BLACK_I
                  }}
                >
                  Cadastre-se com e-mail
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 16,
              paddingHorizontal: 42,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flex: 1,
                height: 2,
                backgroundColor: colors.GREY,
                borderRadius: 9999
              }}
            />

            <Text
              style={{
                marginHorizontal: 8,
                fontSize: 16,
                color: colors.WHITE,
                fontFamily: "MontserratMedium",
                lineHeight: 21
              }}
            >
              Ou entre com
            </Text>
            <View
              style={{
                flex: 1,
                height: 2,
                backgroundColor: colors.GREY,
                borderRadius: 9999
              }}
            />
          </View>

          <View
            style={{
              marginTop: 16,
              paddingHorizontal: 42,
              flexDirection: "row",
              alignSelf: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              activeOpacity={DEFAULT_OPACITY}
              onPress={handleSignIn}
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 8,
                backgroundColor: colors.WHITE,
                marginHorizontal: 6,
                borderRadius: 9999
              }}
            >
              {isSigningIn ? (
                <ActivityIndicator
                  color={colors.BLACK_I}
                  style={{ width: 36, height: 36 }}
                />
              ) : (
                <MaterialIcons name="email" size={36} color={colors.BLACK_II} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={DEFAULT_OPACITY}
              onPress={handleGoogleSignIn}
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 8,
                backgroundColor: colors.GOOGLE_AUTH_PINKISH,
                marginHorizontal: 6,
                borderRadius: 9999
              }}
            >
              <MaterialCommunityIcons
                name="gmail"
                size={36}
                color={colors.WHITE}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  )
}
