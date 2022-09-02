import { useRef } from "react"

import {
  View,
  FlatList,
  useWindowDimensions,
  StyleSheet,
  Animated
} from "react-native"

import { Intro, Discover, Publish, Auth } from "./screens"

export function Walkthrough() {
  const { width, height } = useWindowDimensions()

  const scrollX = useRef(new Animated.Value(0)).current

  const DOT_SIZE = 8
  const DOT_SPACING = 12

  function renderScreen({ index }) {
    if (index === 0) return Container(Intro)
    if (index === 1) return Container(Discover)
    if (index === 2) return Container(Publish)
    if (index === 3) return Container(Auth)
  }

  function Container(Screen) {
    return (
      <View style={styles.container(width, height)}>
        <Screen />
      </View>
    )
  }

  const data = [1, 2, 3, 4]

  return (
    <>
      <FlatList
        bounces={false}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false
          }
        )}
        data={data}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={props => renderScreen({ ...props, length: data?.length })}
      />

      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "10%",
          justifyContent: "center",
          flexDirection: "row"
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
              "rgb(64, 64, 64)",
              "rgba(255,255,255, 1)",
              "rgb(201, 201, 201)"
            ],
            extrapolate: "clamp"
          })

          return (
            <Animated.View
              key={index}
              style={{
                width: DOT_SIZE,
                height: DOT_SIZE,
                backgroundColor,
                borderRadius: 9999,
                marginRight: DOT_SPACING,
                transform: [{ scale }]
              }}
            />
          )
        })}
        {/* <View
          style={{
            position: "absolute",
            left: -DOT_SIZE * 0.5,
            width: DOT_INDICATOR_SIZE,
            height: DOT_INDICATOR_SIZE,
            borderRadius: 9999,
            borderWidth: 1,
            borderColor: colors.WHITE
          }}
        /> */}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: (width, height) => ({ width, height, flex: 1 })
})
