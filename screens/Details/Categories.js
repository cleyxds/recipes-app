import { useState } from "react"

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList
} from "react-native"

import { useNavigation, useRoute } from "@react-navigation/native"

import { Screen } from "../../components"

import { renderTodaysRecipes } from "../Home/components/CardList"

import { Feather, Entypo, AntDesign } from "@expo/vector-icons"

import { colors, units } from "../../utils"

const { DEFAULT_OPACITY } = units
const { width } = Dimensions.get("window")

export function CategoriesDetails() {
  const { navigate, goBack } = useNavigation()
  const { params } = useRoute()
  const [isSearchInputOpen, setIsSearchInputOpen] = useState(false)

  const item = params?.item

  const categorizedRecipesFound = [
    {
      thumbnail:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80",
      title: "Hamburger crocante de frango estilo coreano",
      time: "30 min",
      likes: 12000,
      author: "Janemo",
      timestamp: "12h"
    },
    {
      thumbnail:
        "https://images.unsplash.com/photo-1528736235302-52922df5c122?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1254&q=80",
      title: "Torrada estilo americana com queijo",
      time: "10 min",
      likes: 8601,
      author: "ReiDaTorrada",
      timestamp: "4sem"
    }
  ]

  function handleToggleShowInput() {
    /* Should be animated in the future */
    setIsSearchInputOpen(state => !state)
  }

  function handleGoToFollowers() {
    navigate("S.Followers")
  }

  return (
    <Screen>
      <View style={{ flex: 1, backgroundColor: colors.GREY_I }}>
        <View
          style={{
            paddingVertical: 24,
            paddingHorizontal: 16
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <TouchableOpacity onPress={goBack} activeOpacity={DEFAULT_OPACITY}>
              <Feather name="arrow-left" size={24} color={colors.WHITE} />
            </TouchableOpacity>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={handleGoToFollowers}
                activeOpacity={DEFAULT_OPACITY}
              >
                <AntDesign
                  name="hearto"
                  size={20}
                  color={colors.WHITE}
                  style={{ marginRight: 24 }}
                />
              </TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {isSearchInputOpen && (
                  <TextInput
                    style={{
                      width: width * 0.6,
                      height: 24,
                      backgroundColor: colors.WHITE,
                      borderRadius: 8,
                      paddingHorizontal: 8,
                      marginRight: 8
                    }}
                  />
                )}
                <TouchableOpacity
                  onPress={handleToggleShowInput}
                  activeOpacity={DEFAULT_OPACITY}
                >
                  <Entypo
                    name="magnifying-glass"
                    size={24}
                    color={colors.WHITE}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={{ marginTop: "10%", paddingHorizontal: 16 }}>
          <Text
            style={{
              fontFamily: "NunitoSemiBold",
              fontSize: 28,
              color: colors.WHITE
            }}
          >
            #{item}
          </Text>

          <View style={{ marginTop: 8 }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "MontserratSemiBold",
                color: colors.GREY,
                opacity: 0.5
              }}
            >
              {categorizedRecipesFound?.length} Receitas
            </Text>
          </View>
        </View>

        <FlatList
          data={categorizedRecipesFound}
          style={{ marginTop: 16, backgroundColor: "#0f0d10" }}
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: 32,
            alignSelf: "center"
          }}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10 }}>
              {renderTodaysRecipes({ item, navigate, size: "medium" })}
            </View>
          )}
        />
      </View>
    </Screen>
  )
}
