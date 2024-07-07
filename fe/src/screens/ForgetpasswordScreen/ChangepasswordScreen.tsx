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
import { Icon } from "@rneui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import api from "~/api";
import { InitialStackParamList } from "~/navigator/InitialNavigator";

type Props = NativeStackScreenProps<InitialStackParamList, "CHANGE_PASSWORD">;
const ChangepasswordScreen: React.FC<Props> = ({ navigation, route }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const { email, otp } = route.params;
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Mật khẩu không được để trống");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError("Xác nhận mật khẩu không được để trống");
      return false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Mật khẩu không khớp");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const onConfirm = async () => {
    if (!validatePassword() || !validateConfirmPassword()) return;

    try {
      await api.changePassword({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        otp: otp,
      });

      Alert.alert("Thông báo", "Thay đổi mật khẩu thành công");
      navigation.navigate("SPLASH");
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
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
        <Text style={styles.logoText}>Mật khẩu mới</Text>
        <Text style={styles.logoDesc}>Nhập mật khẩu mới của bạn</Text>
      </View>
      <View style={styles.newPwForm}>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Nhập mật khẩu mới"
            placeholderTextColor={colors.primary}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onBlur={validatePassword}
          />
          <TouchableOpacity onPress={toggleShowPassword}>
            <Text>
              {showPassword ? (
                <Icon
                  type="ionicon"
                  name={"eye-off-outline"}
                  color={colors.primary}
                  size={25}
                />
              ) : (
                <Icon
                  type="ionicon"
                  name={"eye-outline"}
                  color={colors.primary}
                  size={25}
                />
              )}
            </Text>
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Xác nhận mật khẩu mới"
            placeholderTextColor={colors.primary}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onBlur={validateConfirmPassword}
          />
          <TouchableOpacity onPress={toggleShowPassword}>
            <Text>
              {showPassword ? (
                <Icon
                  type="ionicon"
                  name={"eye-off-outline"}
                  color={colors.primary}
                  size={25}
                />
              ) : (
                <Icon
                  type="ionicon"
                  name={"eye-outline"}
                  color={colors.primary}
                  size={25}
                />
              )}
            </Text>
          </TouchableOpacity>
        </View>
        {confirmPasswordError ? (
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        ) : null}
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

export default ChangepasswordScreen;

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
});
