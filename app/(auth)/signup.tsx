import {
  View,
  Text,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "@/config";
import { images } from "@/constants";
import React, { useState } from "react";
import { FormStateSignUp } from "@/types";
import { Link, router } from "expo-router";
import FormField from "@/components/FormField";
import { SafeAreaView } from "react-native-safe-area-context";

const signup = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<FormStateSignUp>({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post(`${BASE_URL}/register/`, form);
      router.replace("/signin");
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        let messages = [];
        if (typeof errorData === "object") {
          for (const key in errorData) {
            if (Array.isArray(errorData[key])) {
              errorData[key].forEach((msg) => {
                messages.push(`${key}: ${msg}`);
              });
            } else {
              messages.push(`${key}: ${errorData[key]}`);
            }
          }
        } else {
          messages.push("Something went wrong. Please try again.");
        }
        Alert.alert("Error", messages.join("\n"));
      } else {
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full w-full bg-white items-center justify-center">
      <ScrollView className="w-full h-full px-4">
        <View className="flex-1 justify-center items-center">
          <Image
            source={images.signin_signup}
            className="w-80 h-60"
            resizeMode="contain"
          />
        </View>
        <Text className="text-2xl text-center font-psemibold mt-3 text-[#7a6a6a]">
          Sign up to <Text className="text-[#09bff1]">SkillFolio</Text>
        </Text>
        <FormField
          title="Username"
          value={form.username}
          handleChangeText={(e: string) => setForm({ ...form, username: e })}
          otherStyles="mt-7"
          placeholder="Enter your username"
        />
        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e: string) => setForm({ ...form, email: e })}
          otherStyles="mt-7"
          keyBoardType="email-address"
          placeholder="Enter your email"
        />
        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e: string) => setForm({ ...form, password: e })}
          otherStyles="mt-7"
          placeholder="Enter your password"
        />
        <TouchableOpacity
          onPress={submit}
          className="w-full bg-purple-400 mt-6 rounded-lg justify-center items-center p-2"
        >
          {isSubmitting ? (
            <ActivityIndicator size="large" />
          ) : (
            <Text className={`text-white text-center font-psemibold text-lg`}>
              Submit
            </Text>
          )}
        </TouchableOpacity>
        <View className="flex-row justify-center pt-5 gap-2">
          <Text className="text-lg text-gray-600 font-pregular">
            Already have an account?
          </Text>
          <Link
            href="/signin"
            className="text-lg text-purple-400 font-psemibold text-secondary"
          >
            Sign in
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signup;
