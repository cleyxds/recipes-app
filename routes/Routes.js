import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

import { MainStack } from "./stacks/main.stack"

export function Routes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {/* <Screen name="S.Auth" component={AuthStack} /> */}
      <Screen name="S.Main" component={MainStack} />
    </Navigator>
  )
}
