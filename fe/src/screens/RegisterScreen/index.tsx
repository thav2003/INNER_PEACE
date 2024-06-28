import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../utils/colors";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import BackwardBtn from "../../components/BackwardBtn";
import { Icon } from "@rneui/themed";
import { AppStackParamList } from "~/navigator/AppNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import api, { formatError } from "~/api";
import { useAuthStore } from "~/stores/auth.store";
import { InitialStackParamList } from "~/navigator/InitialNavigator";

type Props = NativeStackScreenProps<AppStackParamList, "REGISTER">;

const RegisterScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const registerUser = useAuthStore((state) => state.registerUser);
  const loginUser = useAuthStore((state) => state.loginUser);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationMessages, setValidationMessages] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    navigation.navigate("LOGIN");
  };

  const validateFullName = (name: string) => {
    if (!name) {
      return "Họ và tên không được để trống";
    }
    return "";
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email không được để trống";
    }
    if (!re.test(email)) {
      return "Địa chỉ email không hợp lệ";
    }
    return "";
  };

  const validatePhone = (phone: string) => {
    const phoneVali = /^[0-9]{10}$/;
    if (!phone) {
      return "Số điện thoại không được để trống";
    }
    if (!phoneVali.test(phone)) {
      return "Số điện thoại không hợp lệ";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return "Mật khẩu không được để trống";
    }
    if (password.length < 6) {
      return "Mật khẩu phải có ít nhất 6 ký tự";
    }
    return "";
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) {
      return "Xác nhận mật khẩu không được để trống";
    }
    if (confirmPassword !== password) {
      return "Mật khẩu xác nhận không khớp";
    }
    return "";
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSignUp = async () => {
    const fullNameError = validateFullName(fullName);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);
    setValidationMessages({
      fullName: fullNameError,
      email: emailError,
      phone: phoneError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });
    if (
      fullNameError ||
      emailError ||
      phoneError ||
      passwordError ||
      confirmPasswordError
    ) {
      return;
    }
    try {
      const res = await registerUser({
        fullName: fullName,
        email: email,
        phone: phone,
        password: password,
        confirmPassword: confirmPassword,
      });
      await loginUser({
        email: email,
        password: password,
      });
      Alert.alert("Thông báo", "Đăng kí thành công");
      navigation.navigate("SPLASH");
    } catch (error) {
      Alert.alert("Đăng kí", formatError(error));
    }
  };

  useEffect(() => {
    setFullName("Anh Vũ");
    setEmail("truonghoanganhvu04@gmail.com");
    setPhone("0707943005");
    setPassword("123456");
    setConfirmPassword("123456");
  }, []);

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: colors.white }}
      enableOnAndroid={true}
    >
      <View style={styles.container}>
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
              source={require("assets/logo2.png")}
              style={styles.headerLogo}
            />
            <Text style={styles.headerText}>InnerPeace</Text>
          </View>
          <Image
            source={require("assets/vectors/vector2.png")}
            style={styles.vector1}
          />
          <Text style={styles.logoText}>Chào mừng bạn!</Text>
          <Image
            source={require("assets/vectors/vector3.png")}
            style={styles.vector2}
          />
        </View>
        <View style={styles.signInForm}>
          <TextInput
            style={styles.textInput}
            placeholder="Họ và tên"
            placeholderTextColor={colors.primary}
            keyboardType="default"
            value={fullName}
            onChangeText={setFullName}
            onBlur={() =>
              setValidationMessages({
                ...validationMessages,
                fullName: validateFullName(fullName),
              })
            }
          />
          {/* {validationMessages.fullName ? (
            <Text style={styles.errorText}>{validationMessages.fullName}</Text>
          ) : null} */}
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor={colors.primary}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            onBlur={() =>
              setValidationMessages({
                ...validationMessages,
                email: validateEmail(email),
              })
            }
          />
          {/* {validationMessages.email ? (
            <Text style={styles.errorText}>{validationMessages.email}</Text>
          ) : null} */}
          <TextInput
            style={styles.textInput}
            placeholder="Số điện thoại"
            placeholderTextColor={colors.primary}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            onBlur={() =>
              setValidationMessages({
                ...validationMessages,
                phone: validatePhone(phone),
              })
            }
          />
          {/* {validationMessages.phone ? (
            <Text style={styles.errorText}>{validationMessages.phone}</Text>
          ) : null} */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Mật khẩu"
              placeholderTextColor={colors.primary}
              keyboardType="default"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              onBlur={() =>
                setValidationMessages({
                  ...validationMessages,
                  password: validatePassword(password),
                })
              }
            />
            <TouchableOpacity onPress={toggleShowPassword}>
              <Text>
                {showPassword ? (
                  <Icon
                    type="ionicon"
                    name={"eye-off"}
                    color={colors.primary}
                    size={25}
                  />
                ) : (
                  <Icon
                    type="ionicon"
                    name={"eye"}
                    color={colors.primary}
                    size={25}
                  />
                )}
              </Text>
            </TouchableOpacity>
          </View>
          {/* {validationMessages.password ? (
            <Text style={styles.errorText}>{validationMessages.password}</Text>
          ) : null} */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Xác nhận mật khẩu"
              placeholderTextColor={colors.primary}
              secureTextEntry={!showPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              onBlur={() =>
                setValidationMessages({
                  ...validationMessages,
                  confirmPassword: validateConfirmPassword(confirmPassword),
                })
              }
            />
            <TouchableOpacity onPress={toggleShowPassword}>
              <Text>
                {showPassword ? (
                  <Icon
                    type="ionicon"
                    name={"eye-off"}
                    color={colors.primary}
                    size={25}
                  />
                ) : (
                  <Icon
                    type="ionicon"
                    name={"eye"}
                    color={colors.primary}
                    size={25}
                  />
                )}
              </Text>
            </TouchableOpacity>
          </View>
          {/* {validationMessages.confirmPassword ? (
            <Text style={styles.errorText}>
              {validationMessages.confirmPassword}
            </Text>
          ) : null} */}
          <Button
            mode="outlined"
            buttonColor={colors.primary}
            textColor={colors.white}
            labelStyle={{ fontSize: 18 }}
            style={styles.signUpBtn}
            onPress={handleSignUp}
          >
            Đăng ký
          </Button>
        </View>

        <View style={styles.signIn}>
          <Text style={styles.signInText1}>Đã có tài khoản?</Text>
          <TouchableOpacity style={styles.signInText2} onPress={handleSignIn}>
            <Text style={styles.signInText2}>Đăng nhập ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;

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
    paddingTop: 40,
    paddingBottom: 30,
  },
  vector1: {
    width: 74,
    height: 61,
    position: "absolute",
    top: 60,
    left: -50,
  },
  vector2: {
    width: 65,
    height: 64,
    position: "absolute",
    top: 50,
    right: -50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 20,
  },
  signInForm: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
  },
  textInput: {
    borderRadius: 10,
    marginBottom: 10,
    width: "80%",
    height: 50,
    backgroundColor: colors.input,
    color: colors.primary,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    fontSize: 14,
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
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginBottom: 10,
    textAlign: "left",
    width: "80%",
  },
  forgotPassword: {
    color: colors.primary,
    textAlign: "right",
    alignSelf: "flex-end",
    marginRight: 40,
  },
  signUpBtn: {
    width: "80%",
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    margin: 10,
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
  signIn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  signInText1: {
    color: colors.primary,
    fontSize: 14,
  },
  signInText2: {
    paddingLeft: 5,
    textDecorationLine: "underline",
    color: colors.primary,
  },
});
