import React from "react";
import { router } from "expo-router";
import { Briefcase, Bot, Pencil } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

const resume = () => {
  return (
    <SafeAreaView className="h-full w-full bg-white">
      <View className="w-full px-4 py-2 border-b border-gray-200">
        <Text className="text-2xl font-bold">Build & Analyze Resume</Text>
      </View>
      <ScrollView className="w-full h-full px-4 py-4 space-y-6 bg-white">
        <View className="w-full items-center justify-center px-4 mt-4 mb-6">
          <Text className="text-center text-xl font-bold text-gray-800">
            Your AI-Powered{" "}
            <Text className="text-indigo-600">Resume Builder</Text>
          </Text>
          <Text className="text-center text-base font-medium text-gray-700 mt-2">
            helps you get noticed by top companies. Build and analyze your
            resume with our smart tools.
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            router.push("/atschecker/upload");
          }}
          className="w-full my-3 bg-white border border-gray-200 rounded-2xl shadow-lg p-4 flex-col gap-3 items-center justify-center"
        >
          <View className="bg-indigo-100 p-3 rounded-full">
            <Briefcase size={60} color="#4F46E5" />
          </View>
          <View className="flex-1 items-center justify-center">
            <Text className="text-lg text-center font-semibold text-gray-800">
              ATS Resume Checker
            </Text>
            <Text className="text-sm text-center text-gray-500 mt-1">
              Make sure your resume passes through Applicant Tracking Systems
              with ease.
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            router.push("/enhance/getresume");
          }}
          className="w-full my-3 bg-white border border-gray-200 rounded-2xl shadow-lg p-4 flex-col gap-3 items-center justify-center"
        >
          <View className="bg-green-100 p-3 rounded-full">
            <Bot size={60} color="#16A34A" />
          </View>
          <View className="flex-1 items-center justify-center">
            <Text className="text-lg text-center font-semibold text-gray-800">
              AI Resume Builder
            </Text>
            <Text className="text-sm text-center text-gray-500 mt-1">
              Use our AI assistant to create a standout resume tailored to your
              goals.
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          className="w-full my-3 mb-12 bg-white border border-gray-200 rounded-2xl shadow-lg p-4 flex-col gap-3 items-center justify-center"
        >
          <View className="bg-yellow-100 p-3 rounded-full">
            <Pencil size={50} color="#D97706" />
          </View>
          <View className="items-center justify-center flex-1">
            <Text className="text-lg text-center font-semibold text-gray-800">
              Manual Resume Builder
            </Text>
            <Text className="text-sm text-center text-gray-500 mt-1">
              Prefer full control? Build your resume step-by-step manually.
            </Text>
          </View>
        </TouchableOpacity>
        <Text className="text-center text-gray-400 text-sm mb-12">
          🎉 Thanks for using our resume tools — we're rooting for your success!
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default resume;
