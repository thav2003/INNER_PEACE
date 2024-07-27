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
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "~/utils/colors";
//   import Footer from "~/components/Footer";
import { useNavigation } from "@react-navigation/native";
import {
  Card,
  Searchbar,
  Modal,
  Portal,
  PaperProvider,
  Appbar,
  TextInput,
  Button,
  Text as TextPaper,
} from "react-native-paper";
import Header from "~/components/Header";
import { Icon } from "@rneui/themed";
import { HomeParamList } from "~/navigator/AppTabNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MainLayout from "~/layouts/MainLayout";
import useFetch from "~/hooks/useFetch";
import api from "~/api";
import { useAuthStore } from "~/stores/auth.store";
import { ManagerTabParamList } from "~/navigator/ManagerTabNavigator";
import * as ImagePicker from "expo-image-picker";
import axios, { AxiosError } from "axios";
import { ImagePickerAsset } from "expo-image-picker";
import { err } from "react-native-svg";
import { useAppStore } from "~/stores/app.store";

type Props = NativeStackScreenProps<ManagerTabParamList, "LESSON_TAB">;
const size = 2;
const ListLessonScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const [createLoading, setCreateLoading] = useState(false);

  const refetchApp = useAppStore((state) => state.refetchApp);
  const userId = useAuthStore((state) => state.auth?.userId);
  const [page, setPage] = useState<number>(0);
  const [reponseLessons] = useFetch({
    fetchFunction: () => api.searchLessons(undefined, 0, 1000),
  });

  const [searchQuery, setSearchQuery] = useState("");

  const lessons = reponseLessons ? reponseLessons.data?.content : [];

  const [image, setImage] = useState<ImagePickerAsset>();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(typeof result);
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    borderRadius: 20,
  };

  const handleToMediation = () => {};
  const handleToStress = () => {};

  const handleDelete = async (id?: number) => {
    if (!id) return;
    try {
      await api.deleteLesson(id);
      Alert.alert("Thông báo", "Xóa thành công");
      refetchApp();
    } catch (err) {
      console.log(err);
    }
  };
  const handleCreate = async () => {
    if (!image) return;

    setCreateLoading(true);
    const formData = new FormData();
    formData.append("imgFile", {
      uri: Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
      name: image.fileName,
      type: image.mimeType,
    } as any);
    formData.append("name", name);
    formData.append("duration", duration);
    formData.append("description", description);
    formData.append("isVip", "false");
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL!}/api/v1/lessons`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = response.data;
      console.log("Upload successful:", result);
      Alert.alert("Thông báo", "Thêm thành công");
      refetchApp();
      setName("");
      setDescription("");
      setDuration("");
      setImage(undefined);
      hideModal();
    } catch (error) {
      const err = error as AxiosError;
      console.log("Upload failed:", err.response?.data);
      Alert.alert("Thông báo", "Thêm thất bại");
    } finally {
      setCreateLoading(false);
    }
  };
  return (
    <PaperProvider>
      <Portal>
        <Modal
          style={{ top: 0, marginTop: 0 }}
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
          dismissableBackButton={true}
        >
          <Appbar.Header style={{ borderRadius: 20 }}>
            <Appbar.BackAction onPress={hideModal} />
          </Appbar.Header>
          <View style={{ padding: 20, paddingTop: 0 }}>
            {!image && (
              <TouchableOpacity onPress={pickImage}>
                <View
                  style={{ backgroundColor: colors.grey, height: 80 }}
                  className="items-center justify-center rounded-lg"
                >
                  <Text className="text-center">Hình ảnh</Text>
                </View>
              </TouchableOpacity>
            )}
            <View className="items-center justify-center rounded-lg">
              {image && (
                <Image source={{ uri: image.uri }} style={styles.image} />
              )}
              {image && (
                <TouchableOpacity onPress={() => setImage(undefined)}>
                  <Icon
                    type="ionicon"
                    name={"close-outline"}
                    color={colors.primary}
                    size={40}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View className="mt-5">
              <TextInput
                label="Tên bài tập"
                value={name}
                onChangeText={(name) => setName(name)}
              />
              <TextInput
                style={{ marginTop: 20 }}
                label="Thời gian tập"
                keyboardType="numeric"
                value={duration}
                onChangeText={(duration) => setDuration(duration)}
              />
              <TextInput
                style={{ marginTop: 20 }}
                label="Mô tả"
                multiline={true}
                value={description}
                onChangeText={(description) => setDescription(description)}
              />

              <Button
                loading={createLoading}
                style={{ marginTop: 20 }}
                mode="contained"
                onPress={handleCreate}
              >
                Thêm
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
      <MainLayout style={styles.container}>
        <Header />

        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <Text style={styles.title}>Quản lý bài tập</Text>
          <TouchableOpacity
            onPress={showModal}
            style={{ position: "absolute", right: 10, top: 0 }}
          >
            <Icon
              type="ionicon"
              name={"create-outline"}
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
        <View>
          <FlatList
            scrollEnabled={false}
            data={lessons}
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
                <Card style={{ minHeight: 180 }}>
                  <Card.Title
                    title={
                      <Text
                        numberOfLines={1}
                        className="font-bold text-lg text-[#3F54DB]"
                      >
                        {item.name}
                      </Text>
                    }
                  />
                  <Card.Content>
                    <TextPaper variant="titleLarge">{`${item.duration} phút`}</TextPaper>
                    <Text numberOfLines={3}>{`${item.description}`}</Text>
                  </Card.Content>
                  <TouchableOpacity
                    onPress={() => handleDelete(item.id)}
                    style={{ position: "absolute", right: 10, top: 10 }}
                  >
                    <Icon
                      type="ionicon"
                      name={"close-outline"}
                      color={colors.primary}
                      size={20}
                    />
                  </TouchableOpacity>
                </Card>
              </View>
            )}

            // }}
          />
        </View>
        {/* <View className="flex flex-col gap-5 mb-5">
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
      </View> */}
      </MainLayout>
    </PaperProvider>
  );
};

export default ListLessonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white,
  },
  image: {
    width: 200,
    height: 200,
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
