import { Platform } from "react-native"

import {
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  MediaTypeOptions
} from "expo-image-picker"

export async function getImage() {
  if (Platform.OS !== "web") {
    const { status } = await requestMediaLibraryPermissionsAsync()

    if (status !== "granted") {
      alert("Nós precisamos da permissão para conseguir as imagens.")
    }
  }

  try {
    const response = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
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
