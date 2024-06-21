import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";

import { ActivityIndicator, View, Text, Image } from "react-native";
import { InitialStackParamList } from "~/navigator/InitialNavigator";
import { colors } from "~/utils/colors";

type Props = NativeStackScreenProps<InitialStackParamList, "Splash">;

const SplashScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("App");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

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
