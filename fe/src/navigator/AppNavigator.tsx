import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "~/screens/WelcomeScreen";
import HomeScreen from "~/screens/HomeScreen";
import LessonDetailScreen from "~/screens/LessonScreen/DetailScreen";

export type AppStackParamList = {
  LOGIN: undefined;
  REGISTER: undefined;
  WELCOME: undefined;
  HOME: undefined;
  LESSON_DETAIL: { lessonId: number | undefined };
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

      <Stack.Screen name="HOME" component={HomeScreen} />
      <Stack.Screen name="LESSON_DETAIL" component={LessonDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
