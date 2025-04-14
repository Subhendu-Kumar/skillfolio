import {
  View,
  Text,
  Image,
  Alert,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Message } from "@/types";
import { useAuth } from "@/context/provider";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { sendMessage, subscribeToMessages } from "@/lib/firebaseFunctions";
import React, { useState, useLayoutEffect, useEffect, useRef } from "react";

const GroupChatRoomPage = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const { group_id, groupName, groupIconUrl } = useLocalSearchParams();

  const flatListRef = useRef<FlatList>(null);
  const groupIdString = Array.isArray(group_id) ? group_id[0] : group_id;
  const groupNameString = Array.isArray(groupName) ? groupName[0] : groupName;
  const groupIconUrlString = Array.isArray(groupIconUrl)
    ? groupIconUrl[0]
    : groupIconUrl;

  useEffect(() => {
    if (!groupIdString) return;
    setLoading(true);
    const unsub = subscribeToMessages(groupIdString, (msgs) => {
      setMessages(msgs);
      setLoading(false);
    });
    return () => unsub();
  }, [groupIdString]);

  const handleSend = async () => {
    if (!input.trim() || !user?.id || !user?.username) return;
    setSending(true);
    try {
      const success = await sendMessage(
        groupIdString,
        user.id,
        user.username,
        input.trim()
      );
      if (success) {
        setInput("");
      } else {
        Alert.alert("Error", "Could not send message. Please try again.");
      }
    } catch (error) {
      console.error("Error in handleSend:", error);
      Alert.alert("Error", "Could not send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View className="flex-row items-center">
          <Image
            source={{
              uri: groupIconUrlString || "https://via.placeholder.com/32",
            }}
            className="w-8 h-8 rounded-full mr-2 border border-gray-200"
            defaultSource={{
              uri: "https://raw.githubusercontent.com/Subhendu-Kumar/portfolio/refs/heads/main/public/logo1.png",
            }}
          />
          <Text className="text-lg font-semibold">{groupNameString}</Text>
        </View>
      ),
      headerRight: () => (
        <View className="flex-row gap-4 pr-2">
          <TouchableOpacity>
            <MaterialIcons name="call" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="videocam" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, groupNameString, groupIconUrlString]);

  const renderMessage = ({ item }: { item: Message }) => {
    const isMe = item.senderId === user?.id;

    return (
      <View
        className={`max-w-[70%] px-3 py-2 rounded-xl my-1 ${
          isMe
            ? "bg-white self-end rounded-tr-none shadow-sm"
            : "bg-blue-100 self-start rounded-tl-none shadow-sm"
        }`}
      >
        {!isMe && (
          <Text className="text-xs text-gray-600 font-medium mb-1">
            {item.senderName}
          </Text>
        )}
        <Text className="text-base">{item.messageText}</Text>
        <Text className="text-xs text-gray-500 self-end mt-1">
          {item.timestamp instanceof Date
            ? item.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#007aff" />
        <Text className="mt-2 text-gray-600">Loading messages...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10, paddingBottom: 20 }}
        inverted
      />

      <View className="flex-row items-center px-3 py-2 bg-white border-t border-gray-200">
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type message..."
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
          multiline
          maxLength={500}
          editable={!sending}
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={sending || !input.trim()}
          className={`${!input.trim() ? "opacity-50" : ""}`}
        >
          {sending ? (
            <ActivityIndicator size="small" color="#007aff" />
          ) : (
            <Ionicons name="send" size={24} color="#007aff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GroupChatRoomPage;
