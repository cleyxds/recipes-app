import "react-native-gesture-handler"

import { StatusBar } from "react-native"

import { NavigationContainer } from "@react-navigation/native"

import { StatusBarWrapper } from "./components"

import { Routes } from "./routes"

import colors from "./utils/colors"
import { isAndroid } from "./utils/constants"

export default function App() {
  return (
    <NavigationContainer>
      {isAndroid && <StatusBar backgroundColor={colors.WALKTHROUGH_BLUE} />}
      <StatusBarWrapper />
      <Routes />
    </NavigationContainer>
  )
}
