import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "~/screens/WelcomeScreen";
import HomeScreen from "~/screens/HomeScreen";
import LessonDetailScreen from "~/screens/LessonScreen/DetailScreen";
import ForgetpasswordScreen from "~/screens/ForgetpasswordScreen";
import OtpScreen from "~/screens/ForgetpasswordScreen/OtpScreen";
import ChangepasswordScreen from "~/screens/ForgetpasswordScreen/ChangepasswordScreen";
import SplashScreen from "~/screens/SplashScreen";
import BottomTabNavigator from "./BottomTabNavigator";

export type AppStackParamList = {
  LOGIN: undefined;
  REGISTER: undefined;
  WELCOME: undefined;
  HOME: undefined;
  LESSON_DETAIL: { lessonId: number };
  FORGOT_PASSWORD: undefined;
  OTP: { email: string };
  CHANGE_PASSWORD: { email: string; otp: string };
  SPLASH: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="WELCOME" component={WelcomeScreen} />
      <Stack.Screen name="LOGIN" component={LoginScreen} />
      <Stack.Screen name="REGISTER" component={RegisterScreen} />
      <Stack.Screen name="FORGOT_PASSWORD" component={ForgetpasswordScreen} />
      <Stack.Screen name="OTP" component={OtpScreen} />
      <Stack.Screen name="CHANGE_PASSWORD" component={ChangepasswordScreen} />
      <Stack.Screen name="SPLASH" component={SplashScreen} />
      <Stack.Screen name="HOME" component={BottomTabNavigator} />
      {/* <Stack.Screen
        name="HOME"
        component={HomeScreen}
        initialParams={{ page: 0, size: 2 }}
      /> */}
      <Stack.Screen name="LESSON_DETAIL" component={LessonDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
