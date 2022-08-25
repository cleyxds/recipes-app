import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

import { Profile, Settings } from "../../screens"

import { DEFAULT_SCREEN_OPTIONS } from "../config"

export function ProfileStack() {
  return (
    <Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
      <Screen name="S.Profile" component={Profile} />
      <Screen name="S.Settings" component={Settings} />
    </Navigator>
  )
}
