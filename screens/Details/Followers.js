import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList
} from "react-native"

import { useNavigation, useRoute } from "@react-navigation/native"

import { OptimizedImage, Screen } from "../../components"

import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"

import { colors, units } from "../../utils"

const { DEFAULT_OPACITY } = units
const { width } = Dimensions.get("window")

export function renderFollowerCard({ item, index }, type = "followers") {
  const isFollowing = item?.isFollowing

  async function handlePressFollow({ item }) {
    const followResponse = !!item?.isFollowing ? "Deixou de seguir" : "Seguiu"
    alert(`${followResponse} ${item?.name}`)
  }

  function handlePressRecipe({ item }) {
    alert(item?.name)
  }

  return (
    <View style={{ marginVertical: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          {type === "followers" && (
            <View>
              <OptimizedImage
                source={{ uri: item?.avatar_url }}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 9999,
                  backgroundColor: colors.WHITE,
                  marginRight: 16
                }}
              />
              {item?.isOnlne && (
                <View
                  style={{
                    position: "absolute",
                    left: "57%",
                    right: 0,
                    top: "4%",
                    borderRadius: 9999,
                    width: 10,
                    height: 10,
                    borderWidth: 1,
                    borderColor: colors.BLACK_I,
                    backgroundColor: colors.ONLINE_GREEN
                  }}
                />
              )}
            </View>
          )}

          {type === "recipes" && (
            <TouchableOpacity
              onPress={() => handlePressRecipe({ item })}
              activeOpacity={DEFAULT_OPACITY}
              style={{ flex: 1 }}
            >
              <View>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{
                    fontFamily: "MontserratRegular",
                    fontSize: 14,
                    color: colors.WHITE
                  }}
                >
                  {item?.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {type === "followers" && (
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                fontFamily: "MontserratRegular",
                fontSize: 14,
                color: colors.WHITE
              }}
            >
              {item?.name}
            </Text>
          )}
        </View>

        {type === "followers" && (
          <TouchableOpacity
            onPress={() => handlePressFollow({ item })}
            activeOpacity={DEFAULT_OPACITY}
          >
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: isFollowing ? colors.GREY : colors.WHITE,
                borderRadius: 9999,
                justifyContent: "center",
                alignItems: "center",
                width: width * 0.28
              }}
            >
              <Text
                style={{
                  fontFamily: "MontserratRegular",
                  fontSize: 14,
                  color: colors.BLACK_I,
                  opacity: isFollowing ? 0.7 : 1
                }}
              >
                {isFollowing ? "Seguindo" : "Seguir"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export function Followers() {
  const { navigate, goBack } = useNavigation()
  const { params } = useRoute()

  const followersData = [
    {
      name: "RainhaDoMolho",
      avatar_url: "https://randomuser.me/api/portraits/women/93.jpg",
      isFollowing: false,
      isOnlne: true
    },
    {
      name: "JaneteJoanaJJ",
      avatar_url: "https://randomuser.me/api/portraits/women/27.jpg",
      isFollowing: false,
      isOnlne: false
    },
    {
      name: "RoqueiroMaluco",
      avatar_url: "https://randomuser.me/api/portraits/men/6.jpg",
      isFollowing: false,
      isOnlne: false
    },
    {
      name: "MarcoSSix",
      avatar_url: "https://randomuser.me/api/portraits/men/12.jpg",
      isFollowing: true,
      isOnlne: true
    }
  ]

  return (
    <Screen>
      <View style={{ flex: 1, backgroundColor: colors.BLACK_II }}>
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

            <Text
              style={{
                fontFamily: "PoppinsSemiBold",
                fontSize: 18,
                color: colors.WHITE
              }}
            >
              Seguidores
            </Text>

            <TouchableOpacity activeOpacity={DEFAULT_OPACITY}>
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={20}
                color={colors.WHITE}
              />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          contentContainerStyle={{ paddingHorizontal: 16 }}
          data={followersData}
          renderItem={renderFollowerCard}
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
        />
      </View>
    </Screen>
  )
}
