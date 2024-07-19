import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Chat, MessageType } from "@flyerhq/react-native-chat-ui";
import { View, Text, Image } from "react-native";
import { HomeParamList } from "~/navigator/AppTabNavigator";
import data from "~/messages.json";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { colors } from "~/utils/colors";
import { AppParamList } from "~/navigator/AppNavigator";
import { CompositeScreenProps } from "@react-navigation/native";
import { ManagerParamList } from "~/navigator/ManagerNavigator";

type Props = CompositeScreenProps<
  NativeStackScreenProps<AppParamList, "CHAT_DETAIL">,
  NativeStackScreenProps<ManagerParamList, "CHAT_DETAIL">
>;
const ChatScreen: React.FC<Props> = ({ navigation, route }) => {
  const [messages, setMessages] = useState(data as MessageType.Any[]);
  const user = { id: "06c33e8b-e835-4736-80f4-63f44b66666c" };

  const addMessage = (message: MessageType.Any) => {
    setMessages([message, ...messages]);
  };

  const handleSendPress = (message: MessageType.PartialText) => {
    const textMessage: MessageType.Text = {
      author: user,
      createdAt: Date.now(),
      id: uuidv4(),
      text: message.text,
      type: "text",
    };
    addMessage(textMessage);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        padding: 16,
        width: "100%",
      }}
    >
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
      <View style={{ flex: 1 }}>
        <Chat
          messages={messages}
          // onAttachmentPress={handleAttachmentPress}
          // onMessagePress={handleMessagePress}
          // onPreviewDataFetched={handlePreviewDataFetched}
          onSendPress={handleSendPress}
          user={user}
        />
      </View>
    </View>
  );
};

export default ChatScreen;
