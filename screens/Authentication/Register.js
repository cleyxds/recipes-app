import { View, Text } from "react-native"

import { useRoute } from "@react-navigation/native"

export function Register() {
  const { key } = useRoute()

  return (
    <View>
      <Text style={{ color: "red", fontSize: 24, fontWeight: "700" }}>
        {key}
      </Text>
    </View>
  )
}
