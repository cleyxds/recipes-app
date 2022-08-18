import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Dimensions
} from "react-native"

import { useNavigation } from "@react-navigation/native"

import { AntDesign } from "@expo/vector-icons"

import { colors, units } from "../../../utils"

const { DEFAULT_OPACITY } = units

const { width } = Dimensions.get("window")

function parseSize({ size }) {
  if (size === "small") return width * 0.4
  if (size === "medium") return width * 0.5
}

export function renderCategoriesCard({ item, size, navigate }) {
  function handlePressCategory({ item, navigate }) {
    navigate("S.CategoriesDetails", { item })
  }

  return (
    <TouchableOpacity
      activeOpacity={DEFAULT_OPACITY}
      onPress={() => handlePressCategory({ item, navigate })}
    >
      <View style={{ marginHorizontal: 6 }}>
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

export function renderPopularCards({ item, size, navigate }) {
  return (
    <View style={{ marginHorizontal: 6, marginVertical: 10 }}>
      <View>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1
          }}
        >
          <TouchableOpacity activeOpacity={DEFAULT_OPACITY}>
            <AntDesign name="playcircleo" size={64} color={colors.WHITE} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "3%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 10,
            zIndex: 2
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <AntDesign
              name="hearto"
              size={20}
              color={colors.WHITE}
              style={{ opacity: 0.7, marginRight: 4 }}
            />
            <Text
              style={{
                color: colors.WHITE,
                opacity: 0.7,
                fontFamily: "MontserratMedium"
              }}
            >
              12k
            </Text>
          </View>
          <Text
            style={{
              color: colors.WHITE,
              opacity: 0.7,
              fontFamily: "MontserratMedium"
            }}
          >
            30 mins
          </Text>
        </View>

        <Image
          source={{ uri: item?.thumbnail }}
          style={{
            height: 250,
            borderRadius: 12
          }}
        />
      </View>

      <View style={{ marginTop: 8 }}>
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
          <Image
            resizeMode="center"
            source={{ uri: item?.thumbnail }}
            style={{
              width: 32,
              height: 32,
              backgroundColor: colors.PRODUCT_ORANGE,
              borderRadius: 9999,
              marginRight: 12
            }}
          />
          <View style={{ flex: 1 }}>
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
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 11,
                fontFamily: "MontserratRegular",
                color: colors.WHITE,
                opacity: 0.7
              }}
            >
              Postado {item?.timestamp} atrás
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export function renderTodaysRecipes({ item, size, navigate }) {
  function handlePressRecipe({ item }) {}

  return (
    <TouchableOpacity
      activeOpacity={DEFAULT_OPACITY}
      onPress={() => handlePressRecipe({ item })}
      style={{ width: parseSize({ size }) }}
    >
      <View style={{ maxWidth: width * 0.5, marginHorizontal: 6 }}>
        <View>
          <Image
            source={{ uri: item?.thumbnail }}
            style={{
              height: 250,
              backgroundColor: colors.WHITE,
              borderRadius: 12
            }}
          />
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: "3%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 8
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <AntDesign
                name="hearto"
                size={20}
                color={colors.WHITE}
                style={{ opacity: 0.7, marginRight: 4 }}
              />
              <Text
                style={{
                  color: colors.WHITE,
                  opacity: 0.7,
                  fontFamily: "MontserratMedium"
                }}
              >
                12k
              </Text>
            </View>
            <Text
              style={{
                color: colors.WHITE,
                opacity: 0.7,
                fontFamily: "MontserratMedium"
              }}
            >
              30 mins
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 8 }}>
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
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 8
          }}
        >
          <Image
            resizeMode="center"
            source={{ uri: item?.thumbnail }}
            style={{
              width: 32,
              height: 32,
              backgroundColor: colors.PRODUCT_ORANGE,
              borderRadius: 9999,
              marginRight: 12
            }}
          />
          <View style={{ flex: 1 }}>
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
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 11,
                fontFamily: "MontserratRegular",
                color: colors.WHITE,
                opacity: 0.7
              }}
            >
              Postado há {item?.timestamp} atrás
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export function CardList({
  type = "today",
  size = "medium",
  title = "",
  data,
  horizontal = true,
  style
}) {
  const { navigate } = useNavigation()

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

        <TouchableOpacity activeOpacity={DEFAULT_OPACITY}>
          <Text
            style={{
              color: colors.GREY,
              fontSize: 13,
              fontFamily: "PoppinsSemiBold"
            }}
          >
            Ver todas
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 10 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={data}
          horizontal={horizontal}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => {
            if (type === "popular")
              return renderPopularCards({ item, size, navigate })
            if (type === "category")
              return renderCategoriesCard({ item, size, navigate })
            if (type === "today")
              return renderTodaysRecipes({ item, size, navigate })
          }}
        />
      </View>
    </View>
  )
}
