import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from "react-native"

import { useUserStore } from "../stores/User"
import { useAuthStore } from "../stores/Auth"

import { getStatusBarHeight } from "react-native-status-bar-height"

import { BellIcon, DoubleArrowIcon, ThermometerIcon } from "../assets/icons"
import BalanceImageBackground from "../assets/images/Dashboard/balance.png"

import { DEFAULT_OPACITY } from "../utils/units"
import colors from "../utils/colors"

export function Dashboard() {
  const { height } = useWindowDimensions()
  const { user } = useUserStore()
  const { auth } = useAuthStore()

  const [firstName] = user?.username?.split(" ")

  async function toggleNotifications() {}
  function handleBillDetails() {}
  function handleMakePayment() {}

  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        { backgroundColor: colors.AUTHENTICATION_BLUE_II }
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingTop: getStatusBarHeight(),
          paddingBottom: 36.19,
          flex: 1
        }}
      >
        <View
          style={{
            marginTop: 36,
            marginLeft: 30,
            marginRight: 17,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 24,
                color: colors.WHITE
              }}
            >
              Welcome{"\n"}to Duke Energy
            </Text>

            {!!firstName ? (
              <Text
                style={{
                  marginTop: 16,
                  color: colors.WHITE,
                  fontWeight: "700",
                  fontSize: 32,
                  lineHeight: 36
                }}
              >
                {firstName}
              </Text>
            ) : (
              <ActivityIndicator
                size="small"
                style={{ height: 36, alignSelf: "flex-start" }}
                color={colors.WHITE}
              />
            )}
          </View>

          <TouchableOpacity
            touchSoundDisabled
            onPress={toggleNotifications}
            activeOpacity={DEFAULT_OPACITY}
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              backgroundColor: colors.WHITE,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <BellIcon />
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderTopLeftRadius: 38,
            borderTopRightRadius: 38,
            minHeight: height * 0.7,
            backgroundColor: colors.WHITE,
            paddingHorizontal: 24
          }}
        >
          <View
            style={{
              marginTop: 27,
              paddingHorizontal: 24,
              paddingVertical: 29,
              backgroundColor: colors.DASHBOARD_INTRO_GREEN,
              borderRadius: 15
            }}
          >
            <Text
              style={{
                fontWeight: "400",
                fontSize: 14,
                lineHeight: 16,
                color: colors.AUTHENTICATION_GREY,
                textAlign: "center"
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor cidi dunt ut.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor cidi dunt ut.
            </Text>
          </View>

          <TouchableOpacity
            touchSoundDisabled
            activeOpacity={DEFAULT_OPACITY}
            style={{
              paddingHorizontal: 24,
              paddingVertical: 18,
              marginTop: 16,
              backgroundColor: colors.AUTHENTICATION_BLUE_II,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 14,
                lineHeight: 16,
                color: colors.WHITE
              }}
            >
              Add/Personalize/Override Thermostat
            </Text>
          </TouchableOpacity>

          <View style={{ marginTop: 16, backgroundColor: colors.WHITE }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.WHITE
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: colors.AUTHENTICATION_GREEN,
                  borderRadius: 8,
                  marginRight: 17
                }}
              >
                <ThermometerIcon />
              </View>

              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 16,
                  lineHeight: 20.83,
                  letterSpacing: 0.2,
                  color: colors.AUTHENTICATION_BLUE
                }}
              >
                Outdoor Temperature
              </Text>

              <View
                style={{
                  width: 1,
                  height: "75%",
                  marginHorizontal: 14,
                  backgroundColor: colors.DASHBOARD_STROKE_GREY
                }}
              />

              <Text
                style={{ fontWeight: "400", fontSize: 24, lineHeight: 29.26 }}
              >
                72°
              </Text>
            </View>
          </View>

          <View
            style={{
              minHeight: 181.81,
              marginTop: 16,
              borderRadius: 12,
              backgroundColor: colors.AUTHENTICATION_BLUE_II
            }}
          >
            <Image
              source={BalanceImageBackground}
              style={{ position: "absolute", top: 18, right: 21.48 }}
            />

            <View
              style={{
                paddingLeft: 21,
                paddingRight: 15,
                paddingTop: 18,
                paddingBottom: 13.81,
                flex: 1,
                justifyContent: "space-between"
              }}
            >
              <View>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 18,
                    lineHeight: 23.44,
                    color: colors.WHITE
                  }}
                >
                  Amount due
                </Text>
                <Text
                  style={{
                    marginTop: 6,
                    fontWeight: "700",
                    fontSize: 36,
                    lineHeight: 46.87,
                    color: colors.WHITE
                  }}
                >
                  $123.66
                </Text>
                <Text
                  style={{
                    marginTop: 6,
                    fontWeight: "600",
                    fontSize: 8,
                    lineHeight: 9.75,
                    color: colors.WHITE
                  }}
                >
                  Due Date 01/15/2021 - Autopay on
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <TouchableOpacity
                  activeOpacity={DEFAULT_OPACITY}
                  touchSoundDisabled
                  onPress={handleBillDetails}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 14,
                      color: colors.WHITE,
                      lineHeight: 16
                    }}
                  >
                    View Bill Details
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  touchSoundDisabled
                  activeOpacity={DEFAULT_OPACITY}
                  onPress={handleMakePayment}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Text
                    style={{
                      fontWeight: "800",
                      fontSize: 14,
                      color: colors.AUTHENTICATION_GREEN,
                      lineHeight: 16,
                      marginRight: 5
                    }}
                  >
                    Make a Payment
                  </Text>
                  <DoubleArrowIcon />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
