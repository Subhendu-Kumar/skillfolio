import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { Lock } from "lucide-react-native";

const upload = () => {
  return (
    <View className="w-full h-full bg-white">
      <ScrollView className="w-full h-full px-4 py-4">
        <View className="items-center py-3 bg-white">
          <Text className="text-sm font-semibold text-indigo-600 uppercase">
            Resume Checker
          </Text>
          <Text className="text-2xl font-bold text-center text-gray-900 mt-2">
            Is your resume good enough?
          </Text>
          <Text className="text-base text-gray-600 text-center mt-2">
            A free and fast AI resume checker doing 16 crucial checks to ensure
            your resume is ready to perform and get you interview callbacks.
          </Text>
        </View>
        <View className="border-2 mt-4 border-dashed border-indigo-400 rounded-lg p-5 items-center space-y-4 bg-white">
          <Text className="text-center text-gray-700 font-pmedium">
            Drop your resume here or choose a file.{"\n"}
            <Text className="font-psemibold">
              PDF only (Max 2MB file size.)
            </Text>
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={onUpload}
            className="bg-indigo-500 w-full py-3 rounded-lg mt-3"
          >
            <Text className="text-white text-center font-pbold text-base">
              Select Your Resume
            </Text>
          </TouchableOpacity>
          <View className="flex-row items-center space-x-2 pt-2">
            <Lock size={16} color="#6B7280" />
            <Text className="text-gray-500 font-pmedium text-sm">
              Privacy guaranteed
            </Text>
          </View>
        </View>
        <View className="mt-4 space-y-2">
          <Text className="text-base text-gray-500 font-pmedium">
            Job Description:
          </Text>
          <TextInput
            className="border border-indigo-400 p-4 rounded-lg text-base text-gray-700 h-48"
            placeholder="Paste the job description here..."
            multiline
            textAlignVertical="top" // start from top-left like textarea
            //   value={jobDescription}
            //   onChangeText={setJobDescription}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          //   disabled={!resumeFile || !jobDescription}
          //   onPress={handleSubmitResumeAnalysis}
          className="bg-violet-600 rounded-lg mt-7 p-4 items-center"
        >
          <Text className="text-white text-base font-psemibold">
            Analyze Resume for Job
          </Text>
        </TouchableOpacity>
        <Text className="text-center text-gray-400 text-sm mt-2">
          🎉 Thanks for using our resume tools — we're rooting for your success!
        </Text>
      </ScrollView>
    </View>
  );
};

export default upload;
