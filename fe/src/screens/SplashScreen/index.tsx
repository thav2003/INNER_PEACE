import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";

import { ActivityIndicator, View, Image } from "react-native";
import { InitialStackParamList } from "~/navigator/InitialNavigator";
import { useAuthStore } from "~/stores/auth.store";
import { colors } from "~/utils/colors";
type Props = NativeStackScreenProps<InitialStackParamList, "SPLASH">;

const SplashScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const authStatus = useAuthStore((state) => state.status);
  const getProfile = useAuthStore((state) => state.getProfile);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (authStatus === "authorized") {
          await getProfile();
          navigation.replace("APP", { screen: "HOME" });
        } else {
          navigation.replace("WELCOME");
        }
      } catch (err) {
        console.log(err);
        navigation.replace("WELCOME");
      }
    };
    fetchProfile();
  }, []);

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
