import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";

import { ActivityIndicator, View, Text, Image } from "react-native";
import { InitialStackParamList } from "~/navigator/InitialNavigator";
import { useAuthStore } from "~/stores/auth.store";
import { colors } from "~/utils/colors";

type Props = NativeStackScreenProps<InitialStackParamList, "SPLASH">;

const SplashScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const authStatus = useAuthStore((state) => state.status);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (authStatus === "authorized") {
        navigation.replace("APP", { screen: "HOME" });
      } else {
        navigation.replace("APP", { screen: "WELCOME" });
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation, authStatus]);

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
