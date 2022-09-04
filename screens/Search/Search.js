import { useEffect, useRef, useState } from "react"

import { Text, TextInput, TouchableWithoutFeedback, View } from "react-native"

import { SearchTabs } from "./components/SearchTabs"

import { Entypo } from "@expo/vector-icons"

import { OptimizedImage, Screen } from "../../components"

import { colors } from "../../utils"

export function Search() {
  const [searchInputValue, setSearchInputValue] = useState("")
  const searchInputRef = useRef()

  async function handleSearchInput(text) {
    setSearchInputValue(text)
  }

  function handlePressSearch() {
    searchInputRef.current?.focus()
  }

  useEffect(() => {
    if (searchInputValue?.length > 0 && searchInputValue?.length <= 2)
      handlePressSearch()
  }, [searchInputValue])

  return (
    <Screen>
      <View style={{ flex: 1, backgroundColor: colors.BLACK_II }}>
        <TouchableWithoutFeedback
          touchSoundDisabled
          onPress={handlePressSearch}
        >
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 18,
              marginBottom: !!searchInputValue?.length ? 8 : 32,
              justifyContent: "center"
            }}
          >
            {!!!searchInputValue?.length && (
              <View
                style={{
                  position: "absolute",
                  left: "10%",
                  zIndex: 2,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Entypo
                  name="magnifying-glass"
                  size={24}
                  color={colors.GREY}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={{
                    fontFamily: "MontserratRegular",
                    fontSize: 16,
                    color: colors.GREY
                  }}
                >
                  Pesquise
                </Text>
              </View>
            )}

            <TextInput
              selectionColor={colors.WHITE}
              ref={searchInputRef}
              value={searchInputValue}
              onChangeText={handleSearchInput}
              placeholderTextColor={colors.GREY}
              style={{
                color: colors.WHITE,
                height: 48,
                backgroundColor: colors.GREY_I,
                borderRadius: 12,
                paddingHorizontal: 18
              }}
            />
          </View>
        </TouchableWithoutFeedback>

        {!!searchInputValue?.length && <SearchTabs />}
        {!!!searchInputValue?.length && (
          <View style={{ paddingHorizontal: 16 }}>
            <View>
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: "5%",
                  marginHorizontal: 16,
                  zIndex: 1
                }}
              >
                <View
                  style={{
                    width: 100,
                    height: 32,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: colors.PRODUCT_ORANGE,
                    borderRadius: 9999
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "PoppinsSemiBold",
                      fontSize: 12,
                      color: colors.WHITE
                    }}
                  >
                    Popular
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      fontFamily: "MontserratRegular",
                      fontSize: 24,
                      color: colors.WHITE,
                      lineHeight: 40
                    }}
                  >
                    Sobremesas de férias
                  </Text>
                  <Text
                    style={{
                      fontFamily: "MontserratRegular",
                      fontSize: 12,
                      lineHeight: 24,
                      color: colors.WHITE
                    }}
                  >
                    210 Receitas
                  </Text>
                </View>
              </View>

              <OptimizedImage
                source={{
                  uri: "https://images.unsplash.com/photo-1528736235302-52922df5c122?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1254&q=80"
                }}
                style={{
                  backgroundColor: colors.GREY,
                  height: 250,
                  borderRadius: 12
                }}
              />
            </View>
          </View>
        )}
      </View>
    </Screen>
  )
}
