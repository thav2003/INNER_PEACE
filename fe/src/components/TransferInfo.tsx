import {
  View,
  StyleSheet,
  Alert,
  Image,
  Text,
  Pressable,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { ActivityIndicator, Button, Modal, Portal } from "react-native-paper";
import { cancelOrder, getBanksList } from "~/api/payos";
import { useEffect, useState, useRef } from "react";
import TransferInfoField from "./TransferInfoField";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import { captureRef } from "react-native-view-shot";
// import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import * as MediaLibrary from "expo-media-library";
import { io } from "socket.io-client";
import { SERVER_URL } from "@env";
import { useNavigation } from "@react-navigation/native";
import { TransferInfoType } from "~/types/types";
import Icon from "react-native-vector-icons/FontAwesome5";
import socket from "~/socket";
import { useAppStore } from "~/stores/app.store";
import { useAuthStore } from "~/stores/auth.store";

const TransferInfo = ({
  accountName,
  accountNumber,
  amount,
  bin,
  description,
  qrCode,
  orderCode,
}: TransferInfoType) => {
  const refetchApp = useAppStore((state) => state.refetchApp);
  const getProfile = useAuthStore((state) => state.getProfile);
  const [bank, setBank] = useState({ logo: undefined, name: undefined });
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ status: string }>();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const viewShotRef = useRef(null);
  const navigation = useNavigation();
  const getPermissionAndroid = async () => {
    try {
      let granted;
      if (parseInt(Platform.Version.toString()) >= 32) {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        );
      } else {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
      }
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err: any) {
      console.warn(err);
    }
  };

  const captureAndSaveImage = async () => {
    try {
      // Kiểm tra phiên bản android
      // if (Platform.OS === "android") {
      //   const granted = await getPermissionAndroid();
      //   if (!granted) {
      //     return;
      //   }
      // }

      if (permissionResponse?.status !== "granted") {
        await requestPermission();
      }
      if (!permissionResponse?.granted) {
        return;
      }

      if (viewShotRef.current) {
        const uri = await captureRef(viewShotRef, {
          fileName: `${accountNumber}_${bin}_${amount}_${orderCode}_Qrcode.png`,
          format: "png",
          quality: 0.8,
        });
        await MediaLibrary.saveToLibraryAsync(uri);

        Alert.alert(
          "",
          "Image saved successfully.",
          [{ text: "OK", onPress: () => {} }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error("Error while capturing and saving image:", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const resBank = await getBanksList();
        if (resBank.code != "00") throw new Error("Call to getBankList failed");

        const bank = resBank.data.filter((item: any) => item.bin == bin)[0];
        setBank((prev) => bank);
      } catch (error: any) {
        Alert.alert(error.message);
      }
    })();

    if (socket.disconnected) {
      socket.connect();
    }
    socket.emit("joinOrderRoom", orderCode);
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("paymentUpdated", (data) => {
      setData(data);
      console.log(data);
      if (data.orderCode === orderCode) {
        setLoading(false);
        socket.emit("leaveOrderRoom", orderCode);
        refetchApp();
        getProfile();
        // toast.success("Thanh toán thành công!");
        setTimeout(() => {
          console.log("Thanh toán thành công");
          // navigation.navigate("Result", { orderCode: orderCode });
        }, 3000);
      }

      // Cập nhật trạng thái đơn hàng trên giao diện người dùng
    });
  }, []);

  const cancelOrderHanlde = async () => {
    Alert.alert(
      "Hủy thanh toán",
      "Bạn có muốn hủy đơn hàng không?",
      [
        { text: "Hủy bỏ", onPress: () => {} },
        {
          text: "Xác nhận",
          onPress: () => {
            cancelOrder(orderCode).then((res) => console.log("Xác nhận hủy"));
          },
          //   navigation.navigate("Result", { orderCode: orderCode }),
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.modelText}>
            Sử dụng một Ứng dụng Ngân hàng bất kỳ để quét mã VietQR
          </Text>
          <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.8 }}>
            <View style={styles.qrCode}>
              <QRCode value={qrCode} size={200} backgroundColor="transparent" />
            </View>
          </ViewShot>
          <View style={styles.modalButton}>
            <Button
              icon="download"
              mode="outlined"
              style={styles.modalButtonStyle}
              onPress={captureAndSaveImage}
            >
              Tải về
            </Button>
            <Button
              icon="share"
              mode="outlined"
              style={styles.modalButtonStyle}
              onPress={() => console.log("Pressed")}
            >
              Chia sẻ
            </Button>
          </View>
        </Modal>
      </Portal>
      <View style={styles.header}>
        {bank.logo && (
          <Image source={{ uri: bank?.logo }} style={styles.image} />
        )}
        <View style={styles.headerRight}>
          {bank.name && <Text style={styles.bankName}>{bank.name}</Text>}
          <Text>{accountName}</Text>
        </View>
      </View>
      <View style={styles.innerContainer}>
        <TransferInfoField label="Số tài khoản" text={accountNumber} />
        <TransferInfoField label="Số tiền chuyển khoản" text={amount} />
        <TransferInfoField label="Nội dung chuyển khoản" text={description} />
        <Text style={{ textAlign: "center" }}>
          Mở App Ngân hàng bất kỳ để quét mã VietQR hoặc chuyển khoản chính xác
          nội dung bên trên
        </Text>
        <Pressable
          android_ripple={{ color: "#f6f6f6" }}
          style={styles.qrCode}
          onPress={showModal}
        >
          <QRCode value={qrCode} size={200} backgroundColor="transparent" />
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            gap: 10,
            justifyContent: "center",
          }}
        >
          {loading && (
            <>
              <ActivityIndicator
                size="small"
                color="#6F4CC1"
                animating={true}
              />
              <Text>Đang chờ thanh toán</Text>
            </>
          )}
          {!loading && data?.status === "PAID" && (
            <>
              <Icon name="check" size={20} color="#A4C936" />
              <Text>Thanh toán thành công</Text>
            </>
          )}
          {!loading && data?.status === "CANCELLED" && (
            <>
              <Icon name="times" size={20} color="red" />
              <Text>Đã hủy</Text>
            </>
          )}
        </View>

        <Text style={{ textAlign: "center" }}>
          Lưu ý: Nhập chính xác nội dung{" "}
          <Text style={{ fontWeight: "bold" }}>{description}</Text> khi chuyển
          khoản!
        </Text>
        {loading && (
          <Button
            mode="contained"
            style={styles.button}
            onPress={cancelOrderHanlde}
          >
            Hủy thanh toán
          </Button>
        )}
        {!loading && (
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            Quay lại
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "grey",
    borderWidth: 0.2,
    borderRadius: 10,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "rgba( 130, 147, 240, 255)",
    paddingVertical: 5,
    gap: 5,
  },
  image: {
    flex: 1,
  },
  bankName: {
    fontWeight: "bold",
  },
  headerRight: {
    flex: 3,
  },
  innerContainer: {
    padding: 20,
    gap: 10,
  },
  qrCode: {
    overflow: "hidden",
    width: 220,
    height: 220,
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#E2D5FB",
  },
  button: {
    width: 150,
    alignSelf: "center",
  },
  modal: {
    backgroundColor: "white",
    margin: 20,
    paddingVertical: 40,
    gap: 20,
    borderRadius: 10,
    paddingHorizontal: 50,
  },
  modelText: {
    color: "grey",
    textAlign: "center",
  },
  modalButton: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalButtonStyle: {
    borderWidth: 0.2,
  },
});

export default TransferInfo;
