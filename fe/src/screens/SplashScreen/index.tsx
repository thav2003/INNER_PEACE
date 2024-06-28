import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";

import { ActivityIndicator, View, Image } from "react-native";
import { InitialStackParamList } from "~/navigator/InitialNavigator";
import { useAuthStore } from "~/stores/auth.store";
import { colors } from "~/utils/colors";

type Props = NativeStackScreenProps<InitialStackParamList, "SPLASH">;

const SplashScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const state = useAuthStore((state) => state);
  const authStatus = useAuthStore((state) => state.status);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const getProfile = useAuthStore((state) => state.getProfile);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log(state);
        if (authStatus === "authorized") {
          await getProfile();
          navigation.replace("APP", { screen: "HOME" });
        } else {
          navigation.replace("APP", { screen: "WELCOME" });
        }
        // logoutUser();
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, [authStatus]);

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
