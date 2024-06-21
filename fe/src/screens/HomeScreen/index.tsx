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
} from "react-native";
import { colors } from "~/utils/colors";
import { useNavigation } from "@react-navigation/native";

import ListView from "~/components/ListView";
import { AppStackParamList } from "~/navigator/AppNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header from "~/components/Header";
import DateTimePicker from "@react-native-community/datetimepicker";
import useFetch from "~/hooks/useFetch";
import { LessonControllerApi, LessonEntity } from "~/api/v1";
import { formatImageUrl } from "~/utils/image";

type Props = NativeStackScreenProps<AppStackParamList, "HOME">;
const lessonControllerApi = new LessonControllerApi();
const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const [fullName, setFullName] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [moodLevel, setMoodLevel] = useState("normal");
  const { userId } = route.params || { userId: null };

  const [loading, error, response] = useFetch(() =>
    lessonControllerApi.searchLessons({ page: 0, size: 2 })
  );

  const data = (response ? response : []) as Array<LessonEntity>;
  //   console.log(data);
  //   useEffect(() => {
  //     const fetchUserDetails = async () => {
  //       try {
  //         const response = await fetch(
  //           `http://159.223.36.234:8080/api/v1/users/${userId}`
  //         );
  //         if (response.ok) {
  //           const user = await response.json();
  //           fullName = user.fullName;
  //           console.log(fullName);
  //           setFullName(fullName);
  //         } else {
  //           throw new Error("Failed to fetch user details");
  //         }
  //       } catch (error) {
  //         Alert.alert("Error", "Unable to fetch user details");
  //         console.error(error);
  //       }
  //     };

  //     if (userId) {
  //       fetchUserDetails();
  //     }
  //   }, [userId]);

  const listMediation = [
    {
      id: 1,
      image: require("assets/testMediation.png"),
      name: "Mediation Test Name 1",
      desc: "Mediation Test Description. lorem solium epso no tiano",
    },
    {
      id: 2,
      image: require("assets/testMediation2.png"),
      name: "Mediation Test Name 2",
      desc: "Mediation Test Description. lorem solium epso no tiano",
    },
    {
      id: 3,
      image: require("assets/testMediation.png"),
      name: "Mediation Test Name 3",
      desc: "Mediation Test Description. lorem solium epso no tiano",
    },
    {
      id: 4,
      image: require("assets/testMediation2.png"),
      name: "Mediation Test Name 4",
      desc: "Mediation Test Description. lorem solium epso no tiano",
    },
  ];
  const showedMediation = listMediation.slice(0, 2);

  const handleStartNow = () => {
    navigation.navigate("SAMPLE_MEDIATION");
  };
  const handleShowMore = () => {
    navigation.navigate("MediationTab");
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
    navigation.navigate("LESSON_DETAIL", { lessonId: item.id });
  };

  const handleMoodChange = (mood) => {
    setMoodLevel(mood);
  };

  return (
    <ScrollView style={styles.container} fadingEdgeLength={100}>
      <Header />
      <Text style={{ color: colors.primary, fontSize: 24, fontWeight: "bold" }}>
        Xin chào, {fullName}
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
          {/* <MoodSlider onMoodChange={handleMoodChange} /> */}
        </View>
      </View>
      <View style={styles.mediationListContainer}>
        <Text style={styles.suggestionText}>Gợi ý cho bạn</Text>
        <ListView
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
