import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { colors } from "../../utils/colors";
import { Button } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { InitialStackParamList } from "~/navigator/InitialNavigator";

type Props = NativeStackScreenProps<InitialStackParamList, "WELCOME">;
const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleSignIn = () => {
    navigation.navigate("LOGIN");
  };
  const handleSignUp = () => {
    navigation.navigate("REGISTER");
  };
  return (
    <View style={styles.container}>
      <Image source={require("assets/home-logo.png")} style={styles.homeLogo} />
      <Image
        style={styles.vector}
        source={require("assets/vectors/vector1.png")}
      />
      <View style={styles.welcomeContainer}>
        <Text style={styles.header}>Chào mừng bạn đã đến với</Text>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("assets/logo.png")} />
          <Text style={styles.logoText}>InnerPeace</Text>
        </View>
        <View style={styles.groupBtn}>
          <Button
            textColor={colors.white}
            buttonColor={colors.primary}
            mode="elevated"
            style={[
              styles.signin,
              {
                borderColor: colors.white,
                borderWidth: 1,
              },
            ]}
            onPress={handleSignIn}
          >
            Đăng nhập
          </Button>
          <Button
            textColor={colors.primary}
            buttonColor={colors.white}
            mode="elevated"
            style={styles.signup}
            onPress={handleSignUp}
          >
            Đăng ký
          </Button>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  homeLogo: {
    width: 344,
    height: 331,
    marginTop: "20%",
    zIndex: -2,
  },
  vector: {
    width: "100%",
    position: "absolute",
    zIndex: -1,
    top: 360,
  },
  welcomeContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  header: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  logo: {
    width: 28.6,
    height: 37.58,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 10,
  },
  groupBtn: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  signin: {
    width: "80%",
    marginBottom: 10,
    fontSize: 200,
  },
  signup: {
    width: "80%",
    fontSize: 22,
  },
});
