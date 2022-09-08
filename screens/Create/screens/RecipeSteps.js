import { useState } from "react"

import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"

import { useNavigation } from "@react-navigation/native"

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import { Feather, Entypo } from "@expo/vector-icons"
import { IngredientsInput } from "../components/IngredientsInput"

import { Screen } from "../../../components"

import { colors, units, wait } from "../../../utils"

const { DEFAULT_OPACITY } = units

const { width, height } = Dimensions.get("window")

export function RecipeSteps() {
  const { navigate, goBack } = useNavigation()

  const [steps, setSteps] = useState([])
  const [stepMethod, setStepMethod] = useState("")
  const [ingredients, setIngredients] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  function renderVideoClipCard({ item, index }) {
    return (
      <View
        style={{
          width: width * 0.7,
          height: width * 0.5,
          backgroundColor: colors.GOOGLE_AUTH_PINKISH,
          marginRight: 6
        }}
      />
    )
  }

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
            color: colors.WHITE
          }}
        >
          Nenhum clipe de vídeo ainda, adicione um
        </Text>
      </View>
    )
  }

  async function handleAddVideoClipStep() {
    setIsLoading(true)
    await wait(600)

    navigate("S.RecipeRecord")

    await wait(150)
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

  function handlePublishRecipe({}) {}

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
        contentContainerStyle={{ flex: 1, backgroundColor: colors.GREY }}
      >
        <View style={{ marginTop: 32 }}>
          <TouchableOpacity
            onPress={goBack}
            activeOpacity={DEFAULT_OPACITY}
            style={{ position: "absolute", left: 16 }}
          >
            <Feather name="arrow-left" size={24} color={colors.WHITE} />
          </TouchableOpacity>

          <View style={{ alignSelf: "center" }}>
            <Text
              style={{
                fontFamily: "PoppinsSemiBold",
                color: colors.WHITE,
                fontSize: 18
              }}
            >
              Etapas da receita
            </Text>
          </View>
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
              renderItem={renderVideoClipCard}
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
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  )
}
