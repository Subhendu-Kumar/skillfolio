import { JoinedGroup } from "@/types";
import { Link, router } from "expo-router";
import { useAuth } from "@/context/provider";
import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchJoinedGroupsWithLatestMessage } from "@/lib/firebaseFunctions";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

const community = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [joinedCommunities, setJoinedCommunities] = useState<JoinedGroup[]>([]);

  const fetchData = async (userId: string) => {
    try {
      const data = await fetchJoinedGroupsWithLatestMessage(userId);
      setJoinedCommunities(data);
    } catch (error) {
      console.error("Error fetching joined communities:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (user?.id) {
      await fetchData(user.id);
    }
    setRefreshing(false);
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetchData(user.id);
    }
  }, [user?.id]);

  const renderItem = ({ item }: { item: JoinedGroup }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: `/chatroom/${item.id}` as any,
          params: {
            groupName: item.groupName,
            groupIconUrl: item.groupIconUrl,
          },
        })
      }
      className="w-full my-2 p-2 h-20 border border-gray-200 shadow-md rounded-lg bg-white flex-row items-center justify-start"
    >
      <Image
        source={{ uri: item.groupIconUrl }}
        style={{ width: 48, height: 48, borderRadius: 24 }}
      />
      <View className="flex-1 px-4">
        <Text className="text-lg font-semibold">{item.groupName}</Text>
        <Text className="text-sm text-gray-500">
          {item.latestMessage?.message || "No messages yet"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderSkeleton = () =>
    Array.from({ length: 5 }).map((_, idx) => (
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
    ));

  return (
    <SafeAreaView className="h-full w-full bg-white">
      <View className="w-full px-4 py-2 border-b border-gray-200">
        <Text className="text-2xl font-bold">Talk 🔊 with Community</Text>
      </View>

      <FlatList
        data={joinedCommunities}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          loading ? (
            <View className="mt-4">{renderSkeleton()}</View>
          ) : (
            <View className="w-full my-40 flex-1 items-center justify-center">
              <Text className="text-base font-psemibold text-red-500">
                No communities found
              </Text>
            </View>
          )
        }
        ListFooterComponent={
          <Text className="text-center text-gray-400 text-sm mb-12 mt-5">
            Looking to connect, grow, or just see what else is out there?
            Explore other communities and goals.{" "}
            <Link
              href="/group/join"
              className="text-purple-400 font-psemibold text-secondary"
            >
              join groups
            </Link>
          </Text>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 10,
          flexGrow: 1,
        }}
      />
    </SafeAreaView>
  );
};

export default community;
