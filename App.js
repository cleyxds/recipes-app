import "react-native-gesture-handler"

import { useEffect } from "react"

import * as Linking from "expo-linking"

import { ActivityIndicator, StatusBar } from "react-native"

import { NavigationContainer } from "@react-navigation/native"

import { useLocalFonts } from "./hooks"

import { StatusBarWrapper } from "./components"

import { Routes } from "./routes"

import { colors } from "./utils"
import { isAndroid, isIOS } from "./utils/constants"

export default function App() {
  const { fontsLoaded } = useLocalFonts()

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={colors.ORANGE_NAVIGATION} />
  }

  return (
    <NavigationContainer>
      {isAndroid && <StatusBar backgroundColor={colors.BLACK_I} />}
      {isIOS && <StatusBarWrapper />}
      <Routes />
    </NavigationContainer>
  )
}
