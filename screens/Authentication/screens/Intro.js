import { View, Text, Image, useWindowDimensions } from "react-native"

import { Screen } from "../../../components"

import { colors } from "../../../utils"

import FeijoadaImage from "../../../assets/images/Walkthrough/Feijoada.png"

export function Intro() {
  const { width } = useWindowDimensions()

  return (
    <Screen>
      <View style={{ height: "70%" }}>
        <Image
          source={FeijoadaImage}
          style={{
            transform: [{ scale: 0.6 }, { translateX: -width * 0.34 }]
          }}
        />
        <View
          style={{
            marginTop: "-15%",
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
            Videos de receita passo-a-passo
          </Text>
        </View>
      </View>
    </Screen>
  )
}
