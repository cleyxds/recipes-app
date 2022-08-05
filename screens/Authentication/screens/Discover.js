import { View, Text, Image, useWindowDimensions } from "react-native"

import { Screen } from "../../../components"

import { colors } from "../../../utils"

import StrogonoffImage from "../../../assets/images/Walkthrough/Strogonoff.png"

export function Discover() {
  const { width } = useWindowDimensions()

  return (
    <Screen>
      <View style={{ height: "70%" }}>
        <Image
          source={StrogonoffImage}
          style={{
            marginTop: 72,
            transform: [{ scale: 0.5 }, { translateX: -width * 0.75 }]
          }}
        />
        <View
          style={{
            marginTop: "-3%",
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
      </View>
    </Screen>
  )
}
