import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

import { AuthStack } from "./stacks/auth.stack"

export function Routes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="SAuth" component={AuthStack} />
    </Navigator>
  )
}
