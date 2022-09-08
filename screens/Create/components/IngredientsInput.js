import { useState } from "react"

import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"

import { Entypo, AntDesign } from "@expo/vector-icons"

import { colors, units } from "../../../utils"

const { DEFAULT_OPACITY } = units

export function IngredientsInput({ items, onAddItem, onRemoveItem, ...props }) {
  const [inputText, setInputText] = useState("")

  function renderListItem({ item, index }) {
    return (
      <View
        activeOpacity={DEFAULT_OPACITY}
        style={{
          marginRight: 8,
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 9999,
          backgroundColor: colors.WHITE,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            fontFamily: "MontserratRegular",
            fontSize: 14,
            lineHeight: 18
          }}
        >
          {item}
        </Text>

        <TouchableOpacity
          touchSoundDisabled
          onPress={() => handleRemoveItem({ item, index })}
          activeOpacity={DEFAULT_OPACITY}
          style={{ marginLeft: 4 }}
        >
          <AntDesign name="close" size={18} color="crimson" />
        </TouchableOpacity>
      </View>
    )
  }

  function handleRemoveItem({ item, index }) {
    onRemoveItem?.({ item, index })
  }

  function handleAddItem() {
    if (!!!inputText.length) return

    onAddItem?.({ item: inputText })
    setInputText("")
  }

  return (
    <View>
      <View>
        <TextInput value={inputText} onChangeText={setInputText} {...props} />

        <TouchableOpacity
          activeOpacity={DEFAULT_OPACITY}
          onPress={handleAddItem}
          style={{
            position: "absolute",
            right: "5%",
            bottom: "28%"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Entypo
              name="plus"
              size={18}
              color={colors.PRODUCT_ORANGE}
              style={{ marginRight: 4 }}
            />

            <Text
              style={{
                fontFamily: "MontserratBold",
                color: colors.PRODUCT_ORANGE,
                lineHeight: 18
              }}
            >
              Adicionar
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {!!items?.length && (
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={items}
          renderItem={renderListItem}
          style={{ marginTop: 12 }}
          // ItemSeparatorComponent={() => (
          //   <View
          //     style={{
          //       height: 1.5,
          //       backgroundColor: colors.GREY,
          //       opacity: 0.7,
          //       borderRadius: 9999
          //     }}
          //   />
          // )}
        />
      )}
    </View>
  )
}
