import { View, FlatList, useWindowDimensions, StyleSheet } from "react-native"

import { Intro, Discover, Publish, Auth } from "./screens"

import { colors } from "../../utils"

export function Walkthrough() {
  const { width, height } = useWindowDimensions()

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
        {data?.map(() => (
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: colors.WHITE,
              borderRadius: 9999,
              marginRight: 12
            }}
          />
        ))}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: (width, height) => ({ width, height, flex: 1 })
})
