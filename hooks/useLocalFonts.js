import { useFonts } from "expo-font"

import PoppinsSemiBold from "../assets/fonts/Poppins/Poppins-SemiBold.ttf"

import DMSansRegular from "../assets/fonts/DMSans/DMSans-Regular.ttf"
import DMSansMedium from "../assets/fonts/DMSans/DMSans-Medium.ttf"
import DMSansBold from "../assets/fonts/DMSans/DMSans-Bold.ttf"

import MontserratRegular from "../assets/fonts/Montserrat/Montserrat-Regular.ttf"
import MontserratMedium from "../assets/fonts/Montserrat/Montserrat-Medium.ttf"
import MontserratSemiBold from "../assets/fonts/Montserrat/Montserrat-SemiBold.ttf"
import MontserratBold from "../assets/fonts/Montserrat/Montserrat-Bold.ttf"
import MontserratExtraBold from "../assets/fonts/Montserrat/Montserrat-ExtraBold.ttf"

import NunitoSemiBold from "../assets/fonts/Nunito/Nunito-SemiBold.ttf"
import NunitoBold from "../assets/fonts/Nunito/Nunito-Bold.ttf"
import NunitoExtraBold from "../assets/fonts/Nunito/Nunito-ExtraBold.ttf"

import NunitoSansRegular from "../assets/fonts/NunitoSans/NunitoSans-Regular.ttf"

export function useLocalFonts() {
  const [fontsLoaded] = useFonts({
    PoppinsSemiBold,
    DMSansRegular,
    DMSansMedium,
    DMSansBold,
    MontserratRegular,
    MontserratMedium,
    MontserratSemiBold,
    MontserratBold,
    MontserratExtraBold,
    NunitoSemiBold,
    NunitoBold,
    NunitoExtraBold,
    NunitoSansRegular
  })

  return { fontsLoaded }
}
