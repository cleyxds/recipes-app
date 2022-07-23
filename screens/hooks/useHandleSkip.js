import { useNavigation } from "@react-navigation/native"

import wait from "../../utils/wait"

export default () => {
  const { navigate } = useNavigation()

  async function handleSkip() {
    console.log("começou o handleSkip")
    await wait(300)
    navigate("Login")
    console.log("terminou o handleSkip")
  }

  return { handleSkip }
}
