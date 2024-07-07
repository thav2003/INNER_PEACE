import MainLayout from "~/layouts/MainLayout";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppParamList } from "~/navigator/AppNavigator";
import { colors } from "~/utils/colors";
import IMAGE_LAYOUT from "assets/wave-haikei.svg";
import FLOWER from "assets/flower.svg";
type Props = NativeStackScreenProps<AppParamList, "VIEW_PACKAGE">;
const ViewPackageScreen: React.FC<Props> = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={{ position: "relative" }}>
        <IMAGE_LAYOUT />
        <View style={{ position: "absolute", bottom: 20, right: 20 }}>
          <FLOWER />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View style={{ width: "80%", gap: 10 }}>
          <Text
            style={{
              fontSize: 24,

              textAlign: "left",
              fontWeight: 700,
              color: colors.white,
              paddingHorizontal: 20,
            }}
          >
            Nhấn vào để xem thêm
          </Text>
          <View
            style={{
              padding: 16,
              borderStyle: "solid",
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ padding: 4 }}>
              <Text
                style={{
                  fontSize: 20,

                  textAlign: "left",
                  fontWeight: 700,
                  color: colors.white,
                }}
              >
                Essential Tháng
              </Text>

              <Text
                style={{
                  fontSize: 12,

                  textAlign: "left",
                  fontWeight: 400,
                  color: colors.white,
                }}
              >
                Thử miễn phí trong 17 ngày.
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate("VIEW_PACKAGE_DETAIL", {
                  name: "Essential",
                  money: 2000,
                  item: [
                    {
                      title: "Tính năng của gói cơ bản",
                      description:
                        "Bao gồm tất cả các tính năng có sẵn trong các gói miễn phí.",
                    },
                    {
                      title: "Các bài tập nâng cao theo chủ đề.",
                      description:
                        "Mở rộng các gói tập thiền và giảm căng thẳng.",
                    },
                    {
                      title: "Kết nối cộng đồng.",
                      description: "Mở rộng hỗ trợ xã hội tới mọi người.",
                    },
                    {
                      title: "Chương trình dinh dưỡng cá nhân.",
                      description:
                        "Phân tích lượng thức ăn, đề xuất theo thói quen hằng ngày theo thể trạng từng ngườ",
                    },
                  ],
                })
              }
            >
              <View
                style={{
                  paddingVertical: 4,
                  paddingHorizontal: 20,
                  borderStyle: "solid",
                  borderColor: "white",
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: colors.white,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,

                    textAlign: "right",
                    fontWeight: 700,
                    color: colors.primary,
                  }}
                >
                  79,000 vnđ
                </Text>
                <Text
                  style={{
                    fontSize: 12,

                    textAlign: "right",
                    fontWeight: 400,
                    color: colors.primary,
                  }}
                >
                  / 1 tháng
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              padding: 16,
              borderStyle: "solid",
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ padding: 4 }}>
              <Text
                style={{
                  fontSize: 20,

                  textAlign: "left",
                  fontWeight: 700,
                  color: colors.white,
                }}
              >
                Premium Tháng
              </Text>
              <Text
                style={{
                  fontSize: 12,

                  textAlign: "left",
                  fontWeight: 400,
                  color: colors.white,
                }}
              >
                Thử miễn phí trong 17 ngày.
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate("VIEW_PACKAGE_DETAIL", {
                  name: "Premium",
                  money: 149000,
                  item: [
                    {
                      title: "Tính năng của gói Essential.",
                      description:
                        "Bao gồm tất cả các tính năng có trong gói Essential.",
                    },
                    {
                      title: "Kết nối với chuyên gia tâm lý",
                      description:
                        "Mở rộng tính năng Hỗ trợ xã hội với Chuyên gia tâm lý.",
                    },
                    {
                      title: "Kết nối với chuyên gia dinh dưỡng",
                      description:
                        "Mở rộng tính năng Dinh dưỡng với Chuyên gia dinh dưỡng.",
                    },
                  ],
                })
              }
            >
              <View
                style={{
                  paddingVertical: 4,
                  paddingHorizontal: 20,
                  borderStyle: "solid",
                  borderColor: "white",
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: colors.white,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,

                    textAlign: "right",
                    fontWeight: 700,
                    color: colors.primary,
                  }}
                >
                  149,000 vnđ
                </Text>
                <Text
                  style={{
                    fontSize: 12,

                    textAlign: "right",
                    fontWeight: 400,
                    color: colors.primary,
                  }}
                >
                  / 1 tháng
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ViewPackageScreen;
