import { Text, View } from "react-native"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

const { Navigator, Screen } = createBottomTabNavigator()

import { Screen as ScreenComponent } from "../../components"

import { HomeStack } from "../stacks/home.stack"
import { SearchStack } from "../stacks/search.stack"
import { ProfileStack } from "../stacks/profile.stack"
import { CreateStack } from "../stacks/create.stack"

import {
  AntDesign,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons
} from "@expo/vector-icons"

import { DEFAULT_SCREEN_OPTIONS } from "../config"
import { colors } from "../../utils"

function renderTabLabels({ route, color }) {
  const isTabActive = color === colors.PRODUCT_ORANGE

  const tabLabelColorCondition = isTabActive
    ? colors.PRODUCT_ORANGE
    : colors.WHITE

  function renderLabel(label) {
    const parseTextStyle = ({ label }) => {
      if (label === "Criar") return { fontFamily: "MontserratBold" }

      if (isTabActive) return { fontFamily: "MontserratSemiBold" }

      return { fontFamily: "MontserratMedium" }
    }

    const { fontFamily } = parseTextStyle({ label })

    return (
      <Text
        style={{
          fontFamily,
          fontSize: 14,
          lineHeight: 16,
          marginBottom: 12,
          color: tabLabelColorCondition
        }}
      >
        {label}
      </Text>
    )
  }

  switch (route?.name) {
    case "T.Home":
      return renderLabel("Início")

    case "T.Search":
      return renderLabel("Pesquisa")

    case "T.Create":
      return renderLabel("Criar")

    case "T.Shopping":
      return renderLabel("Shopping")

    case "T.Profile":
      return renderLabel("Perfil")
  }
}

function renderTabIcons({ route, color }) {
  const isTabActive = color === colors.PRODUCT_ORANGE

  const tabIconColorCondition = isTabActive
    ? colors.PRODUCT_ORANGE
    : colors.WHITE

  switch (route?.name) {
    case "T.Home":
      return <AntDesign name="home" size={24} color={tabIconColorCondition} />

    case "T.Search":
      return (
        <MaterialCommunityIcons
          name="magnify"
          size={24}
          color={tabIconColorCondition}
        />
      )

    case "T.Create":
      return (
        <Feather name="plus-circle" size={32} color={tabIconColorCondition} />
      )

    case "T.Shopping":
      return (
        <MaterialIcons name="receipt" size={24} color={tabIconColorCondition} />
      )

    case "T.Profile":
      return <Feather name="user" size={24} color={tabIconColorCondition} />
  }
}

export function MainTabs() {
  const parseTabBarHeight = false ? 75 + 32 : 75

  const uri =
    "https://s3.amazonaws.com/exp-icon-assets/ExpoEmptyManifest_192.png"

  function BlankTab() {
    return <ScreenComponent />
  }

  return (
    <Navigator
      screenOptions={({ route }) => ({
        ...DEFAULT_SCREEN_OPTIONS,
        tabBarActiveTintColor: colors.PRODUCT_ORANGE,
        tabBarInactiveTintColor: colors.WHITE,
        tabBarStyle: {
          borderTopWidth: 0,
          shadowColor: colors.black,
          elevation: 10,
          shadowOpacity: 0.1,
          height: parseTabBarHeight
        },
        tabBarIcon: ({ color }) => renderTabIcons({ route, color }),
        tabBarLabel: ({ color }) => renderTabLabels({ route, color }),
        tabBarBackground: () => (
          <View style={{ flex: 1, backgroundColor: colors.BLACK_I }} />
        )
      })}
    >
      <Screen name="T.Home" component={HomeStack} />
      <Screen name="T.Search" component={SearchStack} />
      <Screen
        name="T.Create"
        component={CreateStack}
        listeners={({ navigation }) => ({
          tabPress: event => {
            event.preventDefault()
            navigation.navigate("S.Create")
          }
        })}
      />
      <Screen name="T.Shopping" component={BlankTab} />
      <Screen name="T.Profile" component={ProfileStack} />
    </Navigator>
  )
}
