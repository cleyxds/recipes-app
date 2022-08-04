import "react-native-gesture-handler"

import { StatusBar } from "react-native"

import { NavigationContainer } from "@react-navigation/native"

import AppLoading from "expo-app-loading"

import { useLocalFonts } from "./hooks"

import { StatusBarWrapper } from "./components"

import { Routes } from "./routes"

import { colors } from "./utils"
import { isAndroid, isIOS } from "./utils/constants"

export default function App() {
  const { fontsLoaded } = useLocalFonts()

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <NavigationContainer>
      {isAndroid && <StatusBar backgroundColor={colors.BLACK_I} />}
      {isIOS && <StatusBarWrapper />}
      <Routes />
    </NavigationContainer>
  )
}
