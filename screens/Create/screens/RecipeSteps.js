import { useEffect, useRef, useState } from "react"

import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"

import { Video, ResizeMode } from "expo-av"

import { useNavigation } from "@react-navigation/native"

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import { useRecipeCreationStore } from "../../../stores/RecipeCreation"
import { useAuthStore } from "../../../stores/Auth"

import { Feather, Entypo, EvilIcons, AntDesign } from "@expo/vector-icons"
import { IngredientsInput } from "../components/IngredientsInput"

import { Screen } from "../../../components"

import { colors, units, wait } from "../../../utils"
import { config } from "../../../utils/constants"

const { DEFAULT_OPACITY } = units

const { width, height } = Dimensions.get("window")

export function RecipeSteps() {
  const { navigate, goBack } = useNavigation()

  const videoRef = useRef(null)

  const { recipe, steps, deleteStepByIndex, setRecipe } =
    useRecipeCreationStore()
  const { auth } = useAuthStore()

  const [stepMethod, setStepMethod] = useState("")
  const [ingredients, setIngredients] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!!!steps?.length) return

    function getTotalRecipeStepsDuration({ steps }) {
      const stepsDuration = steps
        .map(item => item?.duration)
        .map(item => new Date(item).getSeconds())
        .reduce((prev, curr, index) => prev + curr)

      return stepsDuration
    }

    setRecipe({
      ...recipe,
      steps,
      specs: [
        getTotalRecipeStepsDuration({ steps }),
        recipe?.specs[1],
        recipe?.specs[2]
      ]
    })
  }, [steps])

  function renderVideoClipCard({ item, index, list }) {
    const isLastIndex = index + 1 === list?.length

    const date = new Date(item?.duration)
    const videoMinutesSeconds = `${date.getMinutes()}:${date.getSeconds()}`

    return (
      <View
        style={{
          width: width * 0.7,
          height: width * 0.5,
          marginRight: isLastIndex ? 0 : 6
        }}
      >
        <TouchableOpacity
          activeOpacity={DEFAULT_OPACITY}
          onPress={() => handleRemoveVideoItem({ item, index })}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            borderRadius: 9999,
            backgroundColor: colors.GREY_I,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
          }}
        >
          <EvilIcons name="trash" size={24} color={colors.WHITE} />
        </TouchableOpacity>

        <View
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            width: 32,
            height: 32,
            borderRadius: 9999,
            backgroundColor: colors.PRODUCT_ORANGE,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1
          }}
        >
          <Text
            style={{
              fontFamily: "PoppinsSemiBold",
              fontSize: 14,
              color: colors.WHITE
            }}
          >
            {videoMinutesSeconds}
          </Text>
        </View>

        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1
          }}
        >
          <TouchableOpacity
            onPress={() => handlePlayVideoOnCard({ item })}
            activeOpacity={DEFAULT_OPACITY}
          >
            <AntDesign name="playcircleo" size={64} color={colors.WHITE} />
          </TouchableOpacity>
        </View>

        <Video
          ref={videoRef}
          style={{ flex: 1 }}
          source={{ uri: list?.[index]?.uri }}
          resizeMode={ResizeMode.COVER}
        />
      </View>
    )
  }

  function handlePlayVideoOnCard({ item }) {}

  const parseIngredientInputPlaceholder = `Ingrediente #${
    ingredients?.length + 1
  }`

  function renderEmptyVideoClip() {
    return (
      <View
        style={{
          width,
          height: width * 0.5,
          backgroundColor: colors.GREY_I,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontFamily: "MontserratSemiBold",
            color: colors.WHITE,
            textAlign: "center"
          }}
        >
          Nenhum clipe de vídeo ainda 😢
        </Text>

        <Text
          style={{
            marginTop: 8,
            fontSize: 14,
            fontFamily: "MontserratSemiBold",
            color: colors.PRODUCT_ORANGE,
            textAlign: "center"
          }}
        >
          Se quiser, adicione um para ilustrar essa etapa...
        </Text>
      </View>
    )
  }

  async function handleAddVideoClipStep() {
    setIsLoading(true)
    await wait({ random: true })

    navigate("S.RecipeRecord")

    await wait({ ms: 150 })
    setIsLoading(false)
  }

  function handleAddIngredient({ item }) {
    setIngredients(state => [...state, item])
  }

  function handleRemoveIngredient({ item, index }) {
    setIngredients(state => {
      const clone = [...state].filter((_, _index) => _index !== index)

      return clone
    })
  }

  function handleRemoveVideoItem({ item, index }) {
    deleteStepByIndex(index)
  }

  async function handlePublishRecipe({ recipe }) {
    const parsedRecipe = {
      ...recipe,
      specs: {
        duration: recipe.specs[0],
        servings: recipe.specs[1],
        dificulty: recipe.specs[2]
      }
    }

    try {
      const response = await fetch(`${config.API_URL}recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.accessToken}`
        },
        body: JSON.stringify(parsedRecipe)
      })

      const data = await response.json()

      alert("Parabéns, você criou a receita")
    } catch (error) {
      console.warn(error)
    }
  }

  async function handleSaveAsDraft({ recipe }) {}

  function renderAddVideoClipStep() {
    return (
      <View
        style={{
          position: "absolute",
          bottom: "40%",
          right: 16,
          zIndex: 9999
        }}
      >
        <TouchableOpacity
          activeOpacity={DEFAULT_OPACITY}
          onPress={handleAddVideoClipStep}
          style={{
            backgroundColor: colors.WHITE,
            width: 64,
            height: 64,
            borderRadius: 9999,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {isLoading && (
            <ActivityIndicator size="small" color={colors.PRODUCT_ORANGE} />
          )}
          {!isLoading && (
            <Entypo name="plus" size={28} color={colors.ORANGE_NAVIGATION} />
          )}
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <Screen>
      <KeyboardAwareScrollView
        extraHeight={height * 0.1}
        enableOnAndroid
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 32,
            paddingHorizontal: 16
          }}
        >
          <TouchableOpacity onPress={goBack} activeOpacity={DEFAULT_OPACITY}>
            <Feather name="arrow-left" size={24} color={colors.WHITE} />
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: "PoppinsSemiBold",
              color: colors.WHITE,
              fontSize: 18
            }}
          >
            Etapas da receita
          </Text>

          <View
            style={{
              backgroundColor: colors.TRANSPARENT,
              height: 24,
              width: 24
            }}
          />
        </View>

        <View style={{ flex: 1, backgroundColor: colors.GREY }}>
          <View style={{ position: "absolute", bottom: "0%" }}>
            <View style={{ paddingHorizontal: 16 }}>
              <Text
                style={{
                  fontFamily: "PoppinsSemiBold",
                  fontSize: 32,
                  color: colors.WHITE
                }}
              >
                Passo 1
              </Text>
            </View>

            <FlatList
              data={steps}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) =>
                renderVideoClipCard({ item, index, list: steps })
              }
              ListEmptyComponent={renderEmptyVideoClip}
              style={{ marginTop: 32 }}
            />
          </View>
        </View>

        {renderAddVideoClipStep()}

        <View
          style={{
            flex: 1,
            backgroundColor: colors.BLACK_I,
            paddingHorizontal: 16
          }}
        >
          <View style={{ marginTop: 32 }}>
            <View>
              <Text
                style={{
                  fontFamily: "MontserratSemiBold",
                  fontSize: 14,
                  color: colors.WHITE
                }}
              >
                Método
              </Text>
              <TextInput
                autoCapitalize="words"
                placeholder="Escreva algo sobre esta etapa..."
                placeholderTextColor={colors.GREY}
                onChangeText={setStepMethod}
                value={stepMethod}
                style={{
                  marginTop: 8,
                  borderRadius: 8,
                  padding: 16,
                  backgroundColor: colors.GREY_I,
                  fontFamily: "MontserratBold",
                  fontSize: 14,
                  color: colors.WHITE
                }}
              />
            </View>

            <View style={{ marginTop: 16 }}>
              <Text
                style={{
                  fontFamily: "MontserratSemiBold",
                  fontSize: 14,
                  color: colors.WHITE
                }}
              >
                Ingredientes
              </Text>

              <IngredientsInput
                placeholder={parseIngredientInputPlaceholder}
                placeholderTextColor={colors.GREY}
                onRemoveItem={handleRemoveIngredient}
                onAddItem={handleAddIngredient}
                items={ingredients}
                style={{
                  marginTop: 8,
                  borderRadius: 8,
                  padding: 16,
                  backgroundColor: colors.GREY_I,
                  fontFamily: "MontserratBold",
                  fontSize: 14,
                  color: colors.WHITE
                }}
              />
            </View>
          </View>

          <View style={{ marginTop: 64 }}>
            <TouchableOpacity
              activeOpacity={DEFAULT_OPACITY}
              onPress={() => handlePublishRecipe({ recipe })}
              style={{
                backgroundColor: colors.PRODUCT_ORANGE,
                padding: 16,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8
              }}
            >
              <Text
                style={{
                  fontFamily: "MontserratSemiBold",
                  fontSize: 14,
                  color: colors.WHITE
                }}
              >
                Publicar agora
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={DEFAULT_OPACITY}
              onPress={() => handleSaveAsDraft({ recipe })}
              style={{
                padding: 16,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8
              }}
            >
              <Text
                style={{
                  fontFamily: "MontserratSemiBold",
                  fontSize: 14,
                  color: colors.PRODUCT_ORANGE
                }}
              >
                Salvar rascunho
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  )
}
