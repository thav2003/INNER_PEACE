import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "~/screens/SplashScreen";
import AppNavigator from "./AppNavigator";

export type InitialStackParamList = {
  Splash: undefined;
  App: undefined;
};
const Stack = createNativeStackNavigator<InitialStackParamList>();
const InitialNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="App" component={AppNavigator} />
    </Stack.Navigator>
  );
};
export default InitialNavigator;
