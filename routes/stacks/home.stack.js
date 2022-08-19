import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

import { Home } from "../../screens"

import { DEFAULT_SCREEN_OPTIONS } from "../config"

export function HomeStack() {
  return (
    <Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
      <Screen name="S.Home" component={Home} />
    </Navigator>
  )
}
