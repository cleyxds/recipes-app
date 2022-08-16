import { useNavigation } from "@react-navigation/native"
import {
  FlatList,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  View,
  Image
} from "react-native"

import { colors, units } from "../../../utils"

const { DEFAULT_OPACITY } = units

export function CardList({ type, title = "", data, style }) {
  const { navigate } = useNavigation()
  const { width, height } = useWindowDimensions()

  function handlePressCategory({ item }) {}
  function handlePressRecipe({ item }) {}

  function CategoriesCard({ item }) {
    return (
      <TouchableOpacity
        activeOpacity={DEFAULT_OPACITY}
        onPress={() => handlePressCategory({ item })}
      >
        <View style={{ marginRight: 6 }}>
          <View
            style={{
              width: width * 0.4,
              height: 150,
              backgroundColor: colors.GREY_I,
              borderRadius: 12
            }}
          />
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: 64,
                height: 64,
                backgroundColor: colors.WHITE,
                borderRadius: 50
              }}
            />
          </View>

          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: "6%",
              alignItems: "center",
              paddingHorizontal: 8
            }}
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                fontSize: 16,
                fontFamily: "MontserratSemiBold",
                color: colors.WHITE
              }}
            >
              {item}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={style}>
      <View
        style={{
          paddingHorizontal: 16,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            color: colors.WHITE,
            fontSize: 24,
            fontFamily: "PoppinsSemiBold"
          }}
        >
          {title}
        </Text>

        <TouchableOpacity>
          <Text
            style={{
              color: colors.WHITE,
              fontSize: 13,
              fontFamily: "PoppinsSemiBold"
            }}
          >
            Ver todas
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={data}
          horizontal
          style={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => {
            if (type === "category") {
              return CategoriesCard({ item })
            }

            return (
              <TouchableOpacity
                activeOpacity={DEFAULT_OPACITY}
                onPress={() => handlePressRecipe({ item })}
              >
                <View style={{ maxWidth: width * 0.5, marginRight: 12 }}>
                  <Image
                    source={{ uri: item?.thumbnail }}
                    style={{
                      width: width * 0.5,
                      height: 250,
                      backgroundColor: colors.WHITE,
                      borderRadius: 12
                    }}
                  />
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      fontSize: 14,
                      fontFamily: "MontserratBold",
                      color: colors.WHITE
                    }}
                  >
                    {item?.title}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 8
                    }}
                  >
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        backgroundColor: colors.PRODUCT_ORANGE,
                        borderRadius: 9999,
                        marginRight: 12
                      }}
                    />
                    <View>
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: "MontserratRegular",
                          color: colors.WHITE
                        }}
                      >
                        {item?.author}
                      </Text>

                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: "MontserratRegular",
                          color: colors.WHITE,
                          opacity: 0.6
                        }}
                      >
                        Postado {item?.timestamp} atrás
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </View>
  )
}
