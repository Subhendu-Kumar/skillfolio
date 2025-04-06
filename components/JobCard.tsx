import React from "react";
import { Job } from "@/types";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="px-4 my-2"
      onPress={() => {
        router.push(`/jobdetails/${job.job_id}` as any);
      }}
    >
      <View className="w-full flex-row items-start bg-white p-4 rounded-lg shadow border border-gray-200">
        <Image
          source={{
            uri:
              job.employer_logo ||
              "https://raw.githubusercontent.com/Subhendu-Kumar/portfolio/refs/heads/main/public/logo1.png",
          }}
          style={{ width: 40, height: 40, borderRadius: 8, marginRight: 16 }}
          resizeMode="contain"
        />
        <View className="flex-1">
          <Text
            className="font-semibold text-base text-blue-700"
            numberOfLines={1}
          >
            {job.job_title.split(" ").length > 15
              ? job.job_title.split(" ").slice(0, 15).join(" ") + "..."
              : job.job_title}
          </Text>
          <Text
            className="text-sm text-gray-700 font-medium mt-1"
            numberOfLines={1}
          >
            {job.employer_name} · {job.job_location} ({job.job_employment_type})
          </Text>
          <View className="flex-row items-center mt-2">
            <Text className="text-xs text-gray-500 font-medium mr-2">
              {job.job_posted_at}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;
