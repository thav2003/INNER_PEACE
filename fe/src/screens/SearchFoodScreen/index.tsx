import MainLayout from "~/layouts/MainLayout";
import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { colors } from "~/utils/colors";
import { useEffect, useState } from "react";
import { Tab, Text, TabView, Button, Icon } from "@rneui/themed";
import { spoonacularApi } from "~/api";
import axios from "axios";
import { formatImageUrl } from "~/utils/image";
import ListFoodItem from "~/components/ListFoodItem";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeParamList } from "~/navigator/HomeNavigator";
import { AppParamList } from "~/navigator/AppNavigator";

export interface SearchResultBase {
  id: number;
  name: string;
  image: string;
  link: string;
  type: string;
  relevance: number;
  content: string;
  dataPoints: any[];
  typeFood?: string;
}

interface CategoryBase {
  name: string;
  type: string;
  totalResults: number;
  totalResultsVariants: number;
  results: SearchResultBase[];
}

interface SearchResponse {
  sorting: string;
  filterMapping: Record<string, any>;
  filterOptions: any[];
  activeFilterOptions: any[];
  query: string;
  totalResults: number;
  limit: number;
  offset: number;
  searchResults: CategoryBase[];
}
type Props = NativeStackScreenProps<AppParamList, "SEARCH_FOOD">;

const mapSlotToEnglish = (slot: string): string => {
  const slotMapping: { [key: string]: string } = {
    "Buổi Sáng": "breakfast",
    "Buổi Trưa": "lunch",
    "Buổi Chiều-Tối": "dinner",
  };
  return slotMapping[slot] || "";
};
const SearchFoodScreen: React.FC<Props> = ({ route }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<SearchResultBase[]>();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "https://api.spoonacular.com/food/search?offset=0&number=10&apiKey=41d674c631484920b703c241432c8c61"
      );
      const response = res.data as SearchResponse;

      const combinedResults: SearchResultBase[] = response.searchResults
        .filter((s) => s.name !== "Videos" && s.name !== "Articles")
        .flatMap((result) =>
          result.results.map((item) => ({
            ...item,
            typeFood: result.name, // Thêm type vào từ result.name
          }))
        );

      // console.log(combinedResults);
      setData(combinedResults);
    };
    fetch();
  }, []);
  console.log(mapSlotToEnglish(route.params.slot));
  console.log(route.params.slot);
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={{ backgroundColor: colors.primary, padding: 16 }}>
        <Searchbar
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="Nhập tên món ăn"
          placeholderTextColor={colors.white}
          iconColor={colors.primary}
          inputStyle={{ color: colors.white, fontSize: 16 }}
          style={{
            borderWidth: 2,
            borderColor: colors.white,
            borderRadius: 12,
            backgroundColor: colors.primary,
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Tab
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{
            backgroundColor: colors.white,
            height: 3,
          }}
          variant="primary"
          containerStyle={{
            backgroundColor: colors.primary,
          }}
        >
          <Tab.Item title="Tìm kiếm" titleStyle={{ fontSize: 12 }} />
          <Tab.Item title="Gần đây" titleStyle={{ fontSize: 12 }} />
          <Tab.Item title="Yêu thích" titleStyle={{ fontSize: 12 }} />
        </Tab>

        <TabView
          containerStyle={{ flex: 1 }}
          value={index}
          onChange={setIndex}
          animationType="spring"
        >
          <TabView.Item
            style={{
              backgroundColor: colors.white,
              width: "100%",
              height: "100%",
              flex: 1,
            }}
          >
            <FlatList
              data={data}
              extraData={data}
              keyExtractor={(item) => item.id!.toString()}
              renderItem={({ item }) => (
                <ListFoodItem
                  item={item}
                  slot={mapSlotToEnglish(route.params.slot)}
                />
              )}
            />
          </TabView.Item>
          <TabView.Item style={{ backgroundColor: "blue", width: "100%" }}>
            <Text h1>Favorite</Text>
          </TabView.Item>
          <TabView.Item style={{ backgroundColor: "green", width: "100%" }}>
            <Text h1>Cart</Text>
          </TabView.Item>
        </TabView>
      </View>
    </View>
  );
};

export default SearchFoodScreen;
