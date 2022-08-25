import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native"

import { useNavigation } from "@react-navigation/native"

import { useUserStore } from "../stores/User"

import { Feather, MaterialCommunityIcons, Entypo } from "@expo/vector-icons"

import { Screen } from "../components"

import { colors, units } from "../utils"
import { config } from "../utils/constants"

const { DEFAULT_OPACITY } = units

export function Profile() {
  const { navigate, goBack } = useNavigation()
  const { user } = useUserStore()

  async function handleUploadImage() {}
  function handleNavigateSettings() {
    navigate("S.Settings")
  }

  return (
    <Screen>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <View
            style={{
              marginTop: 32,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              disabled
              activeOpacity={DEFAULT_OPACITY}
              onPress={goBack}
            >
              <Feather
                name="arrow-left"
                size={24}
                color={colors.WHITE}
                style={{ opacity: 0 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: "PoppinsSemiBold",
                fontSize: 18,
                lineHeight: 21,
                color: colors.WHITE
              }}
            >
              Conta
            </Text>

            <TouchableOpacity
              activeOpacity={DEFAULT_OPACITY}
              onPress={handleNavigateSettings}
            >
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={20}
                color={colors.WHITE}
              />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 32 }}>
            <View style={{ alignSelf: "center" }}>
              <TouchableOpacity
                activeOpacity={DEFAULT_OPACITY}
                onPress={handleUploadImage}
              >
                <Image
                  source={{
                    uri: user?.profile?.avatar_url.replace(
                      "http://localhost:3333/",
                      config.API_URL
                    )
                  }}
                  style={{ width: 128, height: 128, borderRadius: 9999 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={DEFAULT_OPACITY}
                onPress={handleUploadImage}
              >
                <View
                  style={{
                    position: "absolute",
                    left: 100,
                    right: 0,
                    bottom: 0,
                    width: 28,
                    height: 28,
                    backgroundColor: colors.PRODUCT_ORANGE,
                    borderRadius: 9999,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Entypo name="plus" size={24} color={colors.WHITE} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 32 }}>
            <View>
              <Text
                style={{
                  fontFamily: "MontserratSemiBold",
                  fontSize: 14,
                  color: colors.WHITE
                }}
              >
                Nome de usuário
              </Text>

              <TextInput
                editable={false}
                value={`${user?.profile?.firstName} ${user?.profile?.lastName}`}
                style={{
                  marginTop: 8,
                  borderRadius: 8,
                  padding: 16,
                  backgroundColor: colors.GREY_I,
                  fontFamily: "MontserratBold",
                  fontSize: 14,
                  color: colors.WHITE
                }}
              />
            </View>

            <View style={{ marginTop: 16 }}>
              <Text
                style={{
                  fontFamily: "MontserratSemiBold",
                  fontSize: 14,
                  color: colors.WHITE
                }}
              >
                Email
              </Text>

              <TextInput
                editable={false}
                value={user?.profile?.email}
                style={{
                  marginTop: 8,
                  borderRadius: 8,
                  padding: 16,
                  backgroundColor: colors.GREY_I,
                  fontFamily: "MontserratBold",
                  fontSize: 14,
                  color: colors.WHITE
                }}
              />
            </View>

            <View style={{ marginTop: 16 }}>
              <Text
                style={{
                  fontFamily: "MontserratSemiBold",
                  fontSize: 14,
                  color: colors.WHITE
                }}
              >
                Sobre
              </Text>

              <TextInput
                editable={false}
                value=""
                style={{
                  marginTop: 8,
                  height: "40%",
                  borderRadius: 8,
                  padding: 16,
                  backgroundColor: colors.GREY_I,
                  fontFamily: "MontserratBold",
                  fontSize: 14,
                  color: colors.WHITE
                }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  )
}
