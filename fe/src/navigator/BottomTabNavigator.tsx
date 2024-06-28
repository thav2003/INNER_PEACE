import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "~/screens/HomeScreen";
import { userIcons } from "~/utils/bottomTabConfig";
import MediationScreen from "~/screens/MediationScreen";
import { AppStackParamList } from "./AppNavigator";
export type BottomTabParamList = AppStackParamList & {
  HOME_TAB?: { page?: number; size?: number };
  MEDIATION_TAB: undefined;
};
const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          backgroundColor: "#000522",
          borderRadius: 35,
          height: 70,
        },
      }}
    >
      <Tab.Screen
        name="HOME_TAB"
        component={HomeScreen}
        initialParams={{ page: 0, size: 2 }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: focused ? "#66DBF5" : "",
                  width: 50,
                  marginTop: 10,
                  marginBottom: 10,
                  borderRadius: 50,
                },
              ]}
            >
              <Image
                source={focused ? userIcons[0].focused : userIcons[0].default}
                resizeMode="contain"
                style={{ width: 22, height: 22 }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MEDIATION_TAB"
        component={MediationScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: focused ? "#66DBF5" : "",
                  width: 50,
                  marginTop: 10,
                  marginBottom: 10,
                  borderRadius: 50,
                },
              ]}
            >
              <Image
                source={focused ? userIcons[1].focused : userIcons[1].default}
                resizeMode="contain"
                style={{ width: 22, height: 22 }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
