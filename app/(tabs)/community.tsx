import React from "react";
import { Link, router } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const community = () => {
  return (
    <SafeAreaView className="h-full w-full bg-white">
      <View className="w-full px-4 py-2 border-b border-gray-200">
        <Text className="text-2xl font-bold">Talk 🔊 with Community</Text>
      </View>
      <ScrollView className="w-full h-full px-4 py-2 space-y-6 bg-white">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push(`/chatroom/${1}` as any)}
          className="w-full my-2 p-2 h-20 border border-gray-200 shadow-md rounded-lg bg-white flex-row items-center justify-start"
        >
          <View className="w-12 h-12 bg-gray-200 rounded-full"></View>
          <View className="flex-1 px-4">
            <Text className="text-lg font-semibold">Community Name</Text>
            <Text className="text-sm text-gray-500">
              Last message preview...
            </Text>
          </View>
        </TouchableOpacity>
        <Text className="text-center text-gray-400 text-sm mb-12 mt-5">
          Looking to connect, grow, or just see what else is out there? Explore
          other communities and goals.{" "}
          <Link
            href="/join/getcommunities"
            className="text-purple-400 font-psemibold text-secondary"
          >
            join now
          </Link>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default community;
