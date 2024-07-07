import React, { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface RowProps {
  children?: ReactNode;
  style?: ViewStyle | ViewStyle[];
  flex?: number;
  [key: string]: any; // Allow any other props
}

const Row: React.FC<RowProps> = ({
  children,
  style,
  flex = 1,
  ...props
}: RowProps) => {
  const blockStyle = StyleSheet.flatten([
    flex !== undefined && { flex },
    { flexDirection: "row" }, // <-- add this
    style,
  ]);

  return (
    <View style={blockStyle} {...props}>
      {children}
    </View>
  );
};

export default Row;
