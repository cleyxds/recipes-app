import { useRef } from "react"

import { View, StyleSheet, FlatList, useWindowDimensions } from "react-native"

import { Welcome, Bill, Payments, Insights, Communications } from "./index"

export function Walkthrough() {
  const { width, height } = useWindowDimensions()
  const screenRef = useRef(null)

  function Container(Screen) {
    return (
      <View style={styles.container(width, height)}>
        <Screen screenRef={screenRef.current} />
      </View>
    )
  }

  function renderItem({ index }) {
    if (index === 0) return Container(Welcome)
    if (index === 1) return Container(Bill)
    if (index === 2) return Container(Payments)
    if (index === 3) return Container(Insights)
    if (index === 4) return Container(Communications)
  }

  return (
    <FlatList
      ref={screenRef}
      bounces={false}
      bouncesZoom={false}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      data={["Welcome", "Bill", "Payments", "Insights", "Communications"]}
      renderItem={renderItem}
    />
  )
}

const styles = StyleSheet.create({
  container: (width, height) => ({ width, height, flex: 1 })
})
