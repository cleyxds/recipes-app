import "react-native-gesture-handler"

import { NavigationContainer } from "@react-navigation/native"

import { StatusBarWrapper } from "./components"

import { Routes } from "./routes"

export default function App() {
  return (
    <NavigationContainer>
      <StatusBarWrapper />
      <Routes />
    </NavigationContainer>
  )
}
