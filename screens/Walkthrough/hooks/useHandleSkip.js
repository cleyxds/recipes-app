import { useNavigation } from "@react-navigation/native"

import wait from "../../../utils/wait"

export default () => {
  const { navigate } = useNavigation()

  async function handleSkip() {
    await wait(300)
    navigate("Register")
  }

  return { handleSkip }
}
