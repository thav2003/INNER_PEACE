import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const ListView: React.FC<any> = ({ data, renderItem, onItemPress }) => {
  return (
    <View style={styles.container}>
      {data.map((item: any) => (
        <TouchableOpacity
          key={item.id.toString()}
          onPress={() => onItemPress(item)}
        >
          <View>{renderItem({ item })}</View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
  },
});

export default ListView;
