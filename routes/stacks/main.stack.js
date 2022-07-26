import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

import { Dashboard } from "../../screens/Dashboard"

export function MainStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="Dashboard" component={Dashboard} />
    </Navigator>
  )
}
