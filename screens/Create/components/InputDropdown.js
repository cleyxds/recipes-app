import { useState } from "react"

import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"

import { AntDesign } from "@expo/vector-icons"

import { colors, units } from "../../../utils"

const { DEFAULT_OPACITY } = units

export function InputDropdown({ items, onSelectItem, ...props }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  function handlePressDropdownItem({ item, index }) {
    onSelectItem?.({ item, index })
    setIsDropdownOpen(false)
  }

  function renderDropdownItem({ item, index }) {
    return (
      <TouchableOpacity
        activeOpacity={DEFAULT_OPACITY}
        onPress={() => handlePressDropdownItem({ item, index })}
        style={{ marginVertical: 6 }}
      >
        <View>
          <Text>{item}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  function toggleDropdown() {
    setIsDropdownOpen(state => !state)
  }

  return (
    <View>
      <View>
        <TextInput {...props} />

        <TouchableOpacity
          activeOpacity={DEFAULT_OPACITY}
          onPress={toggleDropdown}
          style={{
            ...StyleSheet.absoluteFillObject
          }}
        />

        <TouchableOpacity
          activeOpacity={DEFAULT_OPACITY}
          onPress={toggleDropdown}
          style={{
            position: "absolute",
            right: "5%",
            bottom: "28%"
          }}
        >
          <AntDesign name="down" size={18} color={colors.WHITE} />
        </TouchableOpacity>
      </View>

      {isDropdownOpen && (
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          data={items}
          renderItem={renderDropdownItem}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1.5,
                backgroundColor: colors.GREY,
                opacity: 0.7,
                borderRadius: 9999
              }}
            />
          )}
          contentContainerStyle={{
            backgroundColor: colors.WHITE,
            paddingHorizontal: 16,
            borderRadius: 8
          }}
          style={{ paddingTop: 8 }}
        />
      )}
    </View>
  )
}
