import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const resume = () => {
  return (
    <SafeAreaView className="h-full w-full items-center justify-center bg-white">
      <View>
        <Text className="text-xl text-center">resume</Text>
        <Text className="text-2xl text-center text-purple-500">comming soon</Text>
      </View>
    </SafeAreaView>
  );
};

export default resume;
