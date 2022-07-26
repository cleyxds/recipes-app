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

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01
  }
}

export function AuthStack() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Group
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          transitionSpec: {
            open: config,
            close: config
          },
          cardStyleInterpolator: ({ current, next, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: next
                      ? next.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -layouts.screen.width],
                          extrapolate: "clamp"
                        })
                      : current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [layouts.screen.width, 0],
                          extrapolate: "clamp"
                        })
                  }
                ]
              }
            }
          }
        }}
      >
        <Screen name="Welcome" component={Welcome} />
        <Screen name="Bill" component={Bill} />
        <Screen name="Payments" component={Payments} />
        <Screen name="Insights" component={Insights} />
        <Screen name="Communications" component={Communications} />
      </Group>

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
