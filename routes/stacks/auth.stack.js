import {
  createStackNavigator,
  CardStyleInterpolators
} from "@react-navigation/stack"

const { Navigator, Screen, Group } = createStackNavigator()

import { Walkthrough } from "../../screens/Authentication"
import { AuthLoading } from "../../screens"

import {
  PrivacyPolicy,
  TermsAndConditions
} from "../../screens/Authentication/components"

import { DEFAULT_SCREEN_OPTIONS } from "../config"

export function AuthStack() {
  return (
    <Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
      <Screen name="Loading" component={AuthLoading} />
      <Screen name="Walkthrough" component={Walkthrough} />

      <Group
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "vertical",
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS
        }}
      >
        <Screen name="PrivPol" component={PrivacyPolicy} />
        <Screen name="TermAndCond" component={TermsAndConditions} />
      </Group>
    </Navigator>
  )
}
