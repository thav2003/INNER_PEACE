import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "~/screens/HomeScreen";
import { userIcons } from "~/utils/bottomTabConfig";
import MediationScreen from "~/screens/MediationScreen";
import LessonDetailScreen from "~/screens/LessonScreen/DetailScreen";
import MainLayout from "~/layouts/MainLayout";
import ScheduleScreen from "~/screens/ScheduleScreen";
import SearchFoodScreen from "~/screens/SearchFoodScreen";
import SettingsScreen from "~/screens/SettingsScreen";

export type HomeParamList = {
  HOME_TAB?: undefined;
  MEDIATION_TAB: undefined;
  SCHEDULE: undefined;
  SETTING: undefined;
};
const Tab = createBottomTabNavigator<HomeParamList>();

const HomeTabNavigator = () => {
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
      <Tab.Screen
        name="SCHEDULE"
        component={ScheduleScreen}
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
                source={focused ? userIcons[2].focused : userIcons[2].default}
                resizeMode="contain"
                style={{ width: 22, height: 22 }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SETTING"
        component={SettingsScreen}
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
                source={focused ? userIcons[4].focused : userIcons[4].default}
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

export default HomeTabNavigator;

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
