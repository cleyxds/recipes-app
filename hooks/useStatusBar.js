import { useCallback, useEffect } from "react"

import { StatusBar } from "react-native"

import { useFocusEffect } from "@react-navigation/native"

export function useStatusBar(style = "dark-content") {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(style, true)
    }, [])
  )

  useEffect(() => {
    StatusBar.setBarStyle(style)
  }, [style])
}
