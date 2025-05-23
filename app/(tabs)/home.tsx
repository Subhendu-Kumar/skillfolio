import {
  View,
  Text,
  Image,
  Alert,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import API from "@/api";
import { images } from "@/constants";
import { Job, Stats } from "@/types";
import JobCard from "@/components/JobCard";
import { useAuth } from "@/context/provider";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useState } from "react";
import { Sparkles, Wand2, FileText, Briefcase } from "lucide-react-native";

const home = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetchJobsAndUserStats();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchJobsAndUserStats();
    setRefreshing(false);
  }, []);

  const fetchJobsAndUserStats = async () => {
    try {
      const res = await API.get("/latest/jobs/");
      const resStat = await API.get("/user/stats/");
      setStats(resStat.data);
      setJobs(res.data.jobs);
    } catch (error) {
      console.log("Error fetching jobs:", error);
      Alert.alert("Error", "Failed to fetch jobs. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="justify-between flex-row items-start my-3 px-4 pb-2 border-b border-gray-200">
        <View>
          <Text className="font-pmedium text-sm text-gray-500">
            Welcome back,
          </Text>
          <Text className="text-2xl text-purple-500 font-psemibold capitalize">
            {user?.username}
          </Text>
        </View>
        <Image source={images.logo} className="w-9 h-10" resizeMode="contain" />
      </View>
      {isLoading ? (
        <View className="w-full h-full justify-center items-center">
          <ActivityIndicator size="large" color="#000000" />
        </View>
      ) : (
        <FlatList
          data={jobs}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
              <Text className="text-red-400">No jobs found</Text>
            </View>
          )}
          ListHeaderComponent={() => (
            <View className="px-4 space-y-3">
              <View className="w-full flex-1">
                <Text className="text-base mb-2 font-pregular text-gray-700">
                  Your Stats
                </Text>
                <View className="w-full flex-row flex-wrap justify-between">
                  <View className="w-[48%] bg-white rounded-lg p-3 mb-3 flex-row items-center justify-between shadow border border-gray-200">
                    <View>
                      <Text className="text-xs text-gray-500">
                        Resume Points
                      </Text>
                      <Text className="text-xl font-bold text-black">
                        {stats?.ats_score}
                      </Text>
                    </View>
                    <Sparkles size={24} color="#fbbf24" />
                  </View>
                  <View className="w-[48%] bg-white rounded-lg p-3 mb-3 flex-row items-center justify-between shadow border border-gray-200">
                    <View>
                      <Text className="text-xs text-gray-500">
                        Resume Enhanced
                      </Text>
                      <Text className="text-xl font-bold text-black">
                        {stats?.resume_enhanced} time
                      </Text>
                    </View>
                    <Wand2 size={24} color="#a78bfa" />
                  </View>
                  <View className="w-[48%] bg-white rounded-lg p-3 mb-3 flex-row items-center justify-between shadow border border-gray-200">
                    <View>
                      <Text className="text-xs text-gray-500">
                        Resume Created
                      </Text>
                      <Text className="text-xl font-bold text-black">0</Text>
                    </View>
                    <FileText size={24} color="#60a5fa" />
                  </View>
                  <View className="w-[48%] bg-white rounded-lg p-3 mb-3 flex-row items-center justify-between shadow border border-gray-200">
                    <View>
                      <Text className="text-xs text-gray-500">
                        Jobs Visited
                      </Text>
                      <Text className="text-xl font-bold text-black">
                        {stats?.jobs_visited}
                      </Text>
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
      )}
    </SafeAreaView>
  );
};

export default home;
