import { View, Text, FlatList, TouchableOpacity } from "react-native"

import Animated, { Extrapolate, interpolate } from "react-native-reanimated"

import { colors } from "../../../utils"

import { DEFAULT_SCREEN_OPTIONS } from "../../../routes/config"

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

const { Navigator, Screen } = createMaterialTopTabNavigator()

function BlankTab() {
  return <View style={{ flex: 1, backgroundColor: colors.BLACK_II }} />
}

function SearchedChefs({ route }) {
  return <View style={{ flex: 1, backgroundColor: colors.BLACK_II }} />
}

export function SearchTabs() {
  return (
    <Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
      <Screen name="T.Recipes" component={BlankTab} />
      <Screen name="T.Chefs" component={SearchedChefs} />
    </Navigator>
  )
}
