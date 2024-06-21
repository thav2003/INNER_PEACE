import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
type Props = {
  iconName: string;
  iconColor: string;
  size: number;
  type: string;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
};
const BackwardBtn: React.FC<Props> = ({
  iconName,
  iconColor,
  size,
  type,
  top = -30,
  left = 150,
}) => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity
      style={{
        ...styles.backwardBtn,
        top: top,
        left: left,
      }}
      onPress={handleGoBack}
    >
      <Icon name={iconName} color={iconColor} size={size} type={type} />
    </TouchableOpacity>
  );
};

export default BackwardBtn;

const styles = StyleSheet.create({
  backwardBtn: {
    backgroundColor: colors.white,
    // top: -30,
    // right: 150,
    position: "absolute",
    borderRadius: 50,
    zIndex: 1000,
  },
});
