if (__DEV__) {
  require("./ReactotronConfig");
}
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import InitialNavigator from "~/navigator/InitialNavigator";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />

      <NavigationContainer>
        <InitialNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}
