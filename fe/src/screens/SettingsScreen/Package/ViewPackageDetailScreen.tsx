import MainLayout from "~/layouts/MainLayout";
import { Text, View, StyleSheet, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppParamList } from "~/navigator/AppNavigator";
import { colors } from "~/utils/colors";
import IMAGE_LAYOUT from "assets/wave-haikei.svg";
import FLOWER from "assets/flower.svg";
import MINI_FLOW from "assets/miniflow.svg";
import { Button } from "react-native-paper";
import * as Linking from "expo-linking";
import { createPaymentLink } from "~/api/payos";
import { formatCurrencyVND } from "~/utils/number";
import { TransferInfoType } from "~/types/types";
import { useAuthStore } from "~/stores/auth.store";
type Props = NativeStackScreenProps<AppParamList, "VIEW_PACKAGE_DETAIL">;

const ViewPackageDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { item, name, money } = route.params;
  const userId = useAuthStore((state) => state.auth?.userId);
  const handleBuy = async () => {
    try {
      let res = await createPaymentLink({
        productName: `Mua gói ${name}`,
        price: money,
        description: `Mua gói ${name}`,
        returnUrl: `payos://Result`,
        cancelUrl: "payos://Result",
        userId: userId!,
        packages: name,
      });
      if (res.error === undefined)
        throw new Error("Không thể kết nối đến server");
      if (res.error !== 0) throw new Error(res.message);

      console.log(res.data);

      navigation.navigate("PAYMENT", res.data as TransferInfoType);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  return (
    <MainLayout
      style={{ flex: 1, backgroundColor: colors.white }}
      haveFooter={false}
    >
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
          gap: 30,
        }}
      >
        <View style={{ width: "80%", gap: 30 }}>
          <Text
            style={{
              fontSize: 24,

              textAlign: "left",
              fontWeight: 700,
              color: colors.white,
              paddingHorizontal: 20,
            }}
          >
            Phiên bản nâng cấp
          </Text>
          {item &&
            item.map((i, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 10,
                }}
              >
                <MINI_FLOW />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 16,
                      fontWeight: 500,
                      borderStyle: "solid",
                      borderColor: "white",
                      borderBottomWidth: 1,
                      width: "100%",
                    }}
                  >
                    {i.title}
                  </Text>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 14,
                      fontWeight: 400,
                    }}
                  >
                    {i.description}
                  </Text>
                </View>
              </View>
            ))}

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
                {name}
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
                {formatCurrencyVND(money)}
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
          </View>
        </View>
        <Button
          mode="outlined"
          textColor={colors.white}
          style={{ borderColor: colors.white, width: 200, marginBottom: 30 }}
          onPress={handleBuy}
        >
          Đăng kí
        </Button>
      </View>
    </MainLayout>
  );
};

export default ViewPackageDetailScreen;
