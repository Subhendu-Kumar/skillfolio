import {
  View,
  Text,
  Image,
  Alert,
  Linking,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import API from "@/api";
import { JobDetailsType } from "@/types";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";

const JobDetailsPage = () => {
  const { job_id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [jobDetails, setJobDetails] = useState<JobDetailsType | null>(null);

  useEffect(() => {
    fetchDetailsAndMarkVisited();
  }, []);

  const fetchDetailsAndMarkVisited = async () => {
    setIsLoading(true);
    try {
      const res = await API.get(`/job/details/${job_id}`);
      await API.post("/user/stats/");
      setJobDetails(res.data.details);
    } catch (error) {
      console.error("Error fetching job details: ", error);
      Alert.alert(
        "Error",
        "Failed to fetch job details. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn("Don't know how to open URI: " + url);
    }
  };

  return (
    <ScrollView className="w-full h-full px-4 bg-white py-8">
      {isLoading ? (
        <View className="w-full h-full items-center justify-center">
          <Icon
            name="spinner"
            size={30}
            color="#000"
            className="animate-spin"
          />
          <Text className="text-gray-600 mt-2">Loading...</Text>
        </View>
      ) : (
        <>
          <View className="flex-row items-center">
            <Image
              source={{
                uri:
                  jobDetails?.employer_logo ||
                  "https://raw.githubusercontent.com/Subhendu-Kumar/portfolio/refs/heads/main/public/logo1.png",
              }}
              className="w-16 h-16 mr-3"
              resizeMode="contain"
            />
            <Text className="text-3xl font-semibold">
              {jobDetails?.employer_name}
            </Text>
          </View>
          <Text className="text-xl font-bold mb-1 mt-1">
            {jobDetails?.job_title}
          </Text>
          <Text className="text-gray-600 mb-2">
            {jobDetails?.job_location} ·{" "}
            <Text className="text-green-600 font-medium">
              {jobDetails?.job_posted_at}
            </Text>{" "}
            · Over 100 applicants
          </Text>
          <View className="flex-row flex-wrap gap-2 mb-2">
            <Text className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm">
              {jobDetails?.job_employment_type}
            </Text>
          </View>
          <View className="flex-row items-center space-x-3 gap-3 mb-5">
            <TouchableOpacity
              onPress={() => openLink(jobDetails?.job_apply_link!)}
              className="bg-blue-700 px-4 py-2 rounded-lg flex-1 items-center"
            >
              <Text className="text-white font-medium">Easy Apply</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-blue-700 px-4 py-2 rounded-lg flex-1 items-center">
              <Text className="text-blue-700 font-medium">Save</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-lg font-semibold mb-2">
            Use AI to assess how you fit
          </Text>
          <Text className="text-gray-600 mb-4">
            Get AI-powered advice on this job and more exclusive features with
            Premium.{" "}
            <Text className="text-blue-700 underline">Try Premium</Text>
          </Text>
          <TouchableOpacity className="flex-row items-center bg-yellow-100 px-4 py-2 rounded-lg mb-6">
            <Icon name="star" size={20} color="#ca8a04" className="mr-2" />
            <Text className="text-yellow-800 font-medium">
              Am I a good fit for this job?
            </Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold mb-2">About the job</Text>
          <Text className="font-semibold mb-1">Company Description</Text>
          <Text className="text-gray-700 leading-relaxed text-justify">
            {jobDetails?.job_description}
          </Text>
        </>
      )}
    </ScrollView>
  );
};

export default JobDetailsPage;
