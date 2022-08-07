import { useRef } from "react"

import {
  Animated,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  ScrollView,
  FlatList,
  StyleSheet
} from "react-native"

import { useNavigation } from "@react-navigation/native"

import { useAuthStore } from "../stores/Auth"

import { Screen } from "../components"

import { colors, wait, units } from "../utils"
import { useState } from "react"

const { DEFAULT_OPACITY } = units

export function Home() {
  const { width, height } = useWindowDimensions()
  const { setAuth } = useAuthStore()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const scrollX = useRef(new Animated.Value(0)).current

  async function handleLogout() {
    if (isLoggingOut) return
    setIsLoggingOut(true)

    await wait(1000)

    setAuth({
      isAuthenticated: false
    })

    await wait(300)
    setIsLoggingOut(false)
  }

  function renderLogout() {
    return (
      <TouchableOpacity
        activeOpacity={DEFAULT_OPACITY}
        onPress={handleLogout}
        style={{
          width: 80,
          height: 40,
          paddingHorizontal: 16,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.WHITE,
          borderRadius: 12,
          position: "absolute",
          right: 32,
          top: 32
        }}
      >
        {isLoggingOut ? (
          <ActivityIndicator color={colors.BLACK_I} />
        ) : (
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={{
              fontFamily: "PoppinsSemiBold",
              color: colors.BLACK_I
            }}
          >
            Logout
          </Text>
        )}
      </TouchableOpacity>
    )
  }

  const data = [
    {
      thumbnail:
        "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      description: "Salada no almoço (dieta)",
      likes: 125
    },
    {
      thumbnail:
        "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      description: "Description",
      likes: 591
    },
    {
      thumbnail:
        "https://images.unsplash.com/photo-1604634077373-a279cadc62c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      description: "Panquecas de café da manhã estilo americano",
      likes: 213
    },
    {
      thumbnail:
        "https://images.unsplash.com/photo-1602873520153-ec56ca3c205b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      description: "Feijão carioca receita de familia nordestina",
      likes: 1047
    }
  ]

  return (
    <Screen>
      <ScrollView>
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={data}
            pagingEnabled
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false
              }
            )}
            style={{ height: height * 0.45, backgroundColor: colors.WHITE }}
            renderItem={({ item }) => {
              return (
                <Image
                  source={{ uri: item?.thumbnail }}
                  style={{
                    width,
                    height: height * 0.45,
                    backgroundColor: colors.AUTHENTICATION_BLUE_II
                  }}
                />
              )
            }}
          />

          <FlatList
            data={data}
            horizontal
            snapToOffsets={data.map(
              (_, i) => i * (width * 0.8 - 40) + (i - 1) * 40
            )}
            snapToAlignment="start"
            scrollEventThrottle={16}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            style={{
              width,
              position: "absolute",
              left: 0,
              right: 0,
              bottom: "-8%"
            }}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    marginHorizontal: 10,
                    width: width * 0.8 - 20,
                    height: 165,
                    borderRadius: 12,
                    backgroundColor: "#232220",
                    paddingHorizontal: 16
                  }}
                >
                  <View
                    style={{
                      padding: 8,
                      paddingTop: 16,
                      justifyContent: "space-between",
                      flex: 1
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "MontserratSemiBold",
                        color: "grey"
                      }}
                    >
                      Receitas de final de semana
                    </Text>

                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "PoppinsSemiBold",
                        color: colors.WHITE
                      }}
                    >
                      {item?.description}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={DEFAULT_OPACITY}
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View
                          style={{
                            backgroundColor: colors.WHITE,
                            width: 32,
                            height: 32,
                            borderRadius: 9999,
                            marginRight: 8
                          }}
                        />

                        <Text
                          style={{
                            color: colors.WHITE,
                            fontFamily: "PoppinsSemiBold"
                          }}
                        >
                          ChefeRei
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        activeOpacity={DEFAULT_OPACITY}
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View
                          style={{
                            width: 24,
                            height: 24,
                            backgroundColor: "crimson",
                            borderRadius: 9999,
                            marginRight: 8
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: "DMSansMedium",
                            color: colors.WHITE,
                            fontSize: 16
                          }}
                        >
                          {item?.likes}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )
            }}
          />

          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: "-15%",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            {data?.map((_, index) => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width
              ]
              const outputRange = [0.8, 1.4, 0.8]

              const scale = scrollX.interpolate({
                inputRange,
                outputRange,
                extrapolate: "clamp"
              })

              const backgroundColor = scrollX.interpolate({
                inputRange,
                outputRange: [
                  "rgb(201, 201, 201)",
                  "rgba(255,255,255, 1)",
                  "rgb(201, 201, 201)"
                ],
                extrapolate: "clamp"
              })

              return (
                <Animated.View
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor,
                    borderRadius: 9999,
                    marginHorizontal: 6,
                    transform: [{ scale }]
                  }}
                />
              )
            })}
          </View>
        </View>

        <View style={{ marginTop: "25%" }}>
          <View
            style={{
              paddingHorizontal: 16,
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: colors.WHITE,
                fontSize: 24,
                fontFamily: "PoppinsSemiBold"
              }}
            >
              Receitas de hoje
            </Text>

            <TouchableOpacity>
              <Text
                style={{
                  color: colors.WHITE,
                  fontSize: 13,
                  fontFamily: "PoppinsSemiBold"
                }}
              >
                Ver todas
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={[1, 2, 3, 4]}
              horizontal
              style={{ paddingHorizontal: 16 }}
              renderItem={({ item }) => {
                return (
                  <View>
                    <View
                      style={{
                        marginRight: 6,
                        width: width * 0.5,
                        height: 250,
                        backgroundColor: colors.WHITE,
                        borderRadius: 12
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "MontserratBold",
                        color: colors.WHITE
                      }}
                    >
                      Torrada da Boa
                    </Text>

                    <View
                      style={{ flex: 1, flexDirection: "row", marginTop: 8 }}
                    >
                      <View
                        style={{
                          width: 36,
                          height: 36,
                          backgroundColor: colors.PRODUCT_ORANGE,
                          borderRadius: 9999,
                          marginRight: 12
                        }}
                      />
                      <View>
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: "MontserratRegular",
                            color: colors.WHITE
                          }}
                        >
                          ReiDaTorrada
                        </Text>

                        <Text
                          style={{
                            fontSize: 11,
                            fontFamily: "MontserratRegular",
                            color: colors.WHITE,
                            opacity: 0.6
                          }}
                        >
                          Postado 12h atrás
                        </Text>
                      </View>
                    </View>
                  </View>
                )
              }}
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  )
}
