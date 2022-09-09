import { Platform } from "react-native"

import {
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  MediaTypeOptions
} from "expo-image-picker"

export async function getVideo() {
  if (Platform.OS !== "web") {
    const { status } = await requestMediaLibraryPermissionsAsync()

    if (status !== "granted") {
      alert("Nós precisamos da permissão para conseguir os vídeos.")
    }
  }

  try {
    const response = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (response.cancelled) throw new Error("launchImageLibraryAsync cancelled")

    return response
  } catch (error) {
    throw new Error(error)
  }
}
