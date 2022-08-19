import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

import { useAuthStore } from "../stores/Auth"

import { CategoriesDetails, Followers } from "../screens/Details"

import { MainTabs } from "./tabs/main.tabs"
import { AuthStack } from "./stacks/auth.stack"

import { DEFAULT_SCREEN_OPTIONS } from "./config"

export function Routes() {
  const { auth } = useAuthStore()

  return (
    <Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
      <>
        {auth?.isAuthenticated ? (
          <>
            <Screen name="T.Main" component={MainTabs} />
            <Screen name="S.CategoriesDetails" component={CategoriesDetails} />
            <Screen name="S.Followers" component={Followers} />
          </>
        ) : (
          <Screen name="S.Auth" component={AuthStack} />
        )}
      </>
    </Navigator>
  )
}
