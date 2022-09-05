import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

import { Create } from "../../screens"

import { DEFAULT_SCREEN_OPTIONS } from "../config"

export function CreateStack() {
  return (
    <Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
      <Screen name="S.Create" component={Create} />
    </Navigator>
  )
}
