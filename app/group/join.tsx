import {
  View,
  Text,
  Alert,
  Modal,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { NotJoinedGroups } from "@/types";
import { useAuth } from "@/context/provider";
import { fetchGroups, joinGroup } from "@/lib/firebaseFunctions";

const joinGroupPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [joining, setJoining] = React.useState<boolean>(false);
  const [groups, setGroups] = React.useState<NotJoinedGroups[]>([]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await fetchGroups(user?.id as string);
        setGroups(data);
      } catch (error) {
        console.log("Error: ", "While fetching groups");
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) {
      fetch();
    } else {
      Alert.alert("User does not authenticated!!");
    }
  }, []);

  const handleGroupJoin = async (groupId: string) => {
    setJoining(true);
    try {
      const message = await joinGroup(groupId, user?.id!, user?.username!);
      Alert.alert(
        "Message: ",
        `${message}`,
        [
          {
            text: "OK",
            onPress: () => router.replace("/community"),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log("Error joining community");
    } finally {
      setJoining(false);
    }
  };

  return (
    <ScrollView className="w-full h-full px-4 py-6 bg-white">
      {joining && (
        <Modal
          transparent
          animationType="fade"
          visible={joining}
          onRequestClose={() => {}}
        >
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
      {loading ? (
        <View className="flex-1 items-center justify-center bg-white my-10">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : groups.length > 0 ? (
        groups.map((group) => {
          return (
            <View
              key={group.id}
              className="w-full my-2 p-2 h-auto border border-gray-200 shadow-md rounded-lg bg-white"
            >
              <View className="flex-row items-center justify-start">
                <View className="w-12 h-12 bg-gray-200 rounded-full">
                  <Image
                    source={{ uri: group.groupIconUrl }}
                    style={{ width: 48, height: 48, borderRadius: 24 }}
                  />
                </View>
                <View className="flex-1 px-4">
                  <Text className="text-lg font-semibold">
                    {group.groupName}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                disabled={joining}
                activeOpacity={0.8}
                onPress={() => handleGroupJoin(group.id)}
                className="w-full h-10 bg-indigo-500 items-center justify-center rounded-md mt-4"
              >
                <Text className="font-psemibold text-lg text-white">Join</Text>
              </TouchableOpacity>
            </View>
          );
        })
      ) : (
        <View className="w-full items-center justify-center my-10">
          <Text>No communities found</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default joinGroupPage;
