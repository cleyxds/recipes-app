import { createStackNavigator } from "@react-navigation/stack"

const { Navigator, Screen } = createStackNavigator()

import {
  Welcome,
  Bill,
  Payments,
  Insights,
  Communications
} from "../screens/Walkthrough"

export function Routes() {
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
    </Navigator>
  )
}
