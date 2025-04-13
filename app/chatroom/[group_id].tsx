import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const groupChatRoomPage = () => {
  const { group_id } = useLocalSearchParams();
  console.log("group_id", group_id);

  return (
    <View>
      <Text>groupChatRoomPage {group_id}</Text>
    </View>
  );
};

export default groupChatRoomPage;
