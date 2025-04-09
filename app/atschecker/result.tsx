import React from "react";
import { ScoreResponse } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const result = () => {
  const { data } = useLocalSearchParams();
  const score_response: ScoreResponse = data
    ? JSON.parse(data as string)
    : null;
  const totalKeywords = score_response.job_description_keywords.length;
  const matchedCount =
    score_response.keyword_skill_matching.matched_keywords.length;
  const missingCount =
    score_response.keyword_skill_matching.missing_keywords.length;
  const matchedPercent = (matchedCount / totalKeywords) * 100;
  const missingPercent = (missingCount / totalKeywords) * 100;

  return (
    <View className="w-full h-full bg-white">
      <ScrollView className="w-full h-full px-4 py-4">
        <View className="items-center py-3 bg-white">
          <Text className="text-sm font-semibold text-green-600 uppercase">
            Resume Score
          </Text>
          <Text className="text-xl font-bold text-center text-gray-900 mt-2">
            Here's how your resume performed
          </Text>
          <Text className="text-base text-gray-600 text-center mt-2">
            Below is a detailed breakdown of your resume’s strengths,
            weaknesses, and optimization suggestions to help you land more
            interviews.
          </Text>
        </View>
        <View className="items-center justify-center mt-6 p-6 bg-zinc-50 rounded-xl shadow-md border border-gray-200">
          <AnimatedCircularProgress
            size={140}
            width={15}
            fill={
              (parseInt(score_response.total_score.split("/")[0]) / 1000) * 100
            }
            tintColor="#34D399"
            backgroundColor="#E5E7EB"
            rotation={0}
            arcSweepAngle={360}
            lineCap="round"
          >
            {() => (
              <View className="items-center">
                <Text className="text-xl font-bold text-green-500">
                  {score_response.total_score}
                </Text>
              </View>
            )}
          </AnimatedCircularProgress>
          <Text className="text-xl text-gray-800 mt-2 font-semibold">
            Resume Score
          </Text>
        </View>
        <View className="bg-white rounded-xl border border-gray-200 shadow-md p-4 mt-4">
          <View>
            <Text className="text-base font-semibold text-green-600 mb-1">
              Matched Keywords ({matchedCount}/{totalKeywords})
            </Text>
            <View className="w-full h-4 bg-gray-200 rounded-full">
              <View
                className="h-4 bg-green-400 rounded-full"
                style={{ width: `${matchedPercent}%` }}
              />
            </View>
          </View>
          <View className="mt-3">
            <Text className="text-base font-semibold text-red-500 mb-1">
              Missing Keywords ({missingCount}/{totalKeywords})
            </Text>
            <View className="w-full h-4 bg-gray-200 rounded-full">
              <View
                className="h-4 bg-red-400 rounded-full"
                style={{ width: `${missingPercent}%` }}
              />
            </View>
          </View>
        </View>
        <View className="bg-white rounded-xl border border-gray-200 shadow-md p-4 mt-4">
          <Text className="text-lg font-bold text-red-500 mb-3">
            Common Mistakes
          </Text>
          {score_response.common_mistakes.map((mistake, index) => (
            <View key={index} className="flex-row items-start mb-2">
              <Text className="text-red-500 mr-2">•</Text>
              <Text className="text-gray-600 flex-1 text-justify">
                {mistake}
              </Text>
            </View>
          ))}
        </View>
        <View className="bg-white rounded-xl border border-gray-200 shadow-md p-4 mt-4">
          <Text className="text-lg font-bold text-green-600 mb-3">
            Optimization Tips
          </Text>
          {score_response.optimizations.map((tip, index) => (
            <View key={index} className="flex-row items-start mb-2">
              <Text className="text-green-600 mr-2">✓</Text>
              <Text className="text-gray-600 flex-1 text-justify">{tip}</Text>
            </View>
          ))}
        </View>
        <View className="bg-white rounded-xl border border-gray-200 shadow-md p-4 mt-4">
          <Text className="text-lg font-bold text-indigo-600 mb-3">
            Suggestions
          </Text>
          <Text className="text-gray-600 text-justify text-base">
            {score_response.keyword_skill_matching.suggestions}
          </Text>
        </View>
        <Text className="text-xl font-psemibold mt-4">Essential Checks</Text>
        <View className="space-y-3 mt-1">
          {Object.entries(score_response.essential_checks).map(
            ([key, value]) => (
              <View
                key={key}
                className="bg-white my-2 rounded-2xl p-4 shadow-sm border border-gray-200"
              >
                <Text className="text-sm font-semibold capitalize text-gray-800">
                  {key.replace(/_/g, " ")}
                </Text>
                <Text className="text-sm text-gray-600 mt-1">{value}</Text>
              </View>
            )
          )}
        </View>
        <Text className="text-center text-gray-400 text-sm mt-2 mb-12">
          🚀 Great work reviewing your resume! Let’s polish it up and land that
          dream job!
        </Text>
      </ScrollView>
    </View>
  );
};

export default result;
