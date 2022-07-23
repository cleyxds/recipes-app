import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

import {
  Welcome,
  Bill,
  Payments,
  Insights,
  Communications
} from "../../screens/Walkthrough"

import { Login, Register } from "../../screens/Authentication"

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
    </Navigator>
  )
}
