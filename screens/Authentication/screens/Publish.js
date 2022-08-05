import { View, Text, Image, useWindowDimensions } from "react-native"

import { Screen } from "../../../components"

import { colors } from "../../../utils"

import FeijoadaImage from "../../../assets/images/Walkthrough/Feijoada.png"

export function Publish() {
  const { width } = useWindowDimensions()

  return (
    <Screen>
      <Image
        source={FeijoadaImage}
        style={{
          transform: [{ scale: 0.6 }, { translateX: -width * 0.31 }]
        }}
      />
      <View
        style={{
          marginTop: 32,
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
          Publique suas próprias receitas secretas
        </Text>
      </View>
    </Screen>
  )
}
