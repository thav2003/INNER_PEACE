import React, { useState } from "react";
import {
  Image,
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
import { useNavigation } from "@react-navigation/native";
import BackwardBtn from "~/components/BackwardBtn";
import { colors } from "~/utils/colors";
import { Icon } from "@rneui/themed";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AppStackParamList } from "~/navigator/AppNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import api from "~/api";

type Props = NativeStackScreenProps<AppStackParamList, "FORGOT_PASSWORD">;
const ForgetpasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("truonghoanganhvu04@gmail.com");
  const [emailError, setEmailError] = useState("");
  const [emailExistsError, setEmailExistsError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    navigation.navigate("LOGIN");
  };

  const handleSignUp = () => {
    navigation.navigate("REGISTER");
  };

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError("Email không hợp lệ");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Mật khẩu xác nhận không khớp");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const onConfirm = async () => {
    if (!validateEmail()) return;

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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: colors.white }}
      enableOnAndroid={true}
    >
      <View style={styles.container}>
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
          <View style={styles.header}>
            <Image
              source={require("../../../assets/logo2.png")}
              style={styles.headerLogo}
            />
            <Text style={styles.headerText}>InnerPeace</Text>
          </View>
          <Text style={styles.logoText}>Quên mật khẩu?</Text>
          <Text style={styles.logoDesc}>
            Vui lòng nhập đầy đủ thông tin để đổi mật khẩu
          </Text>
        </View>
        <View style={styles.forgotPwForm}>
          <TextInput
            style={styles.textInput}
            placeholder="Nhập email đã đăng ký"
            placeholderTextColor={colors.primary}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            onBlur={validateEmail}
          />
          {/* {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        {emailExistsError ? (
          <Text style={styles.errorText}>{emailExistsError}</Text>
        ) : null} */}
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
        <TouchableOpacity style={styles.backwardSignIn} onPress={handleSignIn}>
          <Text style={styles.backwardText}>Trở về đăng nhập</Text>
        </TouchableOpacity>
        <View style={styles.signUp}>
          <Text style={styles.signUpText1}>Chưa có tài khoản?</Text>
          <TouchableOpacity style={styles.signUpText2} onPress={handleSignUp}>
            <Text style={styles.signUpText2}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgetpasswordScreen;

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
  headerLogo: {
    width: 22.51,
    height: 31.47,
  },
  headerText: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 5,
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 20,
  },
  forgotPwForm: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
  },
  textInput: {
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    width: "80%",
    height: 50,
    backgroundColor: colors.input,
    color: colors.primary,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    fontSize: 16,
  },
  errorText: {
    color: colors.error,
    marginTop: 5,
  },
  backwardSignIn: {
    marginTop: 10,
    marginBottom: 80,
  },
  backwardText: {
    color: colors.primary,
  },
  confirmBtn: {
    width: "80%",
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    margin: 10,
  },
  newPwForm: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
    width: "80%",
    height: 50,
    backgroundColor: colors.input,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-between",
  },
  passwordInput: {
    color: colors.primary,
  },
  socialSignIn: {
    alignItems: "center",
    textAlign: "center",
  },
  socialText: {
    color: colors.primary,
    fontSize: 14,
    marginBottom: 20,
  },
  signUp: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  signUpText1: {
    color: colors.primary,
    fontSize: 14,
  },
  signUpText2: {
    paddingLeft: 5,
    textDecorationLine: "underline",
    color: colors.primary,
    fontSize: 14,
  },
});
