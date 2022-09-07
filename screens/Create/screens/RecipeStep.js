import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"

import { useNavigation } from "@react-navigation/native"

import { Feather } from "@expo/vector-icons"

import { Screen } from "../../../components"
import { colors, units } from "../../../utils"

const { DEFAULT_OPACITY } = units

const { width } = Dimensions.get("window")

export function RecipeStep({ data = [], ...props }) {
  const { goBack } = useNavigation()

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

  const parseIngredientInputPlaceholder = `Ingrediente #1`

  function renderEmptyVideoClip() {
    return (
      <View
        style={{
          width,
          height: width * 0.5,
          backgroundColor: colors.WHITE,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontFamily: "MontserratSemiBold",
            color: colors.BLACK_II
          }}
        >
          Nenhum clipe de vídeo ainda, adicione um
        </Text>
      </View>
    )
  }

  function handleAddVideoClipStep() {}

  function renderAddVideoClipStep() {
    return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "green"
        }}
      >
        <TouchableOpacity
          activeOpacity={DEFAULT_OPACITY}
          onPress={handleAddVideoClipStep}
          style={{
            backgroundColor: "white",
            width: 64,
            height: 64,
            zIndex: 9999
          }}
        />
      </View>
    )
  }

  return (
    <Screen>
      <View style={{ flex: 1, backgroundColor: colors.GREY }}>
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
              data={data}
              horizontal
              renderItem={renderVideoClipCard}
              ListEmptyComponent={renderEmptyVideoClip}
              style={{ marginTop: 32 }}
            />
          </View>
        </View>

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
                /* onChangeText={setRecipeName} */
                /* value={recipeName} */
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
              <TextInput
                autoCapitalize="words"
                placeholder={parseIngredientInputPlaceholder}
                placeholderTextColor={colors.GREY}
                /* onChangeText={setRecipeName} */
                /* value={recipeName} */
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
      </View>
    </Screen>
  )
}
