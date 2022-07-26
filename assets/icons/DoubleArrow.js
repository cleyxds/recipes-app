import * as React from "react"
import Svg, { Path } from "react-native-svg"
import colors from "../../utils/colors"

export function DoubleArrowIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2.448 18.285 8.733 12 2.448 5.715l2.295-2.28L13.308 12l-8.565 8.565-2.295-2.28Z"
        fill={colors.AUTHENTICATION_GREEN}
      />
      <Path
        d="M10.698 18.285 16.983 12l-6.285-6.285 2.295-2.28L21.558 12l-8.565 8.565-2.295-2.28Z"
        fill={colors.AUTHENTICATION_GREEN}
      />
    </Svg>
  )
}
