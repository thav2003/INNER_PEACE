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
import { useNavigation } from "@react-navigation/native";
import { colors } from "~/utils/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "~/navigator/AppNavigator";
import { LessonControllerApi, LessonEntity } from "~/api/v1";
import useFetch from "~/hooks/useFetch";
import { formatImageUrl, formatVideoUrl } from "~/utils/image";
import { formatDuration } from "~/utils/time";
import { Button } from "react-native-paper";
import { ResizeMode, Video } from "expo-av";
import { Icon } from "@rneui/themed";
type Props = NativeStackScreenProps<AppStackParamList, "LESSON_DETAIL">;

const lessonControllerApi = new LessonControllerApi();
const LessonDetailScreen: React.FC<Props> = ({ route }) => {
  const { lessonId } = route.params;
  const [show, setShow] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const [loading, error, response] = useFetch(() => {
    if (lessonId) return lessonControllerApi.getLessonById({ id: lessonId });
    return Promise.resolve();
  }, lessonId);

  const item = response as LessonEntity;

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  console.log(formatVideoUrl(item?.videoUrl));
  if (show) {
    return (
      <View style={styles.backgroundVideo}>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.white,
              top: 40,
              right: 10,
              position: "absolute",
              borderRadius: 50,
              zIndex: 1000,
            }}
            onPress={() => setShow(false)}
          >
            <Icon
              name={"close-outline"}
              color={colors.primary}
              size={40}
              type={"ionicon"}
            />
          </TouchableOpacity>
        </View>
        <Video
          ref={video}
          style={styles.backgroundVideo}
          source={{
            uri: formatVideoUrl(item?.videoUrl),
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View>
    );
  }
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

      <View>
        <Button
          icon="play"
          mode="contained"
          buttonColor={colors.secondary}
          onPress={() => setShow(true)}
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
