import React from "react";
import { images } from "@/constants";
import JobCard from "@/components/JobCard";
import EmptyState from "@/components/EmptyState";
import { View, Text, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Sparkles, Wand2, FileText, Briefcase } from "lucide-react-native";
import { useAuth } from "@/context/provider";

const home = () => {
  const { user } = useAuth();
  const post = [
    { id: 1, title: "Post 1" },
    { id: 2, title: "Post 2" },
    { id: 3, title: "Post 3" },
  ];

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={post}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <JobCard />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <EmptyState
            title="No images found"
            subTitle="Be the first one to upload image!"
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-3 px-4 space-y-3">
            <View className="justify-between flex-row items-start mb-5">
              <View>
                <Text className="font-pmedium text-sm text-gray-500">
                  Welcome back,
                </Text>
                <Text className="text-2xl text-purple-500 font-psemibold capitalize">
                  {user?.username}
                </Text>
              </View>
              <Image
                source={images.logo}
                className="w-9 h-10"
                resizeMode="contain"
              />
            </View>
            <View className="w-full flex-1">
              <Text className="text-base mb-2 font-pregular text-gray-700">
                Your Stats
              </Text>
              <View className="w-full flex-row flex-wrap justify-between">
                <View className="w-[48%] bg-white rounded-lg p-3 mb-3 flex-row items-center justify-between shadow border border-gray-200">
                  <View>
                    <Text className="text-xs text-gray-500">Resume Points</Text>
                    <Text className="text-xl font-bold text-black">375</Text>
                  </View>
                  <Sparkles size={24} color="#fbbf24" />
                </View>
                <View className="w-[48%] bg-white rounded-lg p-3 mb-3 flex-row items-center justify-between shadow border border-gray-200">
                  <View>
                    <Text className="text-xs text-gray-500">
                      Resume Enhanced
                    </Text>
                    <Text className="text-xl font-bold text-black">0 time</Text>
                  </View>
                  <Wand2 size={24} color="#a78bfa" />
                </View>
                <View className="w-[48%] bg-white rounded-lg p-3 mb-3 flex-row items-center justify-between shadow border border-gray-200">
                  <View>
                    <Text className="text-xs text-gray-500">
                      Resume Created
                    </Text>
                    <Text className="text-xl font-bold text-black">0 Kg</Text>
                  </View>
                  <FileText size={24} color="#60a5fa" />
                </View>
                <View className="w-[48%] bg-white rounded-lg p-3 mb-3 flex-row items-center justify-between shadow border border-gray-200">
                  <View>
                    <Text className="text-xs text-gray-500">Jobs Visited</Text>
                    <Text className="text-xl font-bold text-black">0</Text>
                  </View>
                  <Briefcase size={24} color="#34d399" />
                </View>
              </View>
            </View>
            <View className="w-full mt-6">
              <Text className="text-xl font-psemibold">
                Jobs as your choice!
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default home;
