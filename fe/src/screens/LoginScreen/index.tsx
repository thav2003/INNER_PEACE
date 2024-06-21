import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { colors } from "../../utils/colors";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "~/navigator/AppNavigator";
import BackwardBtn from "~/components/BackwardBtn";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuthStore } from "~/stores/auth.store";
import { ResponseError } from "~/api/v1";

type Props = NativeStackScreenProps<AppStackParamList, "LOGIN">;

const LoginScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const [loading, setLoading] = useState(false);
  const loginUser = useAuthStore((state) => state.loginUser);
  const [email, setEmail] = useState("truonghoanganhvu04@gmail.com");
  const [password, setPassword] = useState("123456");
  const [validationMessages, setValidationMessages] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    navigation.navigate("REGISTER");
  };

  const handleForgotPw = () => {
    // navigation.navigate("FORGOTPW");
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

  const validatePassword = (password: string) => {
    if (!password) {
      return "Mật khẩu không được để trống";
    }
    return "";
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setValidationMessages({
      email: emailError,
      password: passwordError,
    });

    if (emailError || passwordError) {
      return;
    }

    try {
      setLoading(true);
      await loginUser({
        email: email,
        password: password,
      });

      navigation.navigate("HOME");
    } catch (error) {
      const err = error as ResponseError;
      const errResponse = await err.response.json();
      if (errResponse.message) {
        Alert.alert("Đăng nhập", errResponse.message);
      } else {
        Alert.alert("Lỗi mạng", "Vui lòng kiểm tra lại kết nối!");
      }
    } finally {
      setLoading(false);
    }
  };

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
          <Image source={require("assets/sign-in-logo.png")} />
          <Text style={styles.logoText}>Mừng bạn trở lại!</Text>
        </View>
        <View style={styles.signInForm}>
          <TextInput
            style={styles.textInput}
            placeholder="Nhập email của bạn"
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
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Nhập mật khẩu của bạn"
              placeholderTextColor={colors.primary}
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
                    name={"eye-off-sharp"}
                    color={colors.primary}
                    size={30}
                  />
                ) : (
                  <Icon
                    type="ionicon"
                    name={"eye-sharp"}
                    color={colors.primary}
                    size={30}
                  />
                )}
              </Text>
            </TouchableOpacity>
          </View>
          {/* {validationMessages.password ? (
            <Text style={styles.errorText}>{validationMessages.password}</Text>
          ) : null} */}
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={handleForgotPw}
          >
            <Text style={styles.forgotText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
          <Button
            mode="outlined"
            buttonColor={colors.primary}
            textColor={colors.white}
            labelStyle={{ fontSize: 18 }}
            style={styles.signInBtn}
            onPress={handleSignIn}
            loading={loading}
          >
            Đăng nhập
          </Button>
        </View>
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

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    textAlign: "center",
    paddingTop: 50,
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
  forgotText: {
    color: colors.primary,
    textAlign: "right",
    alignSelf: "flex-end",
  },
  signInBtn: {
    width: "80%",
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    margin: 10,
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
