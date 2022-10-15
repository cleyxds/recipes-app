import { useState } from "react"

import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from "react-native"

import { useUserStore } from "../stores/User"
import { useAuthStore } from "../stores/Auth"

import { useNavigation } from "@react-navigation/native"

import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign
} from "@expo/vector-icons"

import { Screen } from "../components"

import { colors, units, wait, user } from "../utils"

const { DEFAULT_OPACITY } = units
const { removeLocalUserCredentials } = user

export function Settings() {
  const { goBack } = useNavigation()
  const { user, clearUser } = useUserStore()
  const { clearAuth } = useAuthStore()

  const options = [
    {
      action: "changePassword",
      text: "Mudar senha"
    },
    {
      action: "account",
      text: "Conta"
    },
    {
      action: "language",
      text: "Idioma",
      variation: "text",
      textName: getUserLanguage()
    },
    {
      action: "getHelp",
      text: "Preciso de ajuda"
    },
    {
      action: "reportProblems",
      text: "Reportar um problema"
    },
    {
      action: "termsOfUser",
      text: "Termos de uso"
    },
    {
      action: "logout",
      text: "Sair da conta",
      variation: "icon",
      iconName: "logout"
    }
  ]

  const [isLoadingAtIndex, setIsLoadingAtIndex] = useState(() =>
    options?.map(() => false)
  )

  function toggleLoadingAtIndex({ index }) {
    setIsLoadingAtIndex(state => {
      const clone = [...state]
      clone[index] = !state[index]
      return clone
    })
  }

  function getUserLanguage() {
    return user?.locale ?? "Desconhecido"
  }

  async function handleSignOut({ index }) {
    if (isLoadingAtIndex[index]) return

    toggleLoadingAtIndex({ index })

    await removeLocalUserCredentials()

    await wait({ ms: 1000 })
    toggleLoadingAtIndex({ index })

    clearAuth()
    clearUser()
  }

  async function handleNotImplemented({ index }) {
    if (isLoadingAtIndex[index]) return

    toggleLoadingAtIndex({ index })

    await wait({ random: true, maxRandomTime: 1000 })

    toggleLoadingAtIndex({ index })
  }

  function handlePressItem({ item, index }) {
    switch (item) {
      case "logout":
        return handleSignOut({ index })

      default:
        return handleNotImplemented({ index })
    }
  }

  function renderCards({ item, index }) {
    const variation = item?.variation ?? "arrow"

    return (
      <View style={{ paddingVertical: 16, paddingHorizontal: 6, flex: 1 }}>
        <TouchableOpacity
          activeOpacity={DEFAULT_OPACITY}
          onPress={() => handlePressItem({ item: item?.action, index })}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontFamily: "MontserratMedium",
                color: colors.WHITE,
                fontSize: 16
              }}
            >
              {item?.text}
            </Text>

            {!isLoadingAtIndex[index] && variation === "icon" && (
              <MaterialIcons
                name={item?.iconName}
                size={24}
                color={colors.WHITE}
              />
            )}

            {isLoadingAtIndex[index] && variation === "icon" && (
              <ActivityIndicator size={24} color={colors.WHITE} />
            )}

            {!isLoadingAtIndex[index] && variation === "arrow" && (
              <AntDesign name="right" size={24} color={colors.WHITE} />
            )}

            {isLoadingAtIndex[index] && variation === "arrow" && (
              <ActivityIndicator size={24} color={colors.WHITE} />
            )}

            {variation === "text" && (
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  color: colors.WHITE,
                  fontSize: 16,
                  lineHeight: 24
                }}
              >
                {item?.textName}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    )
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
          <TouchableOpacity activeOpacity={DEFAULT_OPACITY} onPress={goBack}>
            <Feather
              name="arrow-left"
              size={24}
              color={colors.WHITE}
              style={{ opacity: 1 }}
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
            Configurações
          </Text>

          <TouchableOpacity disabled activeOpacity={DEFAULT_OPACITY}>
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={20}
              color={colors.WHITE}
              style={{ opacity: 0 }}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={options}
          renderItem={renderCards}
          style={{ marginTop: 16 }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: "100%",
                height: 2,
                backgroundColor: colors.GREY_I
              }}
            />
          )}
        />
      </View>
    </Screen>
  )
}
