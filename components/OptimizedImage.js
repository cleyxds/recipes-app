import { useState } from "react"

import { ActivityIndicator, Image, StyleSheet } from "react-native"

import { colors } from "../utils"

export function OptimizedImage(props) {
  const [isLoading, setIsLoading] = useState(true)

  async function handleLoadEnd() {
    setIsLoading(false)
  }

  return (
    <>
      <Image onLoadEnd={handleLoadEnd} {...props} />

      {isLoading && (
        <ActivityIndicator
          size="small"
          color={colors.ORANGE_NAVIGATION}
          style={{
            ...props?.style,
            width: props?.style?.width,
            borderRadius: props?.style?.borderRadius,
            height: props?.style?.height,
            ...StyleSheet.absoluteFillObject
          }}
        />
      )}
    </>
  )
}
