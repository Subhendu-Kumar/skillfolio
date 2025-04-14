import { JoinedGroup } from "@/types";
import { Link, router } from "expo-router";
import { useAuth } from "@/context/provider";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchJoinedGroupsWithLatestMessage } from "@/lib/firebaseFunctions";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

const community = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [joinedCommunities, setJoinedCommunities] = useState<JoinedGroup[]>([]);

  useEffect(() => {
    const fetchJoinedCommunities = async (userId: string) => {
      setLoading(true);
      try {
        const data = await fetchJoinedGroupsWithLatestMessage(userId);
        setJoinedCommunities(data);
      } catch (error) {
        console.error("Error fetching joined communities:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJoinedCommunities(user?.id as string);
  }, []);

  return (
    <SafeAreaView className="h-full w-full bg-white">
      <View className="w-full px-4 py-2 border-b border-gray-200">
        <Text className="text-2xl font-bold">Talk 🔊 with Community</Text>
      </View>
      <ScrollView className="w-full h-full px-4 py-2 space-y-6 bg-white">
        {loading ? (
          <View className="flex-1 items-center justify-center bg-white my-6">
            {Array.from({ length: 5 }).map((_, idx) => {
              return (
                <View
                  key={idx}
                  className="w-full my-2 p-2 h-20 border border-gray-200 shadow-md rounded-lg bg-white flex-row items-center justify-start"
                >
                  <View className="w-12 h-12 bg-gray-200 animate-pulse rounded-full" />
                  <View className="flex-1 px-4">
                    <Text className="text-lg font-semibold animate-pulse p-2 w-20" />
                    <Text className="text-sm text-gray-500 animate-pulse p-2 w-32" />
                  </View>
                </View>
              );
            })}
          </View>
        ) : joinedCommunities.length > 0 ? (
          joinedCommunities.map((community) => (
            <TouchableOpacity
              key={community.id}
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: `/chatroom/${community.id}` as any,
                  params: {
                    groupName: community.groupName,
                    groupIconUrl: community.groupIconUrl,
                  },
                })
              }
              className="w-full my-2 p-2 h-20 border border-gray-200 shadow-md rounded-lg bg-white flex-row items-center justify-start"
            >
              <View className="w-12 h-12 bg-gray-200 rounded-full">
                <Image
                  source={{ uri: community.groupIconUrl }}
                  style={{ width: 48, height: 48, borderRadius: 24 }}
                />
              </View>
              <View className="flex-1 px-4">
                <Text className="text-lg font-semibold">
                  {community.groupName}
                </Text>
                <Text className="text-sm text-gray-500">
                  {community.latestMessage?.message || "No messages yet"}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View className="w-full my-40 flex-1 items-center justify-center">
            <Text className="text-base font-psemibold text-red-500">
              No communities found
            </Text>
          </View>
        )}
        <Text className="text-center text-gray-400 text-sm mb-12 mt-5">
          Looking to connect, grow, or just see what else is out there? Explore
          other communities and goals.{" "}
          <Link
            href="/group/join"
            className="text-purple-400 font-psemibold text-secondary"
          >
            join groups
          </Link>
        </Text>
        {/* <TouchableOpacity
          onPress={() => router.push("/group/create")}
          className="w-20 h-10 mb-14 bg-red-500"
        >
          <Text>Create group</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default community;
