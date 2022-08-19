import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

import { Search } from "../../screens"

import { DEFAULT_SCREEN_OPTIONS } from "../config"

export function SearchStack() {
  return (
    <Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
      <Screen name="S.Search" component={Search} />
    </Navigator>
  )
}
