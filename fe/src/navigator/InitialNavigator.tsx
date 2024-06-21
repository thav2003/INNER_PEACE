import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "~/screens/SplashScreen";
import AppNavigator, { AppStackParamList } from "./AppNavigator";
import { NavigatorScreenParams } from "@react-navigation/native";

export type InitialStackParamList = {
  SPLASH: undefined;
  APP: NavigatorScreenParams<AppStackParamList>;
};
const Stack = createNativeStackNavigator<InitialStackParamList>();
const InitialNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SPLASH"
    >
      <Stack.Screen name="SPLASH" component={SplashScreen} />
      <Stack.Screen name="APP" component={AppNavigator} />
    </Stack.Navigator>
  );
};
export default InitialNavigator;
