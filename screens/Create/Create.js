import { useState } from "react"

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions
} from "react-native"

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import { useNavigation } from "@react-navigation/native"

import { Screen } from "../../components"

import { AntDesign } from "@expo/vector-icons"

import { colors, units } from "../../utils"
import { InputDropdown } from "./components/InputDropdown"

const { DEFAULT_OPACITY } = units

const { height } = Dimensions.get("window")

export function Create() {
  const DEFAULT_STATE = {
    RECIPE_NAME: "",
    RECIPE_CATEGORY: "Sobremesa",
    SERVINGS: 1,
    DIFICULTY: "Fácil",
    SUMMARY: ""
  }

  const navigation = useNavigation()
  const { navigate } = navigation

  const [recipeName, setRecipeName] = useState(DEFAULT_STATE["RECIPE_NAME"])
  const [recipeCategory, setRecipeCategory] = useState(
    DEFAULT_STATE["RECIPE_CATEGORY"]
  )
  const [recipeServings, setRecipeServings] = useState(
    DEFAULT_STATE["SERVINGS"]
  )
  const [recipeDificulty, setRecipeDificulty] = useState(
    DEFAULT_STATE["DIFICULTY"]
  )
  const [recipeSummary, setRecipeSummary] = useState(DEFAULT_STATE["SUMMARY"])

  const categoriesItems = [
    "Café da manhã",
    "Almoço",
    "Final de semana",
    "Jantar"
  ]

  const servingsItems = [1, 2, 3, 4, "5+"]

  const dificultyItems = ["Fácil", "Médio", "Difícil"]

  const parsedRecipeServingsValue =
    recipeServings <= 1
      ? `${recipeServings} pessoa`
      : `${recipeServings} pessoas`

  /* useEffect(() => {
    const blur = navigation.addListener("blur", () => {
      setRecipeName(DEFAULT_STATE["RECIPE_NAME"])
      setRecipeCategory(DEFAULT_STATE["RECIPE_CATEGORY"])
      setRecipeServings(DEFAULT_STATE["SERVINGS"])
      setRecipeDificulty(DEFAULT_STATE["DIFICULTY"])
      setRecipeSummary(DEFAULT_STATE["SUMMARY"])
    })

    return blur
  }, [navigation]) */

  function handleContinue() {
    const recipeCreated = {
      title: recipeName,
      categories: [recipeCategory],
      description: recipeSummary,
      summary: recipeSummary,
      specs: [null, recipeServings, recipeDificulty]
    }

    /**
     * SET THIS OBJECT TO THE RECIPE CREATION RECOIL
     */

    navigate("S.RecipeSteps")
  }

  return (
    <Screen>
      <>
        <View
          style={{ flexDirection: "row", alignSelf: "center", marginTop: 32 }}
        >
          {/* <TouchableOpacity touchSoundDisabled activeOpacity={DEFAULT_OPACITY}>
            <AntDesign name="close" size={24} color={colors.WHITE} />
          </TouchableOpacity> */}

          <Text
            style={{
              fontFamily: "MontserratSemiBold",
              color: colors.WHITE,
              fontSize: 18
            }}
          >
            Criar receita
          </Text>
        </View>

        <View
          style={{ marginTop: 32, marginBottom: 16, paddingHorizontal: 16 }}
        >
          <Text
            style={{
              fontFamily: "MontserratSemiBold",
              fontSize: 32,
              color: colors.WHITE
            }}
          >
            O que você está{"\n"}cozinhando?
          </Text>
        </View>

        <KeyboardAwareScrollView
          extraHeight={height * 0.35}
          enableOnAndroid
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 48 }}
        >
          <View style={{ marginTop: 16 }}>
            <TextInput
              autoCapitalize="words"
              placeholder="Nome da receita"
              placeholderTextColor={colors.GREY}
              onChangeText={setRecipeName}
              value={recipeName}
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

          <View style={{ marginTop: 32 }}>
            <Text
              style={{
                fontFamily: "MontserratSemiBold",
                fontSize: 14,
                color: colors.WHITE
              }}
            >
              Categoria
            </Text>

            <InputDropdown
              editable={false}
              items={categoriesItems}
              onSelectItem={({ item }) => setRecipeCategory(item)}
              onChangeText={setRecipeCategory}
              value={recipeCategory}
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

          <View
            style={{
              marginTop: 32,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View style={{ flex: 1, marginRight: 16 }}>
              <Text
                style={{
                  fontFamily: "MontserratSemiBold",
                  fontSize: 14,
                  color: colors.WHITE
                }}
              >
                Serve
              </Text>

              <InputDropdown
                editable={false}
                items={servingsItems}
                onSelectItem={({ item }) => setRecipeServings(item)}
                onChangeText={setRecipeServings}
                value={parsedRecipeServingsValue}
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

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "MontserratSemiBold",
                  fontSize: 14,
                  color: colors.WHITE
                }}
              >
                Dificuldade
              </Text>

              <InputDropdown
                editable={false}
                items={dificultyItems}
                onSelectItem={({ item }) => setRecipeDificulty(item)}
                onChangeText={setRecipeDificulty}
                value={recipeDificulty}
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

          <View style={{ marginTop: 32 }}>
            <Text
              style={{
                fontFamily: "MontserratSemiBold",
                fontSize: 14,
                color: colors.WHITE
              }}
            >
              Resumo
            </Text>

            <TextInput
              multiline
              placeholder="Escreva algo sobre a receita"
              placeholderTextColor={colors.GREY}
              onChangeText={setRecipeSummary}
              value={recipeSummary}
              style={{
                height: 64,
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

          <TouchableOpacity
            activeOpacity={DEFAULT_OPACITY}
            onPress={handleContinue}
            style={{
              flex: 1,
              backgroundColor: colors.PRODUCT_ORANGE,
              padding: 16,
              marginTop: 64,
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
              Continuar
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </>
    </Screen>
  )
}
