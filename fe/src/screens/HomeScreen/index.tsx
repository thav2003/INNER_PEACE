import React, { useState, useEffect, memo } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { colors } from "~/utils/colors";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header from "~/components/Header";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LessonDto, LessonEntity, LessonPagedResponse } from "~/api/v1";
import { formatImageUrl } from "~/utils/image";
import api, { spoonacularApi } from "~/api";
import { useAuthStore } from "~/stores/auth.store";
import MoodSlider from "~/components/MoodSlider";
import { HomeParamList } from "~/navigator/HomeNavigator";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import MainLayout from "~/layouts/MainLayout";
import ListItem from "~/components/ListLessonItem";

type Props = NativeStackScreenProps<HomeParamList, "HOME_TAB">;

const size = 2;
const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const [page, setPage] = useState<number>(0);
  const profile = useAuthStore((state) => state.profile);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<LessonDto[]>([]);

  const handleStartNow = async () => {
    navigation.navigate("MEDIATION_TAB");
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleLoadMore = () => {
    setLoading(true);
    api.searchLessons(undefined, page, size).then((res) => {
      const content = res ? (res.data.data?.content as LessonDto[]) : [];
      setLoading(false);
      console.log(content);
      console.log("Chay");
      setList((prev) => [...prev, ...content]);
      setPage((prev) => ++prev);
    });
  };
  // useEffect(() => {
  //   const test = async () => {
  //     const res = await spoonacularApi.searchAllFood("banana", 1, 10);
  //     reactotron.log("HELLO WORLD");
  //     reactotron.log(res.data);
  //   };
  //   test();
  // }, []);

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
      <Text style={{ color: colors.primary, fontSize: 24, fontWeight: "bold" }}>
        Xin chào, {profile?.fullName}
      </Text>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#0099FF",
            borderRadius: 16,
            width: "100%",
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("assets/explore.png")}
            style={{
              width: "100%",
              borderRadius: 10,
            }}
          />
          <Text
            style={{
              color: colors.white,
              fontSize: 20,
              fontWeight: "bold",
              position: "absolute",
              top: 20,
            }}
          >
            Khám phá ngay
          </Text>
          <TouchableOpacity
            className="!px-10 !py-4"
            activeOpacity={0.9}
            style={{
              backgroundColor: colors.white,
              borderRadius: 50,
              position: "absolute",
              bottom: 40,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: colors.primary,
            }}
            onPress={handleStartNow}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.primary,
              }}
            >
              Bắt đầu thôi
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.feelingContainer}>
        <Text style={styles.feelingText}>Bạn đang cảm thấy thế nào?</Text>
        <View style={{ flexDirection: "row", marginTop: 10, gap: 10 }}>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", color: colors.primary }}
          >
            {formatDate(date)}
          </Text>
          <TouchableOpacity onPress={showDatepicker}>
            <Image source={require("assets/icons/calendar.png")} />
          </TouchableOpacity>

          {show && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                if (selectedDate !== undefined) {
                  setDate(selectedDate);
                }
                setShow(false);
              }}
            />
          )}
        </View>
        <View style={styles.feelingPicker}>
          <MoodSlider />
        </View>
      </View>
      <View style={styles.mediationListContainer}>
        <Text style={styles.suggestionText}>Gợi ý cho bạn</Text>
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
          // onEndReachedThreshold={0.5}
          // onEndReached={handleShowMore}
          keyExtractor={(item) => item.id!.toString()}
          renderItem={({ item }) => <ListItem item={item} />}
          // initialNumToRender={2} // how many item to display first
          // onEndReachedThreshold={2} // so when you are at 5 pixel from the bottom react run onEndReached function
          // onEndReached={() => {
          //   handleLoadMore();
          // }}
        />
      </View>

      {!loading && !initLoading ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={handleLoadMore}
            activeOpacity={0.9}
            style={styles.showMoreBtn}
          >
            <Text
              style={{ color: colors.white, fontSize: 16, fontWeight: "bold" }}
            >
              Xem thêm
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </MainLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
    width: "100%",
  },
  suggestionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
  feelingContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.primary,
    marginTop: 10,
  },
  feelingText: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  feelingPicker: {
    width: "100%",
  },
  mediationListContainer: {
    marginTop: 20,
    flex: 1,
  },
  showMoreBtn: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    width: "50%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});
