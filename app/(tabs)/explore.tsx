import API from "@/api";
import { Job } from "@/types";
import { images } from "@/constants";
import React, { useState } from "react";
import JobCard from "@/components/JobCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, Image, Alert, FlatList, ActivityIndicator } from "react-native";

const explore = () => {
  const [jobs, setJobs] = useState<Job[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchJobs = async (query: string) => {
    if (!query.trim()) {
      return Alert.alert("Please enter a search term");
    }
    setIsLoading(true);
    try {
      const res = await API.get(`/latest/jobs/?query=${query}`);
      setJobs(res.data.jobs);
    } catch (error) {
      Alert.alert("Something went wrong", "Please try again later");
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="px-4 py-2">
        <Text className="text-2xl font-bold">Explore Jobs</Text>
      </View>
      <View className="w-full px-4 py-2 border-b border-gray-200">
        <TextInput
          className="font-pmedium text-base w-full h-14 px-4 border border-purple-500 rounded-lg bg-white"
          placeholder="Search images"
          returnKeyType="search"
          onSubmitEditing={(e) => searchJobs(e.nativeEvent.text)}
        />
      </View>
      {isLoading ? (
        <View className="w-full my-24 justify-center items-center">
          <ActivityIndicator size="large" color="#000000" />
          <Text className="text-gray-500 text-base">
            🔍 Searching jobs for you...
          </Text>
        </View>
      ) : jobs.length > 0 ? (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.job_id}
          renderItem={({ item }) => (
            <>
              <View className="mb-2" />
              <JobCard job={item} />
            </>
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View className="my-10 w-full items-center justify-center">
              <Text className="text-red-400">No jobs found for your query</Text>
            </View>
          )}
        />
      ) : (
        <View className="w-full my-24 items-center justify-center">
          <Image
            source={images.job_search}
            className="w-full h-60"
            resizeMode="contain"
          />
          <Text className="text-gray-500 text-base text-center px-6 mt-4">
            🔍 Explore jobs, discover opportunities, and take the next step in
            your career.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default explore;
