import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

import { Home } from "../../screens"
import { CategoriesDetails, Followers } from "../../screens/Details"

import { DEFAULT_SCREEN_OPTIONS } from "../config"

export function MainStack() {
  return (
    <Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
      <Screen name="S.Home" component={Home} />
      <Screen name="S.CategoriesDetails" component={CategoriesDetails} />
      <Screen name="S.Followers" component={Followers} />
    </Navigator>
  )
}
