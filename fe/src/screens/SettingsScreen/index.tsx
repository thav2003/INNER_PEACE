import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo } from "react";
import { colors } from "../../utils/colors";
import Calendar, { MoodData } from "~/components/Calendar";
import { CompositeScreenProps, useNavigation } from "@react-navigation/native";
import MainLayout from "~/layouts/MainLayout";
import { AppParamList } from "~/navigator/AppNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeParamList } from "~/navigator/AppTabNavigator";
import { useAppStore } from "~/stores/app.store";
import { useAuthStore } from "~/stores/auth.store";
import { formatToVietnamDate } from "~/utils/time";
import useFetch from "~/hooks/useFetch";
import api from "~/api";
import { InitialStackParamList } from "~/navigator/InitialNavigator";
const priorityMap: any = {
  Basic: 1,
  Essential: 2,
  Premium: 3,
};
function getHighestPackage(purchasedPackages: string[]) {
  let highestPackage = null;
  let highestPriority = -1;

  purchasedPackages.forEach((pkg) => {
    const priority = priorityMap[pkg] || -1; // Lấy giá trị ưu tiên hoặc -1 nếu không tìm thấy gói
    if (priority > highestPriority) {
      highestPriority = priority;
      highestPackage = pkg;
    }
  });

  return highestPackage;
}
type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeParamList, "SETTING">,
  NativeStackScreenProps<InitialStackParamList, "APP", "LOGIN">
>;
// type Props = NativeStackScreenProps<HomeParamList, "SETTING">;

const SettingsScreen: React.FC<Props> = ({ navigation, route }) => {
  const logout = useAuthStore((state) => state.logoutUser);
  const accessToken = useAuthStore((state) => state.accessToken);
  const userId = useAuthStore((state) => state.auth?.userId);
  const profile = useAuthStore((state) => state.profile);
  const purchasedPackages = useAuthStore(
    (state) => state.profile?.purchasedPackages
  );
  const highestPackage = useMemo(
    () => getHighestPackage(purchasedPackages ? purchasedPackages : []),
    [purchasedPackages]
  );
  const [responseCurrentInMonth] = useFetch({
    fetchFunction: () =>
      api.getNutritionSummaryForCurrentMonth({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
  });
  const [responseOldLesson] = useFetch({
    fetchFunction: () => api.getWatchedLessons(userId!, 0, 2),
  });
  const handleSettingsDetail = () => {
    //   navigation.navigate("SETTINGS_DETAIL");
  };
  const moodData = {
    "2024-6-1": "veryGood",
    "2024-6-2": "good",
    "2024-6-3": "normal",
    "2024-6-4": "bad",
    "2024-6-5": "veryBad",
  } as MoodData;
  return (
    <MainLayout style={styles.container}>
      <StatusBar />
      <TouchableOpacity
        style={styles.settingBtn}
        onPress={handleSettingsDetail}
      >
        <Image source={require("assets/icons/settings-detail.png")} />
      </TouchableOpacity>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("assets/avatar.png")}
          resizeMode="contain"
          style={{ width: 70, height: 70, marginBottom: 5 }}
        />
        <Text
          style={{
            color: colors.white,
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 5,
          }}
        >
          {profile?.fullName}
        </Text>
        <Text
          style={{
            color: colors.white,
            fontSize: 14,
            fontWeight: "400",
            marginBottom: 10,
          }}
        >
          Tham gia vào {formatToVietnamDate(new Date(profile?.createdAt!))}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <View style={styles.totalContainer}>
          <Text style={styles.totalDuration}>54</Text>
          <Text style={styles.totalType}>Thời lượng tập</Text>
        </View>
        <View
          style={{ width: 1, height: 65, backgroundColor: colors.white }}
        ></View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalDuration}>
            {responseOldLesson ? responseOldLesson.data?.totalElements : 0}
          </Text>
          <Text style={styles.totalType}>Bài tập</Text>
        </View>
        <View
          style={{ width: 1, height: 65, backgroundColor: colors.white }}
        ></View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalDuration}>
            {responseCurrentInMonth
              ? responseCurrentInMonth.daysExactly2000
              : 0}
          </Text>
          <Text style={styles.totalType}>Ngày ăn đúng</Text>
        </View>
      </View>
      <View style={styles.moodContainer}>
        <Text style={styles.title}>Tâm trạng của bạn</Text>
        <Calendar moodData={moodData} />
      </View>
      <View style={styles.packageContainer}>
        <Text style={styles.title}>Gói hiện tại</Text>
        <View style={styles.package}>
          <Text
            style={{ color: colors.white, fontWeight: "bold", fontSize: 20 }}
          >
            {highestPackage}
          </Text>
          <Text
            style={{ color: colors.white, fontWeight: "400", fontSize: 16 }}
          >
            Các chức năng của gói {highestPackage}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.upgradeBtn}
          onPress={() => navigation.navigate("APP", { screen: "VIEW_PACKAGE" })}
        >
          <Text
            style={{ fontSize: 20, fontWeight: "bold", color: colors.white }}
          >
            Nâng cấp ngay
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.upgradeBtn}
          onPress={() => {
            logout();
            navigation.navigate("LOGIN");
          }}
        >
          <Text
            style={{ fontSize: 20, fontWeight: "bold", color: colors.white }}
          >
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 16,
  },
  settingBtn: {
    backgroundColor: colors.secondary,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  totalContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 25,
  },
  totalDuration: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
  },
  totalType: {
    fontSize: 16,
    fontWeight: "300",
    color: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 10,
  },
  moodContainer: {
    marginTop: 10,
  },
  packageContainer: {
    marginTop: 10,
  },
  package: {
    backgroundColor: "#8E59FF",
    borderRadius: 16,
    width: "100%",
    height: 140,
    justifyContent: "center",
    paddingLeft: 20,
  },
  upgradeBtn: {
    marginTop: 15,
    backgroundColor: colors.secondary,
    width: "100%",
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
