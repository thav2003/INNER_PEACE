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
} from "react-native";
import React, { useState } from "react";
import { colors } from "~/utils/colors";
//   import Footer from "~/components/Footer";
import { useNavigation } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import ListView from "~/components/ListView";
//   import MediationList from "~/components/MediationList";
import Header from "~/components/Header";
//   import FlexMediationList from "~/components/FlexMediationList";
import { Icon } from "@rneui/themed";
import { BottomTabParamList } from "~/navigator/BottomTabNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<BottomTabParamList, "MEDIATION_TAB">;

const MediationScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleToLike = () => {};
  const handleToMediation = () => {};
  const handleToStress = () => {};

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
      name: "Mediation Test Name 2",
      desc: "Mediation Test Description. lorem solium epso no tiano",
    },
    {
      id: 4,
      image: require("assets/testMediation2.png"),
      name: "Mediation Test Name 2",
      desc: "Mediation Test Description. lorem solium epso no tiano",
    },
    {
      id: 5,
      image: require("assets/testMediation.png"),
      name: "Mediation Test Name 2",
      desc: "Mediation Test Description. lorem solium epso no tiano",
    },
    {
      id: 6,
      image: require("assets/testMediation2.png"),
      name: "Mediation Test Name 2",
      desc: "Mediation Test Description. lorem solium epso no tiano",
    },
  ];
  const showedMediation = listMediation.slice(0, 2);
  return (
    <ScrollView style={styles.container}>
      <StatusBar />
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
      <View>
        <ImageBackground
          source={require("assets/media-exe.png")}
          resizeMode="contain"
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
          resizeMode="contain"
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
      {showedMediation && (
        <View style={styles.contContainer}>
          <Text style={styles.title}>Tiếp tục</Text>
          <FlatList
            scrollEnabled={false}
            data={showedMediation}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  alignItems: "center",
                  marginVertical: 8,
                }}
              >
                <TouchableOpacity className="w-full" activeOpacity={0.9}>
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={item.image}
                      style={{
                        width: "100%",
                        resizeMode: "contain",
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
          {/* <View style={styles.listViewContainer}>
      <ListView
        data={showedMediation}
        renderItem={({ item, onPress }) => (
          <MediationList item={item} onPress={onPress} />
        )}
        style={styles.listView}
      />
    </View> */}
        </View>
      )}

      <View>
        <Text style={styles.title}>Gợi ý cho bạn</Text>
        <FlatList
          scrollEnabled={false}
          data={listMediation.slice(0, 4)}
          numColumns={2}
          style={{ flex: 1 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                alignItems: "center",
                flex: 1,
                margin: 3,
                marginVertical: 10,
                minHeight: Dimensions.get("window").width / 2,
              }}
            >
              <TouchableOpacity className="w-full" activeOpacity={0.9}>
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={item.image}
                    style={{
                      width: "100%",
                      resizeMode: "cover",
                    }}
                  />
                  <Text className="font-bold text-lg text-[#3F54DB]">
                    {item.name}
                  </Text>
                  <Text className="text-[#3F54DB]">{item.desc}</Text>
                </View>
              </TouchableOpacity>
            </View>
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
    marginVertical: 5,
  },
  listViewContainer: {
    flex: 1,
  },
  listView: {
    flexDirection: "column",
  },
});
