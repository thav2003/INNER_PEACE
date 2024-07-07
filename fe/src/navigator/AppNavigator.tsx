import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabNavigator from "./HomeNavigator";
import React from "react";
import LessonDetailScreen from "~/screens/LessonScreen/DetailScreen";
import SearchFoodScreen from "~/screens/SearchFoodScreen";
import { Text } from "react-native";
import { colors } from "~/utils/colors";
import VideoScreen from "~/screens/LessonScreen/VideoScreen";
import { UserLessonResponse } from "~/api/v1";
import ViewPackageScreen from "~/screens/SettingsScreen/Package/ViewPackageScreen";
import ViewPackageDetailScreen from "~/screens/SettingsScreen/Package/ViewPackageDetailScreen";
import PaymentScreen from "~/screens/PaymentScreen";
import { TransferInfoType } from "~/types/types";

export type AppParamList = {
  HOME: undefined;
  LESSON_DETAIL: { lessonId: number; historyLesson?: UserLessonResponse };
  SEARCH_FOOD: { slot: string };
  LESSON_VIDEO: { videoUrl: string; lessonId: number; currentTime?: number };
  VIEW_PACKAGE: undefined;
  VIEW_PACKAGE_DETAIL: {
    name: string;
    money: number;
    item: { title: string; description: string }[];
  };
  PAYMENT: TransferInfoType;
};

const Stack = createNativeStackNavigator<AppParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HOME" component={HomeTabNavigator} />
      <Stack.Screen name="LESSON_DETAIL" component={LessonDetailScreen} />
      <Stack.Screen
        name="SEARCH_FOOD"
        component={SearchFoodScreen}
        options={({ route }) => ({
          title: route.params.slot,
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#3F54DB",
          },
          headerTintColor: "white",
        })}
      />
      <Stack.Screen name="LESSON_VIDEO" component={VideoScreen} />
      <Stack.Screen
        name="VIEW_PACKAGE"
        options={({ route }) => ({
          title: "",
          headerShown: true,
          headerTransparent: true,
          headerTintColor: colors.primary,
        })}
        component={ViewPackageScreen}
      />
      <Stack.Screen
        name="VIEW_PACKAGE_DETAIL"
        options={({ route }) => ({
          title: "",
          headerShown: true,
          headerTransparent: true,
          headerTintColor: colors.primary,
        })}
        component={ViewPackageDetailScreen}
      />
      <Stack.Screen
        name="PAYMENT"
        options={({ route }) => ({
          title: "",
          headerShown: true,
          headerTransparent: true,
          headerTintColor: colors.primary,
        })}
        component={PaymentScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
