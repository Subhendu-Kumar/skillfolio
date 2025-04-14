import {
  View,
  Text,
  Alert,
  Linking,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardTypeOptions,
} from "react-native";
import API from "@/api";
import moment from "moment";
import { router } from "expo-router";
import React, { useState } from "react";
import { useAuth } from "@/context/provider";
import { SafeAreaView } from "react-native-safe-area-context";

const profileLable = [
  {
    key: "full_name",
    label: "Full Name",
    placeholder: "Your full name",
  },
  {
    key: "phone_number",
    label: "Phone Number",
    keyboardType: "phone-pad",
    placeholder: "10-digit number",
  },
  {
    key: "location",
    label: "Location",
    placeholder: "City, State",
  },
  { label: "Bio", key: "bio", placeholder: "Short bio or intro" },
  {
    placeholder: "e.g., B.Tech",
    key: "highest_qualification",
    label: "Highest Qualification",
  },
  {
    key: "university",
    label: "University",
    placeholder: "University name",
  },
  {
    key: "graduation_year",
    keyboardType: "numeric",
    label: "Graduation Year",
    placeholder: "e.g., 2026",
  },
  {
    key: "current_position",
    label: "Current Position",
    placeholder: "e.g., Developer",
  },
  {
    placeholder: "e.g., 3",
    keyboardType: "numeric",
    key: "experience_years",
    label: "Years of Experience",
  },
  {
    key: "skills",
    label: "Skills",
    placeholder: "Comma separated e.g., React, Node",
  },
  {
    key: "linkedin",
    label: "LinkedIn URL",
    placeholder: "https://linkedin.com/...",
  },
  {
    key: "github",
    label: "GitHub URL",
    placeholder: "https://github.com/...",
  },
  {
    key: "portfolio",
    label: "Portfolio URL",
    placeholder: "https://...",
  },
];

