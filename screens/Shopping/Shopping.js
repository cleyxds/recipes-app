import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"

import { OptimizedScrollView, Screen } from "../../components"

import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons"

import { colors, units } from "../../utils"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import { useCallback, useRef } from "react"

const { DEFAULT_OPACITY } = units

const { width, height } = Dimensions.get("window")

export function Shopping() {
  const navigation = useNavigation()
  const { navigate } = navigation

  const shoppingListRef = useRef(null)

  function INIT_ANIMATION() {
    shoppingListRef.current?.scrollToOffset({ animated: true, offset: 32 })

    const timeoutId = setTimeout(() => {
      shoppingListRef.current?.scrollToOffset({ animated: true, offset: 0 })
    }, 500)

    return () => {
      clearTimeout(timeoutId)
      shoppingListRef.current?.scrollToIndex({ animated: false, index: 0 })
    }
  }

  useFocusEffect(useCallback(INIT_ANIMATION, []))

  function renderItem({ item, index }) {
    return (
      <View
        style={{
          width: width * 0.9,
          height: height * 0.6,
          backgroundColor: colors.GREY,
          marginRight: 32,
          borderRadius: 20,
          overflow: "hidden"
        }}
      >
        <View>
          <View
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 9999
            }}
          >
            <TouchableOpacity
              activeOpacity={DEFAULT_OPACITY}
              onPress={() => handleDeleteFromShoppingList({ item, index })}
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                backgroundColor: colors.GREY,
                borderRadius: 9999
              }}
            >
              <FontAwesome name="trash" size={10} color={colors.WHITE} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: "flex-end",
              padding: 16,
              height: 125
            }}
          >
            <LinearGradient
              colors={["rgba(0, 0, 0, .8)", "rgba(0, 0, 0, 0)"]}
              start={{ x: 0, y: 1.2 }}
              end={{ x: 0, y: 0 }}
              style={[StyleSheet.absoluteFillObject, { zIndex: 9998 }]}
            />

            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              }}
              style={StyleSheet.absoluteFillObject}
            />

            <Text
              style={{
                fontFamily: "MontserratMedium",
                fontSize: 24,
                letterSpacing: -2,
                color: colors.WHITE,
                paddingHorizontal: 16,
                zIndex: 9999
              }}
            >
              Raspberry Cheese Cake Dessert
            </Text>
          </View>
        </View>

        <OptimizedScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16 }}
        >
          {Array(7)
            .fill(false)
            ?.map((_, index) => (
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: index === 20 - 1 ? 0 : 16
                }}
              >
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 9999,
                    backgroundColor: colors.ORANGE_NAVIGATION
                  }}
                />
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{
                    fontFamily: "MontserratMedium",
                    fontSize: 24,
                    letterSpacing: -2,
                    color: colors.WHITE,
                    paddingHorizontal: 16
                  }}
                >
                  70g shredded wheatmeal biscuits
                </Text>
              </View>
            ))}
        </OptimizedScrollView>
      </View>
    )
  }

  function handleDeleteFromShoppingList({ item, index }) {
    alert(`index ${index} deleted from the list`)
  }

  function goToSettings() {
    navigate("S.Settings")
  }

  return (
    <Screen>
      <View
        style={{
          flex: 1,
          paddingTop: 20,
          backgroundColor: colors.GREY_I
        }}
      >
        <TouchableOpacity
          activeOpacity={DEFAULT_OPACITY}
          onPress={goToSettings}
          style={{ alignSelf: "flex-end", paddingHorizontal: 16 }}
        >
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={20}
            color={colors.WHITE}
          />
        </TouchableOpacity>

        <View style={{ flex: 1, paddingTop: 32 }}>
          <Text
            style={{
              fontFamily: "MontserratMedium",
              fontSize: 38,
              letterSpacing: -2,
              color: colors.WHITE,
              paddingHorizontal: 16
            }}
          >
            Lista de compras
          </Text>

          <FlatList
            ref={shoppingListRef}
            horizontal
            keyExtractor={(_, index) => `${index}`}
            showsHorizontalScrollIndicator={false}
            data={Array(2).fill(false)}
            pagingEnabled
            renderItem={renderItem}
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 32 }}
          />
        </View>
      </View>
    </Screen>
  )
}
