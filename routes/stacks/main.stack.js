import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

import { Dashboard, Product } from "../../screens"

export function MainStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="Product" component={Product} />
    </Navigator>
  )
}
