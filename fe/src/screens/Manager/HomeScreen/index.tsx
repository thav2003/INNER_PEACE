import React, { useState, useEffect, memo, useMemo } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { colors } from "~/utils/colors";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header from "~/components/Header";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LessonDto, LessonPagedResponse } from "~/api/v1";
import { formatImageUrl } from "~/utils/image";
import api, { spoonacularApi } from "~/api";
import { useAuthStore } from "~/stores/auth.store";
import MoodSlider from "~/components/MoodSlider";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import MainLayout from "~/layouts/MainLayout";
import ListItem from "~/components/ListLessonItem";
import { ManagerTabParamList } from "~/navigator/ManagerTabNavigator";
import { BarChart } from "react-native-gifted-charts";
import { formatCurrencyVND } from "~/utils/number";
import useFetch from "~/hooks/useFetch";
import { Card } from "react-native-paper";

type Props = NativeStackScreenProps<ManagerTabParamList, "HOME_TAB">;

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const [responseToday] = useFetch({
    fetchFunction: () => api.getTodayDashboard(),
  }) as any;
  const [responseWeekly] = useFetch({
    fetchFunction: () => api.getWeeklyRevenue(),
  });

  const totalWeekly = useMemo(() => {
    return responseWeekly
      ? responseWeekly.reduce((total, current) => total + current, 0)
      : 0;
  }, [responseWeekly]);

  const dollor = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z"
        fill="#fff"
      ></path>
      <path
        d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z"
        fill="#fff"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const profile = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
        fill="#fff"
      ></path>
      <path
        d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
        fill="#fff"
      ></path>
      <path
        d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
        fill="#fff"
      ></path>
      <path
        d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const heart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const count = [
    {
      today: "Doanh thu hôm nay",
      title: formatCurrencyVND(responseToday ? responseToday.revenueToday : 0),
      icon: dollor,
      bnb: "bnb2",
    },
    {
      today: "Lợi nhuận hôm nay",
      title: `+${responseToday ? responseToday.profitToday : 0}%`,
      icon: profile,
      bnb: "bnb2",
    },
    {
      today: "Giao dịch hôm nay",
      title: responseToday ? responseToday.paymentCountToday : 0,
      icon: heart,
      bnb: "redtext",
    },
    {
      today: "Số người đăng kí",
      title: responseToday ? responseToday.paymentCountToday : 0,
      icon: heart,
      bnb: "redtext",
    },
  ];
  const barData = useMemo(() => {
    return [
      {
        value: responseWeekly ? responseWeekly[0] : 0,
        label: "Thứ 2",
        frontColor: "#4ABFF4",
        sideColor: "#23A7F3",
        topColor: "#92e6f6",
      },
      {
        value: responseWeekly ? responseWeekly[1] : 0,
        label: "Thứ 3",
        frontColor: "#79C3DB",
        sideColor: "#68BCD7",
        topColor: "#9FD4E5",
      },
      {
        value: responseWeekly ? responseWeekly[2] : 0,
        label: "Thứ 4",
        frontColor: "#28B2B3",
        sideColor: "#0FAAAB",
        topColor: "#66C9C9",
      },
      {
        value: responseWeekly ? responseWeekly[3] : 0,
        label: "Thứ 5",
        frontColor: "#4ADDBA",
        sideColor: "#36D9B2",
        topColor: "#7DE7CE",
      },
      {
        value: responseWeekly ? responseWeekly[4] : 0,
        label: "Thứ 6",
        frontColor: "#91E3E3",
        sideColor: "#85E0E0",
        topColor: "#B0EAEB",
      },
      {
        value: responseWeekly ? responseWeekly[5] : 0,
        label: "Thứ 7",
        frontColor: "#4ADDBA",
        sideColor: "#36D9B2",
        topColor: "#7DE7CE",
      },
      {
        value: responseWeekly ? responseWeekly[6] : 0,
        label: "Chủ nhật",
        frontColor: "#79C3DB",
        sideColor: "#68BCD7",
        topColor: "#9FD4E5",
      },
    ];
  }, [responseWeekly]);

  return (
    <MainLayout style={styles.container}>
      <Header />
      <View
        style={{
          backgroundColor: colors.primary,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            backgroundColor: colors.primary,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: colors.input, fontSize: 18, fontWeight: 400 }}>
            Doanh thu tuần này
          </Text>
          <Text
            style={{
              color: colors.white,
              fontSize: 26,
              fontWeight: "bold",
            }}
          >
            {formatCurrencyVND(totalWeekly)}
          </Text>
        </View>

        <View style={{ marginTop: 20, marginVertical: 20 }}>
          <BarChart
            showFractionalValues
            hideRules
            data={barData}
            barWidth={Dimensions.get("screen").width / 13}
            sideWidth={15}
            // isThreeD
            side="right"
            isAnimated
            yAxisThickness={0}
            xAxisThickness={0}
            hideYAxisText
          />
        </View>
      </View>
      <View>
        <FlatList
          scrollEnabled={false}
          data={count}
          numColumns={2}
          keyExtractor={(item) => item.today}
          renderItem={({ item }) => (
            <View
              key={item.today}
              style={{
                flex: 1,
                margin: 8,
              }}
            >
              <Card style={{ height: 100 }}>
                <Card.Title
                  title={
                    <Text
                      numberOfLines={1}
                      className="font-bold text-lg text-[#3F54DB]"
                    >
                      {item.today}
                    </Text>
                  }
                />
                <Card.Content>
                  <Text>{item.title}</Text>
                </Card.Content>
              </Card>
            </View>
          )}

          // }}
        />
      </View>
    </MainLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
    width: "100%",
  },
  logoText: {
    color: colors.primary,
    fontSize: 26,
    fontWeight: "bold",
  },
});
