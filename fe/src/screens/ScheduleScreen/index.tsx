import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../utils/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import MainLayout from "~/layouts/MainLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeParamList } from "~/navigator/HomeNavigator";
import Header from "~/components/Header";
import { CompositeScreenProps, Theme } from "@react-navigation/native";
import { AppParamList } from "~/navigator/AppNavigator";
import { Meal, Nutrient, useMealStore } from "~/stores/meal.store";
import ScheduleSlot from "~/components/ScheduleSlot";
import axios from "axios";
import { formatImageUrl } from "~/utils/image";
import RenderHtml, {
  CustomRendererProps,
  HTMLContentModel,
  HTMLElementModel,
  RenderHTMLProps,
  TBlock,
  TNodeChildrenRenderer,
} from "react-native-render-html";
import useFetch from "~/hooks/useFetch";
import Col from "~/components/Col";
import Row from "~/components/Row";
import Nutrients from "~/components/Nutrients";
import api from "~/api";
import { useAuthStore } from "~/stores/auth.store";
type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeParamList, "SCHEDULE">,
  NativeStackScreenProps<AppParamList, "HOME">
>;
type Recipe = {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number | null;
  cookingMinutes: number | null;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  license: string;
  sourceName: string;
  pricePerServing: number;
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  spoonacularScore: number;
  spoonacularSourceUrl: string;
};
const SpanRenderer = ({
  TDefaultRenderer,
  textProps,
  ...props
}: CustomRendererProps<TBlock>) => {
  return (
    <TDefaultRenderer
      {...props}
      textProps={{ ...textProps, numberOfLines: 4 }}
    />
  );
};
const renderers: RenderHTMLProps["renderers"] = {
  span: SpanRenderer,
};
const customHTMLElementModels = () => {
  return {
    template: HTMLElementModel.fromCustomModel({
      tagName: "template",
      mixedUAStyles: {
        position: "relative",
        padding: 0,
        overflow: "hidden",
        color: colors.primary,
      },

      contentModel: HTMLContentModel.block,
    }),
  };
};
const wrapHTMLInBody = (html: string) => {
  return `
      <body>
          <template>
            <span>
              ${html}
            </span>
          </template>
      </body>
  `;
};

const ScheduleScreen: React.FC<Props> = ({ navigation, route }) => {
  const { currentDate, setCurrentDate, getMealForDate, initStore } =
    useMealStore();
  const accessToken = useAuthStore((state) => state.accessToken);
  // const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [show, setShow] = useState(false);
  const [response] = useFetch({
    fetchFunction: () =>
      axios.get(
        "https://api.spoonacular.com/recipes/complexSearch?cuisine=vietnamese&addRecipeInformation=true&offset=0&number=10&apiKey=41d674c631484920b703c241432c8c61"
      ),
  });
  const [responseCurrentInMonth] = useFetch({
    fetchFunction: () =>
      api.getNutritionSummaryForCurrentMonth({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
  });
  const recipes = (response ? response.results : []) as Recipe[];

  const showDatepicker = () => {
    setShow(true);
  };
  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShow(false); // Close DateTimePicker first
    if (selectedDate) {
      setCurrentDate(selectedDate);
    }
  };
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const initializeStore = async () => {
      await initStore(currentDate);
    };

    initializeStore();
  }, [initStore, currentDate]);
  console.log(show);
  return (
    <MainLayout style={styles.container}>
      <Header />
      <Text style={styles.title}>Ăn đúng uống đúng</Text>
      <View
        style={{
          backgroundColor: "#0099FF",
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "flex-start",
          paddingLeft: 30,
          width: "100%",
          height: 170,
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "400", color: colors.white }}>
          Bạn đã ăn đúng
        </Text>
        <Text style={{ fontSize: 32, fontWeight: "bold", color: colors.white }}>
          {responseCurrentInMonth ? responseCurrentInMonth.daysExactly2000 : 0}{" "}
          ngày
        </Text>
        <Image
          source={require("assets/routine-header-logo.png")}
          style={{ position: "absolute", right: 0, top: 10 }}
        />
      </View>
      <View
        style={{
          backgroundColor: colors.primary,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 20,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.white,
            }}
          >
            {formatDate(new Date(currentDate))}
          </Text>
          <TouchableOpacity
            onPress={showDatepicker}
            style={{ position: "absolute", right: -45 }}
          >
            <Image source={require("assets/icons/calendar-1.png")} />
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              value={new Date(currentDate)}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <ScheduleSlot
          slot="Buổi Sáng"
          meals={getMealForDate(currentDate)["breakfast"]}
        />
        <ScheduleSlot
          slot="Buổi Trưa"
          meals={getMealForDate(currentDate)["lunch"]}
        />
        <ScheduleSlot
          slot="Buổi Chiều-Tối"
          meals={getMealForDate(currentDate)["dinner"]}
        />

        <Nutrients />
      </View>
      <View>
        <Text style={styles.title}>Công thức cho bạn</Text>
        <FlatList
          scrollEnabled={false}
          data={recipes}
          numColumns={2}
          keyExtractor={(item) => item.id!.toString()}
          renderItem={({ item }) => (
            <View
              key={item.id}
              style={{
                flex: 1,
                margin: 8,
              }}
            >
              <TouchableOpacity
                // onPress={() =>
                //   navigation.navigate("LESSON_DETAIL", { lessonId: item.id! })
                // }
                style={{ width: "100%" }}
              >
                <Image
                  source={{ uri: item.image + "?" + new Date() }}
                  height={200}
                  style={{
                    width: "100%",
                  }}
                  resizeMode="cover"
                />
                <Text
                  numberOfLines={1}
                  className="font-bold text-lg text-[#3F54DB]"
                >
                  {item.title}
                </Text>
                <Text className="text-[#3F54DB]">
                  Thời gian nấu: {item.readyInMinutes} phút
                </Text>
                <RenderHtml
                  contentWidth={Dimensions.get("screen").width}
                  source={{
                    html: wrapHTMLInBody(item.summary),
                  }}
                  renderers={renderers}
                  customHTMLElementModels={customHTMLElementModels()}
                />
              </TouchableOpacity>
            </View>
          )}

          // }}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 24,
            width: "50%",
            height: 48,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ color: colors.white, fontSize: 16, fontWeight: "bold" }}
          >
            Xem thêm
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            width: "100%",
            height: 100,
            borderRadius: 16,
            justifyContent: "center",
            paddingLeft: 10,
          }}
        >
          <Text
            style={{ fontSize: 20, color: colors.white, fontWeight: "bold" }}
          >
            Daily Tips
          </Text>
        </TouchableOpacity>
      </View> */}
    </MainLayout>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  logo: {
    width: 28.6,
    height: 37.58,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
  boxContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    width: "90%",
    marginVertical: 5,
    padding: 15,
  },
  sessionTime: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ingredients: {
    color: colors.primary,
    fontSize: 16,
  },
  quantity: {
    color: colors.primary,
    fontSize: 16,
  },
});
