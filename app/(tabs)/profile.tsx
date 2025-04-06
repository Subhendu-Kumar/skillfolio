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
import React, { useState } from "react";
import { useAuth } from "@/context/provider";
import { SafeAreaView } from "react-native-safe-area-context";

const profileLable = [
  {
    label: "Full Name",
    key: "full_name",
    placeholder: "Your full name",
  },
  {
    label: "Phone Number",
    key: "phone_number",
    placeholder: "10-digit number",
    keyboardType: "phone-pad",
  },
  {
    label: "Location",
    key: "location",
    placeholder: "City, State",
  },
  { label: "Bio", key: "bio", placeholder: "Short bio or intro" },
  {
    label: "Highest Qualification",
    key: "highest_qualification",
    placeholder: "e.g., B.Tech",
  },
  {
    label: "University",
    key: "university",
    placeholder: "University name",
  },
  {
    label: "Graduation Year",
    key: "graduation_year",
    placeholder: "e.g., 2026",
    keyboardType: "numeric",
  },
  {
    label: "Current Position",
    key: "current_position",
    placeholder: "e.g., Developer",
  },
  {
    label: "Years of Experience",
    key: "experience_years",
    placeholder: "e.g., 3",
    keyboardType: "numeric",
  },
  {
    label: "Skills",
    key: "skills",
    placeholder: "Comma separated e.g., React, Node",
  },
  {
    label: "LinkedIn URL",
    key: "linkedin",
    placeholder: "https://linkedin.com/...",
  },
  {
    label: "GitHub URL",
    key: "github",
    placeholder: "https://github.com/...",
  },
  {
    label: "Portfolio URL",
    key: "portfolio",
    placeholder: "https://...",
  },
];

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const { user, profile, getProfileData } = useAuth();
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
                  className="border-2 border-gray-300 rounded-md px-3 py-2"
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
              Dear {user?.username}, yourProfile is incomplete
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
            <View className="mt-4 bg-gray-50 p-4 rounded-lg shadow-sm">
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
              <View className="bg-gray-50 p-4 rounded-lg shadow-sm">
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
          onPress={() => setIsUpdate((prev) => !prev)}
          className="bg-purple-500 mt-6 p-2 rounded-md shadow-md items-center"
        >
          <Text className="text-white font-psemibold">
            {isUpdate ? "Cancle" : "Update profile"}
          </Text>
        </TouchableOpacity>
        <Text className="w-full text-center mt-2 text-sm mb-8">
          Joined on{" "}
          {moment(profile?.created_at).format("MMMM D, YYYY - h:mm A")}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
