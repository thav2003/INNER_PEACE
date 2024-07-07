import React, { ReactNode } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ScrollView,
} from "react-native";
import { colors } from "~/utils/colors";

interface MainLayoutProps {
  children: ReactNode;
  haveFooter?: boolean;
  style?: StyleProp<ViewStyle>;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  style,
  haveFooter = true,
}) => {
  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={[styles.container, style]}
      fadingEdgeLength={100}
    >
      {children}
      {haveFooter && (
        <View
          style={{
            flex: 1,
            marginBottom: 130,
          }}
        ></View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  } as ViewStyle,
});

export default React.memo(MainLayout);
