import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";

import { ActivityIndicator, View, Image } from "react-native";
import { InitialStackParamList } from "~/navigator/InitialNavigator";
import { useAuthStore } from "~/stores/auth.store";
import { colors } from "~/utils/colors";
type Props = NativeStackScreenProps<InitialStackParamList, "SPLASH">;

const SplashScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const authStatus = useAuthStore((state) => state.status);
  const profile = useAuthStore((state) => state.profile);
  const getProfile = useAuthStore((state) => state.getProfile);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await getProfile();
      } catch (err) {
        navigation.replace("WELCOME");
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile && authStatus === "authorized") {
      if (profile.role === "CUSTOMER") {
        navigation.replace("APP", { screen: "HOME" });
      }
      if (profile.role === "ADMIN") {
        console.log("GO ADMIN NAVIGATOR");
        navigation.replace("MANAGER", { screen: "HOME" });
      }
      if (profile.role === "MANAGER" || profile.role === "PROFESSIONAL") {
        console.log("GO MANAGER NAVIGATOR");
        navigation.replace("MANAGER", { screen: "HOME" });
      }
    }
  }, [profile, authStatus]);
  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: colors.white }}
    >
      <Image source={require("assets/splash.png")} className="w-80 h-80" />
      <ActivityIndicator size="large" />
    </View>
  );
};

export default SplashScreen;
