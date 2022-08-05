import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

import { useAuthStore } from "../stores/Auth"

import { MainStack } from "./stacks/main.stack"
import { AuthStack } from "./stacks/auth.stack"

import { DEFAULT_SCREEN_OPTIONS } from "./config"

export function Routes() {
  const { auth } = useAuthStore()

  return (
    <Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
      <>
        {auth?.isAuthenticated ? (
          <Screen name="S.Main" component={MainStack} />
        ) : (
          <Screen name="S.Auth" component={AuthStack} />
        )}
      </>
    </Navigator>
  )
}
