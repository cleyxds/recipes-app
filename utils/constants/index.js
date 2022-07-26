import { Platform } from "react-native"

import config from "./config"

const isAndroid = Platform.OS === "android"
const isIOS = Platform.OS === "ios"

export { isAndroid, isIOS, config }
