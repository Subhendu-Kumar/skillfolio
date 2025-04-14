import {
  View,
  Text,
  Image,
  Alert,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { images } from "@/constants";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { useAuth } from "@/context/provider";
import { createGroup } from "@/lib/firebaseFunctions";

const createGroupPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupIconUrl, setGroupIconUrl] = useState("");

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      return Alert.alert("Please enter a group name.");
    }
    if (!groupIconUrl.trim()) {
      return Alert.alert("Please enter a group icon url.");
    }
    setLoading(true);
    try {
      const groupId = await createGroup(
        groupName,
        user?.id!,
        user?.username!,
        groupIconUrl
      );
      Alert.alert(
        "Group created successfully!",
        `Group ID: ${groupId}`,
        [
          {
            text: "OK",
            onPress: () => router.replace("/community"),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error creating group:", error);
      Alert.alert("Group creation failed", "Please try again later.");
    } finally {
      setGroupName("");
      setLoading(false);
      setGroupIconUrl("");
    }
  };

  return (
    <ScrollView className="w-full h-full bg-white px-4 py-6">
      <KeyboardAvoidingView>
        <View className="flex-1 justify-center items-center">
          <Image
            source={images.communityImg}
            className="w-80 h-60"
            resizeMode="contain"
          />
        </View>
        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl font-bold text-gray-800">
            Create a Group
          </Text>
          <Text className="text-xs text-gray-600 text-center mt-2">
            Connect with like-minded individuals and share your journey.
          </Text>
        </View>
        <View className="flex-1 justify-center items-center mt-8 gap-5">
          <TextInput
            placeholder="Group name"
            value={groupName}
            onChangeText={setGroupName}
            className="w-full h-12 p-2 border-2 border-orange-500 rounded-md"
          />
          <TextInput
            value={groupIconUrl}
            onChangeText={setGroupIconUrl}
            placeholder="Group Icon URL"
            className="w-full h-12 p-2 border-2 border-blue-500 rounded-md"
          />
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={loading}
            onPress={handleCreateGroup}
            className="w-full h-12 bg-violet-500 rounded-md items-center justify-center"
          >
            <Text className="text-center font-psemibold text-white">
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-center font-psemibold text-white">
                  Create Group
                </Text>
              )}
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-center text-gray-400 text-sm mb-12 mt-5">
          Looking to connect, grow, or just see what else is out there? Explore
          other communities and goals.{" "}
          <Link
            href="/group/join"
            className="text-purple-400 font-psemibold text-secondary"
          >
            join now
          </Link>
        </Text>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default createGroupPage;
