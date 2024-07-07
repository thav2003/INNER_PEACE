import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackwardBtn from "~/components/BackwardBtn";
import { colors } from "~/utils/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import api from "~/api";
import { InitialStackParamList } from "~/navigator/InitialNavigator";

type Props = NativeStackScreenProps<InitialStackParamList, "OTP">;
const OtpScreen: React.FC<Props> = ({ navigation, route }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");

  const { email } = route.params;

  const handleChangeOtp = (index: number, value: string) => {
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const validateOtp = () => {
    if (otp.join("").length !== 4) {
      setOtpError("OTP phải có 4 chữ số");
      return false;
    }
    setOtpError("");
    return true;
  };

  const onConfirm = async () => {
    if (!validateOtp()) return;

    const otpCode = otp.join("");
    try {
      const res = await api.validateOTP({ email: email, otp: otpCode });

      console.log(res.data);
      navigation.navigate("CHANGE_PASSWORD", { email: email, otp: otpCode });
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  const handleResend = async () => {
    // Resend OTP logic here
    try {
      const res = await api.generateOTP(email);
      console.log(res.data);
      Alert.alert("Thông báo", "Lấy mã OTP trong email của bạn");
      navigation.navigate("OTP", { email: email });
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
      return false;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View>
        <BackwardBtn
          type="ionicon"
          iconName="chevron-back-circle-outline"
          iconColor={colors.primary}
          size={40}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.logoText}>Mã xác nhận</Text>
        <Text style={styles.logoDesc}>
          Chúng tôi đã gửi mã xác nhận qua email của bạn
        </Text>
      </View>
      <View style={styles.confirmForm}>
        <View style={styles.inputGroup}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.textInput}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(value) => handleChangeOtp(index, value)}
            />
          ))}
        </View>
        {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}
        <View style={styles.resendGroup}>
          <Text style={styles.text1}>Không nhận được mã? </Text>
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resend}>Gửi lại</Text>
          </TouchableOpacity>
        </View>
        <Button
          mode="outlined"
          buttonColor={colors.primary}
          textColor={colors.white}
          labelStyle={{ fontSize: 18 }}
          style={styles.confirmBtn}
          onPress={onConfirm}
        >
          Xác nhận
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    textAlign: "center",
    paddingTop: 50,
  },
  backwardBtn: {
    backgroundColor: colors.white,
    top: -30,
    right: 150,
    position: "absolute",
  },
  headerContainer: {
    alignItems: "center",
    textAlign: "center",
  },
  logoText: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 30,
  },
  logoDesc: {
    color: colors.primary,
    fontSize: 16,
    alignItems: "center",
    textAlign: "center",
    marginBottom: 20,
    width: 230,
  },
  confirmForm: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
  },
  textInput: {
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    marginRight: 10,
    width: 50,
    height: 50,
    backgroundColor: colors.input,
    color: colors.primary,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  confirmBtn: {
    width: "80%",
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    margin: 10,
  },
  inputGroup: {
    flexDirection: "row",
    justifyContent: "center",
  },
  resendGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  text1: {
    color: colors.primary,
  },
  resend: {
    color: colors.primary,
    textDecorationLine: "underline",
  },
});
