import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

import { Welcome } from "../../screens/Welcome"

export function MainStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="MainWelcome" component={Welcome} />
    </Navigator>
  )
}
