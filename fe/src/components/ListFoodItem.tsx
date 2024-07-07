import { View, TouchableOpacity } from "react-native";
import { SearchResultBase } from "~/screens/SearchFoodScreen";
import { colors } from "~/utils/colors";
import { Tab, Text, TabView, Button, Icon } from "@rneui/themed";
import { memo, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useMealStore } from "~/stores/meal.store";

interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}

interface NutritionData {
  nutrients: Nutrient[];
}
const getCaloriesInfo = (nutrition: NutritionData): Nutrient | undefined => {
  if (!nutrition || !nutrition.nutrients) {
    return undefined;
  }

  return nutrition.nutrients.find((nutrient) => nutrient.name === "Calories");
};
const ListFoodItem: React.FC<{ item: SearchResultBase; slot: string }> = ({
  item,
  slot,
}) => {
  const { currentDate, mealSchedules, updateMealQuantity } = useMealStore();

  const [calo, setCalo] = useState<Nutrient>();
  const [favorite, setFavorite] = useState<boolean>(false);
  const quantity =
    mealSchedules[
      new Date(currentDate).toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    ][slot]?.find((meal) => meal.name === item.name && meal.id === item.id)
      ?.quantity || 0;
  const increaseQuantity = useCallback(() => {
    const newQuantity =
      item.typeFood === "Simple Foods" ? quantity + 150 : quantity + 1;
    updateMealQuantity(
      currentDate,
      slot,
      {
        id: item.id,
        quantity: newQuantity,
        name: item.name,
        unit: item.typeFood === "Simple Foods" ? "gram" : "phần",
        typeFood: item.typeFood!,
      },
      newQuantity
    );
  }, [currentDate, item, quantity, slot, updateMealQuantity]);

  const decreaseQuantity = useCallback(() => {
    const newQuantity =
      quantity > 0
        ? item.typeFood === "Simple Foods"
          ? quantity - 150
          : quantity - 1
        : 0;
    updateMealQuantity(
      currentDate,
      slot,
      {
        id: item.id,
        quantity: newQuantity,
        name: item.name,
        unit: item.typeFood === "Simple Foods" ? "gram" : "phần",
        typeFood: item.typeFood!,
      },
      newQuantity
    );
  }, [currentDate, item, quantity, slot, updateMealQuantity]);
  useEffect(() => {
    const fetch = async () => {
      if (item.typeFood === "Recipes") {
        const res = await axios.get(
          `https://api.spoonacular.com/recipes/${item.id}/information?includeNutrition=true&apiKey=41d674c631484920b703c241432c8c61`
        );
        setCalo(getCaloriesInfo(res.data.nutrition));
      }
      if (item.typeFood === "Products") {
        const res = await axios.get(
          `https://api.spoonacular.com/food/products/${item.id}?apiKey=41d674c631484920b703c241432c8c61`
        );
        setCalo(getCaloriesInfo(res.data.nutrition));
      }
      if (item.typeFood === "Menu Items") {
        const res = await axios.get(
          `https://api.spoonacular.com/food/menuItems/${item.id}?apiKey=41d674c631484920b703c241432c8c61`
        );
        setCalo(getCaloriesInfo(res.data.nutrition));
      }
      if (item.typeFood === "Simple Foods") {
        const res = await axios.get(
          `https://api.spoonacular.com/food/ingredients/${item.id}/information?amount=150&unit=grams&apiKey=41d674c631484920b703c241432c8c61`
        );
        setCalo(getCaloriesInfo(res.data.nutrition));
      }
    };
    // fetch();
  }, []);
  return (
    <View
      style={{
        alignItems: "center",

        borderStyle: "solid",
        borderBottomWidth: 1,
        borderColor: colors.primary,
        padding: 16,
      }}
    >
      <TouchableOpacity
        onPress={() => console.log(item)}
        style={{ width: "100%" }}
      >
        {/* <ViText text={item.name} /> */}
        <View className="flex flex-row w-full justify-between">
          <View className="flex-shrink flex flex-col gap-2">
            <Text style={{ fontWeight: "bold", color: colors.primary }}>
              {item.name}
            </Text>
            <Text style={{ fontWeight: "normal", color: colors.primary }}>
              {calo ? calo?.amount : 0} Calo
              {item.typeFood === "Simple Foods" ? " - 150 gram" : " - 1 phần"}
            </Text>
          </View>
          <View className="flex flex-row items-center gap-3">
            <TouchableOpacity onPress={() => setFavorite(!favorite)}>
              <Icon
                // name="heart"
                name={favorite ? "heart" : "heart-outline"}
                type="ionicon"
                color={colors.primary}
              />
            </TouchableOpacity>
            <View className="flex flex-row items-center gap-3">
              <TouchableOpacity onPress={decreaseQuantity}>
                <Icon
                  name="remove-circle"
                  type="ionicon"
                  color={colors.primary}
                />
              </TouchableOpacity>
              <Text style={{ color: colors.primary }}>
                {item.typeFood === "Simple Foods" ? quantity / 150 : quantity}
              </Text>
              <TouchableOpacity onPress={increaseQuantity}>
                <Icon name="add-circle" type="ionicon" color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(ListFoodItem);
