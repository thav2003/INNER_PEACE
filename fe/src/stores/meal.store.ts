import { useAppStore } from "./app.store";
import { StateCreator, create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import api from "~/api";
import { useAuthStore } from "./auth.store";
import { formatToVietnamDate } from "~/utils/time";

export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
}

export interface Meal {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  typeFood: string;
}
const getNutrients = async (item: Meal): Promise<Nutrient[]> => {
  try {
    if (item.typeFood === "Recipes") {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/${item.id}/information?includeNutrition=true&apiKey=41d674c631484920b703c241432c8c61`
      );
      return res.data.nutrition.nutrients;
    }
    if (item.typeFood === "Products") {
      const res = await axios.get(
        `https://api.spoonacular.com/food/products/${item.id}?apiKey=41d674c631484920b703c241432c8c61`
      );
      return res.data.nutrition.nutrients;
    }
    if (item.typeFood === "Menu Items") {
      const res = await axios.get(
        `https://api.spoonacular.com/food/menuItems/${item.id}?apiKey=41d674c631484920b703c241432c8c61`
      );
      return res.data.nutrition.nutrients;
    }
    if (item.typeFood === "Simple Foods") {
      const res = await axios.get(
        `https://api.spoonacular.com/food/ingredients/${item.id}/information?amount=150&unit=grams&apiKey=41d674c631484920b703c241432c8c61`
      );
      return res.data.nutrition.nutrients;
    }
    return [];
  } catch (err) {
    console.log(err);
  }
  return [];
};
interface MealState {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  mealSchedules: Record<string, Record<string, Meal[]>>;
  nutrientsByDate: Record<string, Nutrient[]>;
  addMeal: (date: Date, timeSlot: string, meal: Meal) => void;
  removeMeal: (date: Date, timeSlot: string, meal: Meal) => void;
  updateMealQuantity: (
    date: Date,
    timeSlot: string,
    meal: Meal,
    quantity: number
  ) => void;
  getMealForDate: (date: Date) => Record<string, Meal[]>;
  getNutrientsForDate: (date: Date) => Nutrient[];
  calculateNutrients: () => Promise<void>;
  addNutrient: (date: Date, nutrient: Nutrient) => void;
  initStore: (date: Date) => Promise<void>;
  setNutrients: (date: Date, nutrients: Nutrient[]) => void;
  setMeals: (date: Date, meals: Record<string, Meal[]>) => void;
}
const storeApi: StateCreator<MealState> = (set, get) => ({
  currentDate: new Date(),
  setCurrentDate: (date) => {
    set((state) => {
      const currentDateStr = date.toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const nutrientsByDate = state.nutrientsByDate[currentDateStr]
        ? state.nutrientsByDate
        : {
            ...state.nutrientsByDate,
            [currentDateStr]: [],
          };
      const mealSchedules = state.mealSchedules[currentDateStr]
        ? state.mealSchedules
        : {
            ...state.mealSchedules,
            [currentDateStr]: {
              breakfast: [],
              lunch: [],
              dinner: [],
            },
          };
      return { currentDate: date, mealSchedules, nutrientsByDate };
    });
  },
  mealSchedules: {
    [new Date().toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })]: {
      breakfast: [],
      lunch: [],
      dinner: [],
    },
  },
  nutrientsByDate: {
    [new Date().toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })]: [],
  },
  addMeal: (date, timeSlot, meal) =>
    set((state) => {
      const currentDate = new Date(date).toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const mealsForDate = state.mealSchedules[currentDate] || {
        breakfast: [],
        lunch: [],
        dinner: [],
      };

      return {
        mealSchedules: {
          ...state.mealSchedules,
          [currentDate]: {
            ...mealsForDate,
            [timeSlot]: [...mealsForDate[timeSlot], meal],
          },
        },
      };
    }),
  removeMeal: (date, timeSlot, meal) =>
    set((state) => {
      const currentDate = new Date(date).toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const mealsForDate = state.mealSchedules[currentDate] || {
        breakfast: [],
        lunch: [],
        dinner: [],
      };
      return {
        mealSchedules: {
          ...state.mealSchedules,
          [currentDate]: {
            ...mealsForDate,
            [timeSlot]: mealsForDate[timeSlot].filter(
              (m) => m.name !== meal.name && m.id !== meal.id
            ),
          },
        },
      };
    }),
  updateMealQuantity: (date, timeSlot, meal, quantity) =>
    set((state) => {
      const currentDate = new Date(date).toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const mealsForDate = state.mealSchedules[currentDate] || {
        breakfast: [],
        lunch: [],
        dinner: [],
      };

      if (quantity === 0) {
        // Remove the meal from the time slot if quantity is 0
        return {
          mealSchedules: {
            ...state.mealSchedules,
            [currentDate]: {
              ...mealsForDate,
              [timeSlot]: mealsForDate[timeSlot].filter(
                (m) => m.name !== meal.name && m.id !== meal.id
              ),
            },
          },
        };
      } else {
        const mealExists = mealsForDate[timeSlot].some(
          (m) => m.name === meal.name && m.id === meal.id
        );
        return {
          mealSchedules: {
            ...state.mealSchedules,
            [currentDate]: {
              ...mealsForDate,
              [timeSlot]: mealExists
                ? mealsForDate[timeSlot].map((m) =>
                    m.name === meal.name && m.id === meal.id
                      ? { ...m, quantity }
                      : m
                  )
                : [...mealsForDate[timeSlot], { ...meal, quantity }],
            },
          },
        };
      }
    }),
  getMealForDate: (date) =>
    get().mealSchedules[
      new Date(date).toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    ],
  getNutrientsForDate: (date) =>
    get().nutrientsByDate[
      new Date(date).toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    ],
  calculateNutrients: async () => {
    const accessToken = useAuthStore.getState().accessToken;
    const { currentDate, getMealForDate, getNutrientsForDate } = get();
    const meals = getMealForDate(currentDate);
    const timeSlots = Object.keys(meals);
    let nutrition = [] as Nutrient[];
    const fmDate = new Date(currentDate).toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    for (const timeSlot of timeSlots) {
      const mealsInTimeSlot = meals[timeSlot];

      await Promise.all(
        mealsInTimeSlot.map(async (meal) => {
          const nutrients = await getNutrients(meal);

          nutrients.forEach((nutrient) => {
            const { name, amount, unit, percentOfDailyNeeds } = nutrient;
            const existingNutrientIndex = nutrition.findIndex(
              (n) => n.name === name
            );

            if (existingNutrientIndex !== -1) {
              // If nutrient already exists, update its amount and percentOfDailyNeeds
              nutrition[existingNutrientIndex].amount +=
                amount *
                (meal.typeFood === "Simple Foods"
                  ? meal.quantity / 150
                  : meal.quantity);
              nutrition[existingNutrientIndex].percentOfDailyNeeds +=
                percentOfDailyNeeds;
            } else {
              // Otherwise, add new nutrient to the list
              nutrition.push({
                name,
                amount:
                  amount *
                  (meal.typeFood === "Simple Foods"
                    ? meal.quantity / 150
                    : meal.quantity),
                unit,
                percentOfDailyNeeds,
              });
            }
          });
        })
      );
    }
    set((state) => {
      api.updateDailyMealPlans(
        formatToVietnamDate(new Date(currentDate)),
        {
          breakfast: meals["breakfast"],
          lunch: meals["lunch"],
          dinner: meals["dinner"],
          nutrients: nutrition,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return {
        nutrientsByDate: {
          ...state.nutrientsByDate,
          [fmDate]: nutrition,
        },
      };
    });
  },
  addNutrient: (date: Date, nutrient: Nutrient) => {
    set((state) => {
      const currentDate = new Date(date).toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const nutrientsForDate = state.nutrientsByDate[currentDate] || [];
      const nutrientIndex = nutrientsForDate.findIndex(
        (n) => n.name === nutrient.name
      );

      if (nutrientIndex !== -1) {
        nutrientsForDate[nutrientIndex].amount += nutrient.amount;
        nutrientsForDate[nutrientIndex].percentOfDailyNeeds +=
          nutrient.percentOfDailyNeeds;
      } else {
        nutrientsForDate.push(nutrient);
      }
      return {
        nutrientsByDate: {
          ...state.nutrientsByDate,
          [currentDate]: nutrientsForDate,
        },
      };
    });
  },
  initStore: async (date: Date) => {
    const accessToken = useAuthStore.getState().accessToken;
    const { setMeals, setNutrients, currentDate } = get();
    const res = await api.getDailyMealPlansByUserAndDate(
      formatToVietnamDate(new Date(currentDate)),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = res.data.data;
    const payload = {
      breakfast: data?.breakfast?.map((breakfast) => ({
        ...breakfast,
        id: breakfast.meal_id,
      })),
      lunch: data?.lunch?.map((lunch) => ({ ...lunch, id: lunch.meal_id })),
      dinner: data?.dinner?.map((dinner) => ({
        ...dinner,
        id: dinner.meal_id,
      })),
    };
    setMeals(date, payload as Record<string, Meal[]>);
    setNutrients(date, data?.nutrients as Nutrient[]);
  },
  setNutrients: (date, nutrients) => {
    const currentDateStr = new Date(date).toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    set((state) => ({
      nutrientsByDate: {
        ...state.nutrientsByDate,
        [currentDateStr]: nutrients,
      },
    }));
  },
  setMeals: (date, meals) => {
    const currentDateStr = new Date(date).toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    set((state) => ({
      mealSchedules: {
        ...state.mealSchedules,
        [currentDateStr]: meals,
      },
    }));
  },
});

export const useMealStore = create<MealState>(storeApi);
