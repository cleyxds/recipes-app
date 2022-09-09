import { useRef, useState } from "react"

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"

import { useNavigation } from "@react-navigation/native"

import { Camera, CameraType } from "expo-camera"

import { useRecipeCreationStore } from "../../../stores/RecipeCreation"

import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons"

import { Screen } from "../../../components"

import { colors, getVideo, units, wait } from "../../../utils"
const { DEFAULT_OPACITY } = units

export function RecipeRecord() {
  const { goBack } = useNavigation()

  const { steps, setSteps } = useRecipeCreationStore()

  const [isRecording, setIsRecording] = useState(false)
  const [type, setType] = useState(CameraType.back)

  const cameraRef = useRef(null)

  const [permission, requestPermission] = Camera.useCameraPermissions()

  if (!permission) {
    return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ActivityIndicator size="large" color={colors.PRODUCT_ORANGE} />
      </View>
    )
  }

  if (!permission.granted) {
    return (
      <Screen>
        <View style={{ flex: 1, backgroundColor: colors.WHITE }}>
          {renderClose({ color: colors.BLACK_I })}

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 16
            }}
          >
            <Text
              style={{
                fontFamily: "MontserratSemiBold",
                fontSize: 16,
                color: colors.BLACK_I,
                textAlign: "center"
              }}
            >
              Nós precisamos da sua permissão para mostrar a câmera
            </Text>

            <TouchableOpacity
              activeOpacity={DEFAULT_OPACITY}
              onPress={requestPermission}
              style={{
                backgroundColor: colors.PRODUCT_ORANGE,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 32,
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 9999
              }}
            >
              <Text
                style={{
                  fontFamily: "MontserratBold",
                  fontSize: 16,
                  color: colors.WHITE
                }}
              >
                Solicitar permissão
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Screen>
    )
  }

  async function handleToggleRecording() {
    await wait({ random: true, maxRandomTime: 150 })
    setIsRecording(state => !state)
  }

  function handleToggleFlipCamera() {
    setType(state =>
      state === CameraType.back ? CameraType.front : CameraType.back
    )
  }

  async function handleGetVideoFromMediaLibrary() {
    try {
      const { uri, type, duration, ...responseVideo } = await getVideo()

      setSteps([...steps, { uri, type, duration }])

      await wait({ random: true, maxRandomTime: 300 })
      goBack()
    } catch (error) {
      console.log(error)
    }
  }

  function renderClose({ color }) {
    return (
      <View style={{ position: "absolute", top: 32, left: 16, zIndex: 9999 }}>
        <TouchableOpacity
          touchSoundDisabled
          onPress={goBack}
          activeOpacity={DEFAULT_OPACITY}
        >
          <AntDesign name="close" size={24} color={color} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <Screen>
      <View style={{ flex: 1 }}>
        {renderClose({ color: colors.WHITE })}

        <Camera style={{ flex: 1 }} ref={cameraRef} type={type}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginBottom: 64,
              paddingHorizontal: 16
            }}
          >
            <TouchableOpacity
              touchSoundDisabled
              activeOpacity={DEFAULT_OPACITY}
              onPress={handleToggleFlipCamera}
              style={{
                flex: 1,
                alignSelf: "flex-end",
                alignItems: "center"
              }}
            >
              <MaterialCommunityIcons
                name="camera-flip-outline"
                size={32}
                color={colors.WHITE}
              />
            </TouchableOpacity>

            <TouchableOpacity
              touchSoundDisabled
              onPress={handleToggleRecording}
              activeOpacity={DEFAULT_OPACITY}
              style={{
                flex: 1,
                alignSelf: "flex-end",
                alignItems: "center",
                marginHorizontal: 32
              }}
            >
              <View
                style={{
                  width: 64,
                  height: 64,
                  backgroundColor: colors.TRANSPARENT,
                  borderWidth: 1,
                  borderColor: colors.PRODUCT_ORANGE,
                  borderRadius: 9999,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    width: 56,
                    height: 56,
                    backgroundColor: colors.PRODUCT_ORANGE,
                    borderRadius: 9999,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {isRecording && (
                    <MaterialCommunityIcons
                      name="square"
                      size={24}
                      color={colors.WHITE}
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              touchSoundDisabled
              activeOpacity={DEFAULT_OPACITY}
              onPress={handleGetVideoFromMediaLibrary}
              style={{
                flex: 1,
                alignSelf: "flex-end",
                alignItems: "center"
              }}
            >
              <MaterialIcons name="perm-media" size={32} color={colors.WHITE} />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </Screen>
  )
}
