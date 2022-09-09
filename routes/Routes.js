import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen, Group } = createStackNavigator()

import { useAuthStore } from "../stores/Auth"

import { CategoriesDetails, Followers } from "../screens/Details"

import { MainTabs } from "./tabs/main.tabs"
import { AuthStack } from "./stacks/auth.stack"
import { RecipeRecord, RecipeSteps } from "../screens/Create/screens"

import { DEFAULT_SCREEN_OPTIONS } from "./config"
import { WALKTHROUGH_TRANSITION } from "./transitions"

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

            <Group
              screenOptions={{
                ...WALKTHROUGH_TRANSITION,
                gestureEnabled: false
              }}
            >
              <Screen name="S.RecipeSteps" component={RecipeSteps} />
              <Screen name="S.RecipeRecord" component={RecipeRecord} />
            </Group>
          </>
        ) : (
          <Screen name="S.Auth" component={AuthStack} />
        )}
      </>
    </Navigator>
  )
}
