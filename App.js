import "react-native-gesture-handler"

import { StatusBar } from "react-native"

import { SWRConfig } from "swr"

import { NavigationContainer } from "@react-navigation/native"

import { StatusBarWrapper } from "./components"

import { Routes } from "./routes"

import colors from "./utils/colors"
import { fetcher } from "./utils/fetcher"
import { isAndroid } from "./utils/constants"

export default function App() {
  return (
    <SWRConfig
      value={{
        fetcher
      }}
    >
      <NavigationContainer>
        {isAndroid && <StatusBar backgroundColor={colors.WALKTHROUGH_BLUE} />}
        <StatusBarWrapper />
        <Routes />
      </NavigationContainer>
    </SWRConfig>
  )
}
