import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManagerTabNavigator from "./ManagerTabNavigator";
import React from "react";
import ChatScreen from "~/screens/ChatScreen";

export type ManagerParamList = {
  HOME: undefined;
  CHAT_DETAIL: undefined;
};

const Stack = createNativeStackNavigator<ManagerParamList>();

const ManagerNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HOME" component={ManagerTabNavigator} />
      <Stack.Screen name="CHAT_DETAIL" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default ManagerNavigator;
