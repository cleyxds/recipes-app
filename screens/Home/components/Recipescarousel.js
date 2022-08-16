import { useRef } from "react"

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
  useWindowDimensions
} from "react-native"

import { colors, units } from "../../../utils"

const { DEFAULT_OPACITY } = units

export function RecipesCarousel({ data }) {
  const { width, height } = useWindowDimensions()

  const scrollX = useRef(new Animated.Value(0)).current

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false
    }
  )

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        pagingEnabled
        onScroll={onScroll}
        style={{ height: height * 0.45, backgroundColor: colors.WHITE }}
        renderItem={({ item }) => {
          return (
            <Image
              source={{ uri: item?.thumbnail }}
              style={{
                width,
                height: height * 0.45
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
  )
}
