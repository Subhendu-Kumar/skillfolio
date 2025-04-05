import { View, Text } from "react-native";
import React from "react";

const JobCard = () => {
  return (
    <View className="px-4 mb-3">
      <View className="w-full h-auto bg-white p-3 rounded-lg shadow border border-gray-200">
        <View className="flex-row items-center justify-between">
          <View className="ml-3">
            <Text
              className="font-psemibold text-sm text-gray-700"
              numberOfLines={1}
            >
              helo
            </Text>
            <Text
              className="text-xs text-gray-500 font-psemibold"
              numberOfLines={1}
            >
              hoii
            </Text>
          </View>
          <Text className="text-green-500 font-semibold text-base">+30</Text>
        </View>
      </View>
    </View>
  );
};

export default JobCard;
