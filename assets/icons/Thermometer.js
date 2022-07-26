import Svg, { Path } from "react-native-svg"

import colors from "../../utils/colors"

export function ThermometerIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12 23a4.986 4.986 0 0 1-3-8.979V4a3 3 0 1 1 6 0v10.021A4.986 4.986 0 0 1 12 23Zm0-20a1 1 0 0 0-1 1v11.13l-.5.289A2.968 2.968 0 0 0 9 18a3 3 0 0 0 6 0 2.967 2.967 0 0 0-1.5-2.581l-.5-.289V4a1 1 0 0 0-1-1Z"
        fill={colors.WHITE}
      />
      <Path
        d="M12 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM21 4h-4v2h4V4ZM21 8h-4v2h4V8ZM21 12h-4v2h4v-2Z"
        fill={colors.WHITE}
      />
    </Svg>
  )
}
