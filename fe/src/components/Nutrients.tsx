import { FlatList, Text, View } from "react-native";
import { useMealStore } from "~/stores/meal.store";
import { colors } from "~/utils/colors";
import Row from "./Row";
import Col from "./Col";
import { useMemo } from "react";

const Nutrients: React.FC = () => {
  const { currentDate, getNutrientsForDate } = useMealStore();
  const nutrients = getNutrientsForDate(currentDate);
  console.log(nutrients);
  const sortedNutrients = useMemo(() => {
    return nutrients
      ? nutrients.sort((a, b) => a.name.localeCompare(b.name))
      : [];
  }, [nutrients]);
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
        Dinh dưỡng hôm nay
      </Text>
      <FlatList
        nestedScrollEnabled
        style={{ height: 300, flex: 1 }}
        data={sortedNutrients}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              alignItems: "center",
              margin: 5,
              flex: 1,
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
                  {`${item.amount} ${item.unit}`}
                </Text>
              </Col>
            </Row>
          </View>
        )}
      />
    </View>
  );
};

export default Nutrients;
