import React, { useMemo, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import CardView from "~/components/CardView";
import Header from "~/components/Header";
import MainLayout from "~/layouts/MainLayout";
import { colors } from "~/utils/colors";
import { Avatar } from "react-native-paper";
import useFetch from "~/hooks/useFetch";
import api from "~/api";
import { useAuthStore } from "~/stores/auth.store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeParamList } from "~/navigator/AppTabNavigator";
import { AppParamList } from "~/navigator/AppNavigator";
import { CompositeScreenProps } from "@react-navigation/native";
import { Manager } from "socket.io-client";
import { ManagerParamList } from "~/navigator/ManagerNavigator";
import { ManagerTabParamList } from "~/navigator/ManagerTabNavigator";

type Props = CompositeScreenProps<
  CompositeScreenProps<
    NativeStackScreenProps<HomeParamList, "CHAT">,
    NativeStackScreenProps<ManagerTabParamList, "CHAT">
  >,
  CompositeScreenProps<
    NativeStackScreenProps<AppParamList, "HOME">,
    NativeStackScreenProps<ManagerParamList, "HOME">
  >
>;
const ListChatScreen: React.FC<Props> = ({ navigation }) => {
  const [initLoading, setInitLoading] = useState(false);
  const useId = useAuthStore((state) => state.auth?.userId);
  const userRole = useAuthStore((state) => state.profile?.role);
  const [response] = useFetch({
    fetchFunction: () => api.getRoomsByUserId(useId!),
  });

  const rooms = useMemo(() => {
    return response ? response.content : [];
  }, [response]);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: colors.white,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Image
            style={{
              width: 28.6,
              height: 37.58,
            }}
            source={require("assets/logo2.png")}
          />
          <Text
            style={{
              color: colors.primary,
              fontSize: 26,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            InnerPeace
          </Text>
        </View>
      </View>
      <View>
        <FlatList
          data={rooms}
          extraData={rooms}
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
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("CHAT_DETAIL")}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  margin: 5,
                }}
              >
                <Avatar.Image size={48} source={require("assets/avatar.png")} />
                <View>
                  <Text style={{ color: colors.primary }} className="font-bold">
                    {
                      item.users?.filter((user) => user.role !== userRole)[0]
                        .name
                    }
                  </Text>
                  <Text
                    style={{ color: colors.primary }}
                    className="line-clamp-1"
                  >
                    Nhắn tin ngay nào
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          // initialNumToRender={2} // how many item to display first
          // onEndReachedThreshold={2} // so when you are at 5 pixel from the bottom react run onEndReached function
          // onEndReached={() => {
          //   handleLoadMore();
          // }}
        />
      </View>
    </View>
  );
};
export default ListChatScreen;

const styles = StyleSheet.create({
  optionButton: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    justifyContent: "space-between",
  },
  image: {
    height: 24,
    width: 24,
    margin: 4,
    resizeMode: "contain",
    alignSelf: "center",
  },
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
