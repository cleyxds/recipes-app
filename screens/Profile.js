import { Text, View } from "react-native"

import { useUserStore } from "../stores/User"

import { Screen } from "../components"

export function Profile() {
  const { user } = useUserStore()

  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <Text style={{ color: "white" }}>
          <Text style={{ color: "red" }}>User</Text>
          {JSON.stringify(user)}
        </Text>
      </View>
    </Screen>
  )
}
