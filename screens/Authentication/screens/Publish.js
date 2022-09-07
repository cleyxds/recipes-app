import { View, Text, Image, useWindowDimensions } from "react-native"

import { Screen } from "../../../components"

import { colors } from "../../../utils"

import FeijoadaImage from "../../../assets/images/Walkthrough/Feijoada.png"

export function Publish() {
  const { height } = useWindowDimensions()

  return (
    <Screen>
      <>
        <View
          style={{
            height: height * 0.4,
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
            Publique suas próprias receitas secretas
          </Text>
        </View>
      </>
    </Screen>
  )
}
