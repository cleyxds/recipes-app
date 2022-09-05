import { View, Text, Image, useWindowDimensions } from "react-native"

import { Screen } from "../../../components"

import { colors } from "../../../utils"

import StrogonoffImage from "../../../assets/images/Walkthrough/Strogonoff.png"

export function Discover() {
  const { height } = useWindowDimensions()

  return (
    <Screen>
      <>
        <View
          style={{
            height: height * 0.5,
            backgroundColor: colors.WHITE,
            marginBottom: "15%"
          }}
        />

        <View
          style={{
            paddingHorizontal: 32,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "MontserratBold",
              fontSize: 24,
              color: colors.WHITE
            }}
          >
            Descubra receitas deliciosas todos os dias
          </Text>
        </View>
      </>
    </Screen>
  )
}
