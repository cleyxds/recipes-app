import {
  createStackNavigator,
  CardStyleInterpolators
} from "@react-navigation/stack"

const { Navigator, Screen, Group } = createStackNavigator()

import { Walkthrough } from "../../screens/Walkthrough"
import { Login, Register } from "../../screens/Authentication"

import {
  PrivacyPolicy,
  TermsAndConditions
} from "../../screens/Authentication/components"

export function AuthStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="Walkthrough" component={Walkthrough} />

      <Screen name="Login" component={Login} />
      <Screen name="Register" component={Register} />

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
