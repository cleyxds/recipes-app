import Svg, { Path } from "react-native-svg"

export default function Arrow({ color, ...props }) {
  return (
    <Svg
      width={7}
      height={12}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="m1 1 4.859 4.859a.2.2 0 0 1 0 .282L1 11"
        stroke={"#00335C" ?? color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  )
}
