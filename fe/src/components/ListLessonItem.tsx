import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { memo, useMemo } from "react";
import { TouchableOpacity, Image, View, Text, Alert } from "react-native";
import { LessonDto, UserLessonResponse } from "~/api/v1";
import { AppParamList } from "~/navigator/AppNavigator";
import { HomeParamList } from "~/navigator/AppTabNavigator";
import { useAuthStore } from "~/stores/auth.store";
import { formatImageUrl } from "~/utils/image";

type LessonDetailItemNavigationProp = NativeStackNavigationProp<
  AppParamList,
  "LESSON_DETAIL"
>;

const ListLessonItem: React.FC<{
  item: LessonDto;
  historyLesson?: UserLessonResponse;
  showDetail?: boolean;
}> = ({ item, historyLesson, showDetail }) => {
  const navigation = useNavigation<LessonDetailItemNavigationProp>();
  const purchasedPackages = useAuthStore(
    (state) => state.profile?.purchasedPackages
  );
  const isInPurchasedPackages = useMemo(() => {
    if (!item.categories || !purchasedPackages) {
      return false;
    }
    return item.categories.some((category) =>
      purchasedPackages.includes(category)
    );
  }, [item.categories, purchasedPackages]);

  const handleClick = () => {
    if (isInPurchasedPackages) {
      navigation.navigate("LESSON_DETAIL", {
        lessonId: item?.id!,
        historyLesson: historyLesson,
      });
      console.log("CÓ THỂ");
    } else {
      // Alert.alert(
      //   "Thông báo",
      //   `Vui lòng mua gói ${
      //     item.categories?.includes("Essential")
      //       ? "Essential"
      //       : item.categories?.includes("Premium")
      //       ? "Premium"
      //       : "Chưa có thông tin gói"
      //   }`
      // );
      console.log("KHÔNG THỂ");
    }
  };
  console.log(isInPurchasedPackages);
  return (
    <View
      key={item?.id}
      style={
        !showDetail
          ? {
              alignItems: "center",
              marginVertical: 8,
            }
          : {
              flex: 1,
              margin: 5,
            }
      }
    >
      <TouchableOpacity
        onPress={handleClick}
        style={{ width: "100%", position: "relative" }}
      >
        {!isInPurchasedPackages && (
          <View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>{`Vui lòng mua gói ${
              item.categories?.includes("Essential")
                ? "Essential"
                : item.categories?.includes("Premium")
                ? "Premium"
                : "Chưa có thông tin gói"
            }`}</Text>
          </View>
        )}

        <Image
          source={{ uri: formatImageUrl(item?.imgUrl) + "?" + new Date() }}
          height={200}
          style={{
            width: "100%",
            opacity: isInPurchasedPackages ? 1 : 0.6,
          }}
          resizeMode="cover"
        />
        {showDetail && (
          <>
            <Text className="line-clamp-2 font-bold text-lg text-[#3F54DB]">
              {item.name}
            </Text>
            <Text className="text-[#3F54DB]">{`Thời gian: ${item.duration} phút`}</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default memo(ListLessonItem);
