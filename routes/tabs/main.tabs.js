import { View } from "react-native"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

const { Navigator, Screen } = createBottomTabNavigator()

import { Screen as ScreenComponent } from "../../components"

import { HomeStack } from "../stacks/home.stack"
import { SearchStack } from "../stacks/search.stack"

import { DEFAULT_SCREEN_OPTIONS } from "../config"

export function MainTabs() {
  function BlankTab() {
    return <ScreenComponent />
  }

  return (
    <Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
      <Screen name="T.Home" component={HomeStack} />
      <Screen name="T.Search" component={SearchStack} />
      <Screen name="T.Create" component={BlankTab} />
      <Screen name="T.Shopping" component={BlankTab} />
      <Screen name="T.Profile" component={BlankTab} />
    </Navigator>
  )
}
