import { View, FlatList, ActivityIndicator, Text } from "react-native"

import { renderFollowerCard } from "../../Details/Followers"

import { colors } from "../../../utils"

import { DEFAULT_SCREEN_OPTIONS } from "../../../routes/config"

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

const { Navigator, Screen } = createMaterialTopTabNavigator()

function Recipes() {
  const recipes = [
    {
      name: "Pão de queijo"
    },
    {
      name: "Queijadinha"
    },
    {
      name: "Pão de queijo mineiro (receita de família)"
    },
    {
      name: "Bolo de casamento"
    },
    {
      name: "Pão de queijo"
    },
    {
      name: "Queijadinha"
    },
    {
      name: "Pão de queijo mineiro (receita de família)"
    },
    {
      name: "Bolo de casamento"
    },
    {
      name: "Torta de maçã"
    }
  ]

  return (
    <FlatList
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16
      }}
      style={{ backgroundColor: colors.BLACK_II }}
      data={recipes}
      ListEmptyComponent={() => <ActivityIndicator color={colors.WHITE} />}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return renderFollowerCard({ item, index }, "recipes")
      }}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 1.5,
            backgroundColor: colors.GREY,
            opacity: 0.7,
            borderRadius: 9999
          }}
        />
      )}
    />
  )
}

function Chefs() {
  const followersData = [
    {
      name: "RainhaDoMolho",
      avatar_url: "https://randomuser.me/api/portraits/women/93.jpg",
      isFollowing: false,
      isOnlne: true
    },
    {
      name: "JaneteJoanaJJ",
      avatar_url: "https://randomuser.me/api/portraits/women/27.jpg",
      isFollowing: false,
      isOnlne: false
    },
    {
      name: "RoqueiroMaluco",
      avatar_url: "https://randomuser.me/api/portraits/men/6.jpg",
      isFollowing: false,
      isOnlne: false
    },
    {
      name: "MarcoSSix",
      avatar_url: "https://randomuser.me/api/portraits/men/12.jpg",
      isFollowing: true,
      isOnlne: true
    }
  ]

  return (
    <FlatList
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 32
      }}
      style={{ backgroundColor: colors.BLACK_II }}
      data={followersData}
      ListEmptyComponent={() => <ActivityIndicator color={colors.WHITE} />}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return renderFollowerCard({ item, index })
      }}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 1.5,
            backgroundColor: colors.GREY,
            opacity: 0.7,
            borderRadius: 9999
          }}
        />
      )}
    />
  )
}

export function SearchTabs() {
  return (
    <Navigator
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor: colors.WHITE,
        tabBarActiveTintColor: colors.PRODUCT_ORANGE,
        /* tabBarIndicatorContainerStyle: {
          backgroundColor: colors.WHITE,
          height: 2,
          alignSelf: "flex-end"
        }, */
        tabBarIndicatorStyle: { backgroundColor: colors.PRODUCT_ORANGE },
        tabBarStyle: { backgroundColor: colors.BLACK_II },
        tabBarLabel: ({ focused, color }) => {
          const routeName = route.name.replace("T.", "")

          return (
            <Text style={{ fontFamily: "MontserratBold", color }}>
              {routeName}
            </Text>
          )
        }
      })}
    >
      <Screen name="T.Receitas" component={Recipes} />
      <Screen name="T.Chefs" component={Chefs} />
    </Navigator>
  )
}
