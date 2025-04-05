import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const home = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <View>
        <Text>home</Text>
      </View>
    </SafeAreaView>
  );
};

export default home;
