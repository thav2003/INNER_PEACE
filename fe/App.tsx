// if (__DEV__) {
//   require("./ReactotronConfig");
//   global.clear = () => {
//     AsyncStorage.getAllKeys()
//       .then((keys) => AsyncStorage.multiRemove(keys))
//       .then(() => alert("success"));
//   };
// }
console.error = (...args: any[]) => {
  if (typeof args[0] === "string" && /defaultProps/.test(args[0])) {
    return;
  }
};
import { Button, SafeAreaView, StatusBar, View } from "react-native";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import InitialNavigator from "~/navigator/InitialNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const linking = {
    prefixes: ["payos://"],
    config: {
      screens: {
        Result: "Result",
        PAYMENT: "PAYMENT",
      },
    },
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      {/* {__DEV__ && ( // Conditionally render the button in development mode
        <View style={{ padding: 10 }}>
          <Button title="Clear AsyncStorage" onPress={global.clear} />
        </View>
      )} */}
      <NavigationContainer linking={linking}>
        <InitialNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}
