import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

import { Home } from "../../screens"
import { CategoriesDetails } from "../../screens/Details/Categories"

import { DEFAULT_SCREEN_OPTIONS } from "../config"

export function MainStack() {
  return (
    <Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
      <Screen name="S.Home" component={Home} />
      <Screen name="S.CategoriesDetails" component={CategoriesDetails} />
    </Navigator>
  )
}
