import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import BackwardBtn from "~/components/BackwardBtn";
import { colors } from "~/utils/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LessonControllerApi, LessonEntity, LessonResponse } from "~/api/v1";
import useFetch from "~/hooks/useFetch";
import { formatImageUrl, formatVideoUrl } from "~/utils/image";
import { formatDuration } from "~/utils/time";
import { Button } from "react-native-paper";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { Icon } from "@rneui/themed";
import { HomeParamList } from "~/navigator/HomeNavigator";
import { AppParamList } from "~/navigator/AppNavigator";
type Props = NativeStackScreenProps<AppParamList, "LESSON_DETAIL">;

const lessonControllerApi = new LessonControllerApi();
const LessonDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { lessonId, historyLesson } = route.params;
  const screenWidth = Dimensions.get("window").width;
  const [response] = useFetch<LessonResponse>(
    { fetchFunction: () => lessonControllerApi.getLessonById(lessonId) },
    lessonId
  );

  const item = response?.data as LessonEntity;

  return (
    <View style={styles.container}>
      <View>
        <BackwardBtn
          type="ionicon"
          iconName={"chevron-back-circle-sharp"}
          iconColor={colors.primary}
          size={40}
          top={40}
          left={10}
        />
      </View>
      <Image
        source={{
          uri: formatImageUrl(item?.imgUrl) + "?" + new Date(),
        }}
        width={screenWidth - 32}
        height={200}
        style={styles.image}
      />

      <View style={{ flex: 1, gap: 10 }}>
        <Text style={styles.title}>{item?.name}</Text>
        <Text style={styles.description}>{formatDuration(item?.duration)}</Text>
        <Text style={styles.description}>{item?.description}</Text>
      </View>

      <View>
        <Button
          icon="play"
          mode="contained"
          buttonColor={colors.secondary}
          onPress={() =>
            navigation.navigate("LESSON_VIDEO", {
              videoUrl: formatVideoUrl(item.videoUrl) + "?" + new Date(),
              lessonId: lessonId,
              currentTime: historyLesson?.watchedMillis,
            })
          }
        >
          Tập ngay
        </Button>
      </View>
    </View>
  );
};

export default LessonDetailScreen;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    gap: 30,
    padding: 16,
    position: "relative",
    backgroundColor: colors.primary,
  },
  image: {
    borderRadius: 20,
    marginRight: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.white,
  },
  description: {
    fontSize: 16,
    color: colors.white,
  },
});
