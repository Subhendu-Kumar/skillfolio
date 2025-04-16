import {
  View,
  Text,
  Alert,
  Modal,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import { router } from "expo-router";
import React, { useEffect, useState, useCallback } from "react";
import { NotJoinedGroups } from "@/types";
import { useAuth } from "@/context/provider";
import { fetchGroups, joinGroup } from "@/lib/firebaseFunctions";

const joinGroupPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [joining, setJoining] = useState(false);
  const [groups, setGroups] = useState<NotJoinedGroups[]>([]);

  const fetchData = async () => {
    try {
      const data = await fetchGroups(user?.id as string);
      setGroups(data);
    } catch (error) {
      console.log("Error: ", "While fetching groups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchData();
    } else {
      Alert.alert("User not authenticated!");
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  const handleGroupJoin = async (groupId: string) => {
    setJoining(true);
    try {
      const message = await joinGroup(groupId, user?.id!, user?.username!);
      Alert.alert(
        "Success",
        message,
        [{ text: "OK", onPress: () => router.replace("/community") }],
        { cancelable: false }
      );
    } catch (error) {
      console.log("Error joining community");
    } finally {
      setJoining(false);
    }
  };

  const renderItem = ({ item }: { item: NotJoinedGroups }) => (
    <View className="w-full my-2 p-2 h-auto border border-gray-200 shadow-md rounded-lg bg-white">
      <View className="flex-row items-center justify-start">
        <Image
          source={{ uri: item.groupIconUrl }}
          style={{ width: 48, height: 48, borderRadius: 24 }}
        />
        <View className="flex-1 px-4">
          <Text className="text-lg font-semibold">{item.groupName}</Text>
        </View>
      </View>
      <TouchableOpacity
        disabled={joining}
        activeOpacity={0.8}
        onPress={() => handleGroupJoin(item.id)}
        className="w-full h-10 bg-indigo-500 items-center justify-center rounded-md mt-4"
      >
        <Text className="font-psemibold text-lg text-white">Join</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-white px-4 py-6">
      {/* Joining Modal */}
      {joining && (
        <Modal transparent animationType="fade" visible={joining}>
          <View className="flex-1 items-center justify-center bg-black bg-opacity-40">
            <View className="bg-white p-6 rounded-lg items-center justify-center">
              <ActivityIndicator size="large" color="#4f46e5" />
              <Text className="mt-4 text-lg font-semibold text-gray-700">
                Joining group...
              </Text>
            </View>
          </View>
        </Modal>
      )}

      {/* Group List */}
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View className="w-full items-center justify-center mt-10">
              <Text>No communities found</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default joinGroupPage;
