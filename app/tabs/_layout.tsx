import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from ".";
import MiPerfil from "./miPerfil";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { colors } from "@/constants/Colors";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.orange,
        tabBarInactiveTintColor: colors.grey,
        tabBarStyle: {
          height: 55,
          backgroundColor: colors.bgBlack,
          borderColor: colors.bgBlack,
        },
        tabBarLabelStyle: {
          // Estilos aplicados a la etiqueta del texto de la tabBar
          fontSize: 12,
          marginBottom: 5,
        },
        tabBarIconStyle: {
          // Estilo para el ícono
          marginTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MiPerfil"
        component={MiPerfil}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
