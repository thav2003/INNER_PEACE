import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { Icon } from "@rneui/themed";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "~/utils/colors";
import { formatVideoUrl } from "~/utils/image";
import { useEffect, useRef, useState } from "react";
import { AppParamList } from "~/navigator/AppNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import socket from "~/socket";
import { useAuthStore } from "~/stores/auth.store";
import { useAppStore } from "~/stores/app.store";
import { useSocket } from "~/hooks/useSocket";
type Props = NativeStackScreenProps<AppParamList, "LESSON_VIDEO">;
const VideoScreen: React.FC<Props> = ({ navigation, route }) => {
  const refetchApp = useAppStore((state) => state.refetchApp);
  const { videoUrl, lessonId, currentTime } = route.params;
  const userId = useAuthStore((state) => state.auth?.userId);
  const video = useRef(null);
  const [current, setCurrent] = useState(currentTime ? currentTime : 0);

  const { isConnected, socket } = useSocket({
    lessonId: lessonId,
    userId: userId,
    roomType: "VIDEO",
  });

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.isPlaying) {
      setCurrent(status.positionMillis);
      if (isConnected) {
        socket?.emit("updateVideoTime", {
          lessonId: lessonId,
          userId: userId,
          currentTimeMillis: status.positionMillis,
        });
      }
    }
  };

  useEffect(() => {
    if (isConnected) {
      socket?.emit("joinRoom", {
        lessonId: lessonId,
        userId: userId,
        roomType: "VIDEO",
      });
    }
  }, [isConnected]);

  useEffect(() => {
    return () => {
      refetchApp();
    };
  }, []);
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
          onPress={() => navigation.goBack()}
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
        positionMillis={currentTime ? currentTime : 0}
        ref={video}
        style={styles.backgroundVideo}
        source={{
          uri: videoUrl,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
