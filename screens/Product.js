import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native"

import { getStatusBarHeight } from "react-native-status-bar-height"

import DefaultProductImage from "../assets/images/Product/DefaultProduct.png"

import { DEFAULT_OPACITY } from "../utils/units"
import colors from "../utils/colors"

export function Product() {
  const { width, height } = useWindowDimensions()

  const DEFAULT_PRICE = 150

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: colors.AUTHENTICATION_BLUE_II }
        ]}
      >
        <View
          style={{
            paddingTop: getStatusBarHeight(true),
            flex: 1
          }}
        >
          <Image source={DefaultProductImage} style={{ width, height: 352 }} />

          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 36.19,
              paddingTop: 27,
              paddingHorizontal: 24
            }}
            style={{
              flex: 1,
              borderTopLeftRadius: 38,
              borderTopRightRadius: 38,
              minHeight: height * 0.7,
              backgroundColor: colors.AUTHENTICATION_BLUE_II,
              marginTop: -32
            }}
          >
            <TextInput
              placeholderTextColor={colors.WHITE}
              placeholder="Name of the product"
              style={{
                color: colors.WHITE,
                fontFamily: "MontserratSemiBold",
                fontSize: 16,
                lineHeight: 19.5,
                letterSpacing: 0.1
              }}
            />

            <TextInput
              placeholderTextColor={colors.PRODUCT_ORANGE}
              placeholder={`$${DEFAULT_PRICE.toFixed(2)}`}
              style={{
                marginTop: 13,
                color: colors.PRODUCT_ORANGE,
                fontFamily: "MontserratSemiBold",
                fontSize: 20,
                lineHeight: 24.38,
                letterSpacing: 0.5
              }}
            />
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