const Profile = () => {
  const { user, logout, profile, getProfileData, profileLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [form, setForm] = useState({
    bio: profile?.bio,
    skills: profile?.skills,
    github: profile?.github,
    linkedin: profile?.linkedin,
    location: profile?.location,
    portfolio: profile?.portfolio,
    full_name: profile?.full_name,
    university: profile?.university,
    phone_number: profile?.phone_number,
    graduation_year: profile?.graduation_year,
    current_position: profile?.current_position,
    experience_years: profile?.experience_years,
    highest_qualification: profile?.highest_qualification,
  });

  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn("Don't know how to open URI: " + url);
    }
  };

  const renderSkillTags = () =>
    form?.skills?.split(",").map((skill, index) => (
      <Text
        key={index}
        className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full mr-2 mb-2"
      >
        {skill.trim()}
      </Text>
    ));

  const submitUpdate = async () => {
    setLoading(true);
    try {
      const res = await API.put(`/profile/update/`, form);
      setForm(res?.data);
      await getProfileData();
      Alert.alert("Success", "Profile updated successfully!");
      setIsUpdate(false);
    } catch (error) {
      Alert.alert("Error", "Failed to update profile. Please try again.");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => {
          logout();
          Alert.alert("Logged out", "You have been logged out successfully.");
          router.replace("/signin");
        },
      },
    ]);
  };

  if (profileLoading) {
    <View className="w-full h-full items-center justify-center">
      <ActivityIndicator size="large" />
    </View>;
  }

  return (
    <SafeAreaView className="h-full bg-white px-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        {isUpdate ? (
          <View className="pt-4 bg-white">
            <Text className="text-center text-xl font-bold text-gray-800">
              Update Profile
            </Text>
            <Text className="text-center text-sm text-gray-500 mt-1 mb-4">
              Please fill in the details to update your profile.
            </Text>
            {profileLable.map(({ label, key, placeholder, keyboardType }) => (
              <View key={key} className="mb-4">
                <Text className="text-base font-semibold text-gray-800 mb-1">
                  {label}
                </Text>
                <TextInput
                  value={form[key as keyof typeof form]?.toString()}
                  multiline={key === "bio" || key === "skills"}
                  textAlignVertical={
                    key === "bio" || key === "skills" ? "top" : "center"
                  }
                  onChangeText={(text) =>
                    setForm({
                      ...form,
                      [key]: text,
                    })
                  }
                  placeholder={placeholder}
                  keyboardType={
                    (keyboardType as KeyboardTypeOptions) || "default"
                  }
                  className={`border-2 border-gray-300 rounded-md px-3 py-2 ${
                    key === "bio" || (key === "skills" && "h-32")
                  }`}
                />
              </View>
            ))}
            <TouchableOpacity
              className="bg-blue-500 p-3 rounded-md mt-4"
              onPress={submitUpdate}
            >
              {loading ? (
                <ActivityIndicator size="large" />
              ) : (
                <Text
                  className={`text-white text-center font-psemibold text-lg`}
                >
                  Save Changes
                </Text>
              )}
            </TouchableOpacity>
          </View>
        ) : !profile?.is_complete ? (
          <View className="w-full mt-40">
            <Text className="text-center text-xl font-semibold text-gray-800">
              Dear {user?.username}, your Profile is incomplete
            </Text>
            <Text className="text-center text-sm text-gray-600 mt-2">
              Please complete your profile to unlock all features.
            </Text>
          </View>
        ) : (
          <>
            <View className="flex-row items-center mt-6 mb-4">
              <View className="w-16 h-16 bg-blue-500 rounded-full items-center justify-center">
                <Text className="text-3xl font-bold text-white">
                  {user?.username.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View className="ml-4">
                <Text className="text-lg font-bold capitalize text-gray-800">
                  {user?.username}
                </Text>
                <Text className="text-base text-gray-600">
                  {form.full_name}
                </Text>
              </View>
            </View>
            <Text className="text-sm text-gray-500 mb-1">
              📞 +91 {form.phone_number} · 📍 {form.location}
            </Text>
            <View className="mt-4 bg-gray-100 p-4 rounded-lg shadow-sm">
              <Text className="text-base font-semibold text-gray-800">
                {form.current_position} ({form.experience_years} years)
              </Text>
              <Text className="text-sm text-gray-600 mt-1 text-justify capitalize">
                {form.bio}
              </Text>
            </View>
            <View className="mt-6">
              <Text className="text-lg font-semibold text-gray-800 mb-2">
                Skills
              </Text>
              <View className="flex-row flex-wrap">{renderSkillTags()}</View>
            </View>
            <View className="mt-6">
              <Text className="text-lg font-semibold text-gray-800 mb-1">
                Education
              </Text>
              <View className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <Text className="text-sm text-gray-700 capitalize text-justify">
                  🎓 {form.highest_qualification} from {form.university} (
                  {form.graduation_year})
                </Text>
              </View>
            </View>
            <View className="mt-6">
              <Text className="text-lg font-semibold text-gray-800 mb-2">
                Connect With Me
              </Text>
              <View className="flex-row justify-between">
                <TouchableOpacity
                  onPress={() => openLink(form.linkedin!)}
                  className="w-[30%] items-center p-3 bg-blue-600 rounded-md shadow-md"
                >
                  <Text className="text-white font-semibold">LinkedIn</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => openLink(form?.github!)}
                  className="w-[30%] items-center p-3 bg-gray-700 rounded-md shadow-md"
                >
                  <Text className="text-white font-semibold">GitHub</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => openLink(form?.portfolio!)}
                  className="w-[30%] items-center p-3 bg-black rounded-md shadow-md"
                >
                  <Text className="text-white font-semibold">Portfolio</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsUpdate((prev) => !prev)}
          className="bg-purple-500 mt-6 p-2 rounded-md shadow-md items-center"
        >
          <Text className="text-white font-psemibold">
            {isUpdate ? "Cancle" : "Update profile"}
          </Text>
        </TouchableOpacity>
        {!isUpdate && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleLogout}
            className="border-2 bg-white border-red-500 mt-4 p-2 rounded-md shadow-md items-center"
          >
            <Text className="font-psemibold">Sign out</Text>
          </TouchableOpacity>
        )}
        <Text className="w-full text-center mt-2 text-sm mb-8">
          Joined on{" "}
          {moment(profile?.created_at).format("MMMM D, YYYY - h:mm A")}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
