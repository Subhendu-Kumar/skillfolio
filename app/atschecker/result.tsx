import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const result = () => {
  const { data } = useLocalSearchParams();
  const score = data ? JSON.parse(data as string) : null;
  console.log("score", score);

  return (
    <View>
      <Text>result</Text>
    </View>
  );
};

export default result;
