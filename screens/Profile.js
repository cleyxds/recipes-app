import { useState } from "react"

import { Text, TextInput, TouchableOpacity, View } from "react-native"

import { useNavigation } from "@react-navigation/native"

import { useUserStore } from "../stores/User"
import { useAuthStore } from "../stores/Auth"

import { Feather, MaterialCommunityIcons, Entypo } from "@expo/vector-icons"

import { Screen, OptimizedImage } from "../components"

import { colors, units, getImage } from "../utils"
import { config } from "../utils/constants"

const { DEFAULT_OPACITY } = units

export function Profile() {
  const { navigate, goBack } = useNavigation()
  const { user, setUser } = useUserStore()
  const { auth } = useAuthStore()

  const [isUploadingAvatarImage, setIsUploadingAvatarImage] = useState(false)

  async function handleUploadImage() {
    setIsUploadingAvatarImage(true)

    try {
      const responseImage = await getImage()

      const sendImageForm = new FormData()

      const uriParts = responseImage.uri.split(".")
      const fileType = uriParts[uriParts?.length - 1]

      const imageFile = {
        uri: responseImage.uri,
        name: `${user?.id}-avatar_url.${fileType}`,
        type: `image/${fileType}`
      }

      sendImageForm.append("avatar_url", imageFile)

      const response = await fetch(
        `${config.API_URL}upload/users/${user?.id}`,
        {
          method: "PUT",
          body: sendImageForm,
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`
          }
        }
      )

      if (!response.ok) throw new Error("ResponseNotOk")

      const data = await response.json()

      setUser(data)
    } catch (error) {
      if (error.message === "Error: launchImageLibraryAsync cancelled") return

      alert(
        "Ocorreu um erro ao tentar a fixar imagem 😢, por favor tente novamente."
      )
    } finally {
      setIsUploadingAvatarImage(false)
    }
  }

  function handleNavigateSettings() {
    navigate("S.Settings")
  }

  return (
    <Screen>
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
              <OptimizedImage
                isUpdating={isUploadingAvatarImage}
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
                  left: "70%",
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
    </Screen>
  )
}
