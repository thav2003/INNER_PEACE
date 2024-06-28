import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
} from "react-native";
import { colors } from "~/utils/colors";
import { useNavigation } from "@react-navigation/native";

import ListView from "~/components/ListView";
import { AppStackParamList } from "~/navigator/AppNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header from "~/components/Header";
import DateTimePicker from "@react-native-community/datetimepicker";
import useFetch from "~/hooks/useFetch";
import { LessonEntity, LessonPagedResponse } from "~/api/v1";
import { formatImageUrl } from "~/utils/image";
import api from "~/api";
import { useAuthStore } from "~/stores/auth.store";
import MoodSlider from "~/components/MoodSlider";
import { BottomTabParamList } from "~/navigator/BottomTabNavigator";

type Props = NativeStackScreenProps<BottomTabParamList, "HOME_TAB">;

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const profile = useAuthStore((state) => state.profile);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [response] = useFetch<LessonPagedResponse>(
    () => api.searchLessons(undefined, route.params?.page, route.params?.size),
    route.params?.page,
    route.params?.size
  );
  const logoutUser = useAuthStore((state) => state.logoutUser);
  console.log(response?.data);
  console.log(route.params?.page);
  console.log(route.params?.size);
  const data = (response ? response?.data?.content : []) as Array<LessonEntity>;

  const handleStartNow = async () => {
    // logoutUser();
    // navigation.navigate("SAMPLE_MEDIATION");
  };
  const handleShowMore = () => {
    // navigation.navigate("MediationTab");
    navigation.setParams({
      page: route.params?.page ? route.params?.page : 0,
      size: route.params?.size ? route.params?.size + 2 : 2,
    });
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

  const handleItemPress = (item: LessonEntity) => {
    navigation.navigate("LESSON_DETAIL", { lessonId: item.id! });
  };

  const handleLoadMore = () => {
    navigation.setParams({
      page: route.params?.page ? route.params?.page + 1 : 0,
      size: route.params?.size ? route.params?.size : 2,
    });
  };

  return (
    <ScrollView style={styles.container} fadingEdgeLength={100}>
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
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                alignItems: "center",
                marginVertical: 8,
              }}
            >
              <TouchableOpacity
                className="w-full"
                onPress={() => handleItemPress(item)}
              >
                <Image
                  source={{
                    uri: formatImageUrl(item.imgUrl) + "?" + new Date(),
                  }}
                  height={200}
                  style={{
                    width: "100%",
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          initialNumToRender={2} // how many item to display first
          onEndReachedThreshold={2} // so when you are at 5 pixel from the bottom react run onEndReached function
          onEndReached={() => {
            handleLoadMore();
          }}
        />
        {/* <ListView
          data={data}
          renderItem={({ item }) => (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: formatImageUrl(item.imgUrl),
                }}
                height={200}
                style={{
                  width: "100%",
                }}
              />
            </View>
          )}
          onItemPress={handleItemPress}
        /> */}
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          onPress={handleShowMore}
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
      <View
        style={{
          flex: 1,
          marginBottom: 130,
        }}
      ></View>
    </ScrollView>
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
