const WALKTHROUGH_TRANSITION = {
  gestureEnabled: true,
  gestureDirection: "horizontal",
  transitionSpec: {
    open: config,
    close: config
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -layouts.screen.width],
                  extrapolate: "clamp"
                })
              : current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                  extrapolate: "clamp"
                })
          }
        ]
      }
    }
  }
}

export { WALKTHROUGH_TRANSITION }
