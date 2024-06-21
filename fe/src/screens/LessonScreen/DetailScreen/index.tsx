import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import BackwardBtn from "~/components/BackwardBtn";
import { useNavigation } from "@react-navigation/native";
import { colors } from "~/utils/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "~/navigator/AppNavigator";
import { LessonControllerApi, LessonEntity } from "~/api/v1";
import useFetch from "~/hooks/useFetch";
import { formatImageUrl } from "~/utils/image";
import { formatDuration } from "~/utils/time";
import { Button } from "react-native-paper";
import Video, { VideoRef } from "react-native-video";

type Props = NativeStackScreenProps<AppStackParamList, "LESSON_DETAIL">;

const lessonControllerApi = new LessonControllerApi();
const LessonDetailScreen: React.FC<Props> = ({ route }) => {
  const { lessonId } = route.params;
  const screenWidth = Dimensions.get("window").width;
  const [loading, error, response] = useFetch(() => {
    if (lessonId) return lessonControllerApi.getLessonById({ id: lessonId });
    return Promise.resolve();
  }, lessonId);
  const videoRef = useRef<VideoRef>(null);
  const item = response as LessonEntity;
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
          uri: formatImageUrl(item?.imgUrl),
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
      {/* <Video
        source={{
          uri: "http://192.168.1.9:8080/uploads/video/lessons/1717857459038_AIO%20-%20TnP%20-%20Google%20Chrome%202024-04-13%2007-39-22.mp4",
        }}
        ref={videoRef}
        style={styles.backgroundVideo}
      /> */}
      <View>
        <Button icon="play" mode="contained" buttonColor={colors.secondary}>
          Tập ngay
        </Button>
      </View>
    </View>
  );
};

export default LessonDetailScreen;

const styles = StyleSheet.create({
  backgroundVideo: {
    width: 300,
    height: 300,
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
