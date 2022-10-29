import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

import { Shopping } from "../../screens/Shopping"

import { DEFAULT_SCREEN_OPTIONS } from "../config"

export function ShoppingStack() {
  return (
    <Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
      <Screen name="S.Shopping" component={Shopping} />
    </Navigator>
  )
}
