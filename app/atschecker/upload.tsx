import {
  View,
  Text,
  Alert,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import API from "@/api";
import { BASE_URL } from "@/config";
import { router } from "expo-router";
import React, { useState } from "react";
import { Lock } from "lucide-react-native";
import * as DocumentPicker from "expo-document-picker";

const upload = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [resumeFile, setResumeFile] = useState<any>(null);
  const [jobDescription, setJobDescription] = useState<string>("");

  const handlePickResume = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf"],
        copyToCacheDirectory: true,
      });
      if (res.canceled) {
        return Alert.alert("No file selected");
      }
      const file = res.assets[0];
      if (!file) {
        return Alert.alert("No resume selected");
      }
      setResumeFile(file);
      Alert.alert("Resume selected", file.name);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  };

  const handleSubmitResumeAnalysis = async () => {
    if (!resumeFile || !jobDescription) {
      return Alert.alert("Error", "Please upload resume and job description.");
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", {
        uri: resumeFile.uri,
        name: resumeFile.name,
        type: "application/pdf",
      } as any);
      formData.append("job_description", jobDescription);
      const response = await API.post(`${BASE_URL}/ats/resume/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        setJobDescription("");
        setResumeFile(null);
        Alert.alert("Success", "Resume analysis completed successfully.");
        router.push({
          pathname: "/atschecker/result",
          params: { data: JSON.stringify(response.data.score_response) },
        });
      } else {
        Alert.alert("Error", response.data.message || "Something went wrong.");
      }
    } catch (error: any) {
      Alert.alert("Error", (error as Error).message);
      console.log(error.response?.data || error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
            onPress={handlePickResume}
            className="bg-indigo-500 w-full py-3 rounded-lg mt-3"
          >
            <Text className="text-white text-center font-pbold text-base">
              {resumeFile ? resumeFile.name : "Tap to select PDF file"}
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
            textAlignVertical="top"
            value={jobDescription}
            onChangeText={setJobDescription}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!resumeFile || !jobDescription}
          onPress={handleSubmitResumeAnalysis}
          className="bg-violet-600 rounded-lg mt-7 p-4 items-center"
        >
          <Text className="text-white text-base font-psemibold">
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              "Analyze Resume for Job"
            )}
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
