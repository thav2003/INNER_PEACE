import React, { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface ColProps {
  children?: ReactNode;
  style?: ViewStyle | ViewStyle[];
  flex?: number;
  [key: string]: any; // Allow any other props
}

const Col: React.FC<ColProps> = ({
  children,
  style,
  flex = 1,
  ...props
}: ColProps) => {
  const blockStyle = StyleSheet.flatten([
    flex !== undefined && { flex },
    style,
  ]);

  return (
    <View style={blockStyle} {...props}>
      {children}
    </View>
  );
};

export default Col;
