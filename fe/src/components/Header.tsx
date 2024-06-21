import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "~/utils/colors";

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("assets/logo2.png")} />
        <Text style={styles.logoText}>InnerPeace</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    width: "100%",
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
    color: colors.primary,
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
