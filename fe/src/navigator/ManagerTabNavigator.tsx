import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "~/screens/Manager/HomeScreen";
import { managerIcons } from "~/utils/bottomTabConfig";
import MediationScreen from "~/screens/MediationScreen";
import LessonDetailScreen from "~/screens/LessonScreen/DetailScreen";
import MainLayout from "~/layouts/MainLayout";
import ScheduleScreen from "~/screens/ScheduleScreen";
import SearchFoodScreen from "~/screens/SearchFoodScreen";
import SettingsScreen from "~/screens/SettingsScreen";
import ChatScreen from "~/screens/ChatScreen";
import ListLessonScreen from "~/screens/Manager/ManagerLesson";
import ListChatScreen from "~/screens/ChatScreen/ListChatScreen";

export type ManagerTabParamList = {
  HOME_TAB?: undefined;
  LESSON_TAB: undefined;
  SCHEDULE: undefined;
  SETTING: undefined;
  CHAT: undefined;
};
const Tab = createBottomTabNavigator<ManagerTabParamList>();

const ManagerTabNavigator = () => {
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
                source={
                  focused ? managerIcons[0].focused : managerIcons[0].default
                }
                resizeMode="contain"
                style={{ width: 22, height: 22 }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="LESSON_TAB"
        component={ListLessonScreen}
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
                source={
                  focused ? managerIcons[1].focused : managerIcons[1].default
                }
                resizeMode="contain"
                style={{ width: 22, height: 22 }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="CHAT"
        component={ListChatScreen}
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
                source={
                  focused ? managerIcons[3].focused : managerIcons[3].default
                }
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
                source={
                  focused ? managerIcons[4].focused : managerIcons[4].default
                }
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

export default ManagerTabNavigator;

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
