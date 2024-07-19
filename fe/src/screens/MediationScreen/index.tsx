import {
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "~/utils/colors";
//   import Footer from "~/components/Footer";
import { useNavigation } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import ListView from "~/components/ListView";
//   import MediationList from "~/components/MediationList";
import Header from "~/components/Header";
//   import FlexMediationList from "~/components/FlexMediationList";
import { Icon } from "@rneui/themed";
import { HomeParamList } from "~/navigator/AppTabNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MainLayout from "~/layouts/MainLayout";
import useFetch from "~/hooks/useFetch";
import api from "~/api";
import { useAuthStore } from "~/stores/auth.store";
import { formatImageUrl } from "~/utils/image";
import ListLessonItem from "~/components/ListLessonItem";
import { LessonDto } from "~/api/v1";
import axios from "axios";

type Props = NativeStackScreenProps<HomeParamList, "MEDIATION_TAB">;
const size = 2;
const MediationScreen: React.FC<Props> = ({ navigation }) => {
  const userId = useAuthStore((state) => state.auth?.userId);
  const [page, setPage] = useState<number>(0);
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<LessonDto[]>([]);

  const [responseOldLesson] = useFetch({
    fetchFunction: () => api.getWatchedLessons(userId!, 0, 2),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const handleToLike = () => {};
  const handleToMediation = () => {};
  const handleToStress = () => {};

  const handleLoadMore = () => {
    setLoading(true);
    api.searchLessons(undefined, page, size).then((res) => {
      const content = res ? (res.data.data?.content as LessonDto[]) : [];
      setLoading(false);
      setList((prev) => [...prev, ...content]);
      setPage((prev) => ++prev);
    });
  };
  useEffect(() => {
    api.searchLessons(undefined, page, size).then((res) => {
      const content = res ? (res.data.data?.content as LessonDto[]) : [];
      setInitLoading(false);
      setList(content);
      setPage((prev) => ++prev);
    });
  }, []);
  return (
    <MainLayout style={styles.container}>
      <Header />
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={styles.title}>Cùng thư giản nào</Text>
        <TouchableOpacity
          onPress={handleToLike}
          activeOpacity={0.9}
          style={{ position: "absolute", right: 10, top: 0 }}
        >
          <Icon
            type="ionicon"
            name={"heart"}
            color={colors.primary}
            size={40}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Searchbar
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="Tìm kiếm"
          placeholderTextColor={colors.primary}
          iconColor={colors.primary}
          inputStyle={{ color: colors.primary, fontSize: 16 }}
          style={{
            borderWidth: 2,
            borderColor: colors.primary,
            borderRadius: 12,
            backgroundColor: colors.white,
          }}
        />
      </View>
      <View className="flex flex-col gap-5 mb-5">
        <ImageBackground
          source={require("assets/media-exe.png")}
          resizeMode="cover"
        >
          <TouchableOpacity
            onPress={handleToMediation}
            activeOpacity={0.7}
            style={styles.exerciseNavigate}
          >
            <Text
              style={{
                fontSize: 20,
                color: colors.white,
                fontWeight: "bold",
              }}
            >
              Thiền cho thật hiền
            </Text>
          </TouchableOpacity>
        </ImageBackground>
        <ImageBackground
          source={require("assets/stress-exe.png")}
          resizeMode="cover"
        >
          <TouchableOpacity
            onPress={handleToStress}
            style={styles.exerciseNavigate}
          >
            <Text
              style={{
                fontSize: 20,
                color: colors.white,
                fontWeight: "bold",
              }}
            >
              Stress ơi bay đi
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      {responseOldLesson && responseOldLesson?.data?.content?.length! > 0 && (
        <View style={styles.contContainer}>
          <Text style={styles.title}>Tiếp tục</Text>
          <FlatList
            scrollEnabled={false}
            data={responseOldLesson?.data?.content}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ListLessonItem
                item={item.lesson as LessonDto}
                historyLesson={item}
              />
            )}
          />
        </View>
      )}

      <View>
        <Text style={styles.title}>Gợi ý cho bạn</Text>
        <FlatList
          scrollEnabled={false}
          data={list}
          extraData={list}
          ListEmptyComponent={
            initLoading ? (
              <ActivityIndicator animating={true} />
            ) : (
              <View style={{ flex: 1 }}>
                <Text>0 results</Text>
              </View>
            )
          }
          numColumns={2}
          style={{ flex: 1 }}
          keyExtractor={(item) => item.id!.toString()}
          renderItem={({ item }) => (
            <ListLessonItem item={item} showDetail={true} />
          )}
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
          onPress={handleLoadMore}
        >
          <Text
            style={{ color: colors.white, fontSize: 16, fontWeight: "bold" }}
          >
            Xem thêm
          </Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

export default MediationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white,
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
  exerciseNavigate: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginVertical: 5,
    justifyContent: "center",
    paddingLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
  contContainer: {
    width: "100%",
  },
  listViewContainer: {
    flex: 1,
  },
  listView: {
    flexDirection: "column",
  },
});
