import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "~/screens/SplashScreen";
import AppNavigator, { AppParamList } from "./AppNavigator";
import { NavigatorScreenParams } from "@react-navigation/native";
import ForgetpasswordScreen from "~/screens/ForgetpasswordScreen";
import ChangepasswordScreen from "~/screens/ForgetpasswordScreen/ChangepasswordScreen";
import OtpScreen from "~/screens/ForgetpasswordScreen/OtpScreen";
import LoginScreen from "~/screens/LoginScreen";
import RegisterScreen from "~/screens/RegisterScreen";
import WelcomeScreen from "~/screens/WelcomeScreen";
import React from "react";
import ManagerNavigator, { ManagerParamList } from "./ManagerNavigator";

export type InitialStackParamList = {
  SPLASH: undefined;
  FORGOT_PASSWORD: undefined;
  OTP: { email: string };
  CHANGE_PASSWORD: { email: string; otp: string };
  LOGIN: undefined;
  REGISTER: undefined;
  WELCOME: undefined;
  APP: NavigatorScreenParams<AppParamList>;
  MANAGER: NavigatorScreenParams<ManagerParamList>;
};
const Stack = createNativeStackNavigator<InitialStackParamList>();
const InitialNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MANAGER"
    >
      <Stack.Screen name="SPLASH" component={SplashScreen} />
      <Stack.Screen name="APP" component={AppNavigator} />
      <Stack.Screen name="MANAGER" component={ManagerNavigator} />
      <Stack.Screen name="WELCOME" component={WelcomeScreen} />
      <Stack.Screen name="LOGIN" component={LoginScreen} />
      <Stack.Screen name="REGISTER" component={RegisterScreen} />
      <Stack.Screen name="FORGOT_PASSWORD" component={ForgetpasswordScreen} />
      <Stack.Screen name="OTP" component={OtpScreen} />
      <Stack.Screen name="CHANGE_PASSWORD" component={ChangepasswordScreen} />
    </Stack.Navigator>
  );
};
export default InitialNavigator;
