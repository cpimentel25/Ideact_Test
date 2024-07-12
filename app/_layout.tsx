import { SafeAreaProvider } from "react-native-safe-area-context";
import DetailsTrack from "./detailsTrack/[id]";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootParamList } from "@/types/types";
import TabNavigation from "./tabs/_layout";
import { colors } from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();
// const Stack = createNativeStackNavigator<RootParamList>();

export default function RootLayout() {
  return (
    <NavigationContainer independent={true}>
      <SafeAreaProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="TabNavigation"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen name="+not-found" /> */}
          <Stack.Screen
            name="DetailsTrack"
            component={DetailsTrack}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
