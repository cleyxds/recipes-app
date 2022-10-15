import {
  createStackNavigator,
  CardStyleInterpolators
} from "@react-navigation/stack"

const { Navigator, Screen, Group } = createStackNavigator()

import { useAuthStore } from "../stores/Auth"

import { Settings } from "../screens"

import { CategoriesDetails, Followers } from "../screens/Details"

import { MainTabs } from "./tabs/main.tabs"
import { AuthStack } from "./stacks/auth.stack"
import { RecipeRecord, RecipeSteps } from "../screens/Create/screens"

import { DEFAULT_SCREEN_OPTIONS } from "./config"
import { WALKTHROUGH_TRANSITION } from "./transitions"
import { CreateStack } from "./stacks/create.stack"

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

            <Screen name="S.Settings" component={Settings} />

            <Group
              screenOptions={{
                gestureEnabled: true,
                gestureDirection: "vertical",
                cardStyle: { marginTop: 16 },
                cardStyleInterpolator:
                  CardStyleInterpolators.forModalPresentationIOS
              }}
            >
              <Screen name="S.Create" component={CreateStack} />

              <Screen
                name="S.RecipeSteps"
                options={{ cardStyle: { marginTop: 0 }, gestureEnabled: false }}
                component={RecipeSteps}
              />
              <Group
                screenOptions={{
                  ...WALKTHROUGH_TRANSITION,
                  gestureEnabled: false,
                  cardStyle: { marginTop: 0 }
                }}
              >
                <Screen
                  options={{ gestureEnabled: true }}
                  name="S.RecipeRecord"
                  component={RecipeRecord}
                />
              </Group>
            </Group>
          </>
        ) : (
          <Screen name="S.Auth" component={AuthStack} />
        )}
      </>
    </Navigator>
  )
}
