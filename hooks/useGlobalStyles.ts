import { colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useGlobalStyles = () => {
  const insets = useSafeAreaInsets();

  const mainContainer = {
    flex: 1,
    backgroundColor: colors.bgBlack,
    paddingHorizontal: 20,
    paddingTop: insets.top,
  };

  const text = {
    color: colors.white,
  };

  return {
    mainContainer,
    text,
  };
};
