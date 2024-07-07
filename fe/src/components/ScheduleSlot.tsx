import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Icon } from "@rneui/themed";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppParamList } from "~/navigator/AppNavigator";
import { Meal, useMealStore } from "~/stores/meal.store";
import { colors } from "~/utils/colors";
import Row from "./Row";
import Col from "./Col";

const mapSlotToEnglish = (slot: string): string => {
  const slotMapping: { [key: string]: string } = {
    "Buổi Sáng": "breakfast",
    "Buổi Trưa": "lunch",
    "Buổi Chiều-Tối": "dinner",
  };
  return slotMapping[slot] || "";
};

type ScheduleSlotNavigationProp = NativeStackNavigationProp<
  AppParamList,
  "SEARCH_FOOD"
>;
const ScheduleSlot: React.FC<{ slot: string; meals: Meal[] }> = ({
  slot,
  meals,
}) => {
  const { currentDate, removeMeal, calculateNutrients, getNutrientsForDate } =
    useMealStore();
  const navigation = useNavigation<ScheduleSlotNavigationProp>();
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = () => {
    calculateNutrients();
    setEdit(false);
    // Perform save actions here if needed
  };

  return (
    <View
      style={{
        backgroundColor: colors.white,
        borderRadius: 16,
        width: "90%",
        marginVertical: 5,
        padding: 15,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          color: colors.primary,
          fontWeight: "bold",
          marginBottom: 5,
        }}
      >
        {slot}
      </Text>
      <FlatList
        nestedScrollEnabled
        style={{ height: 150, flex: 1 }}
        data={meals}
        keyExtractor={(item, index) => item.name}
        renderItem={({ item }) => (
          <View
            style={{
              alignItems: "center",
              margin: 5,
            }}
          >
            <Row style={{ gap: 10, flex: 1 }}>
              <Col>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 16,
                  }}
                >
                  {item.name}
                </Text>
              </Col>
              <Col flex={0}>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 16,
                  }}
                >
                  {item.unit === "phần" && item.quantity + " phần"}
                  {item.unit === "gram" && item.quantity + " gram"}
                </Text>
              </Col>
              {edit && (
                <Col flex={0}>
                  <TouchableOpacity
                    onPress={() =>
                      removeMeal(currentDate, mapSlotToEnglish(slot), item)
                    }
                  >
                    <Icon name="close-outline" type="ionicon" color="red" />
                  </TouchableOpacity>
                </Col>
              )}
            </Row>
          </View>
        )}
      />
      <View>
        {!edit ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                borderRadius: 16,
                width: 115,
                height: 35,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleEdit}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: colors.white,
                  fontWeight: "bold",
                }}
              >
                Chỉnh sửa
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                borderRadius: 16,
                width: 115,
                height: 35,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("SEARCH_FOOD", { slot: slot })}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: colors.white,
                  fontWeight: "bold",
                }}
              >
                Thêm món
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                borderRadius: 16,
                width: 115,
                height: 35,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleSave}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: colors.white,
                  fontWeight: "bold",
                }}
              >
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default ScheduleSlot;
