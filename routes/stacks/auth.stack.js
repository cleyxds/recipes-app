import {
  createStackNavigator,
  CardStyleInterpolators
} from "@react-navigation/stack"

const { Navigator, Screen, Group } = createStackNavigator()

import {
  Welcome,
  Bill,
  Payments,
  Insights,
  Communications
} from "../../screens/Walkthrough"

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
      <Screen name="Welcome" component={Welcome} />
      <Screen name="Bill" component={Bill} />
      <Screen name="Payments" component={Payments} />
      <Screen name="Insights" component={Insights} />
      <Screen name="Communications" component={Communications} />
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
