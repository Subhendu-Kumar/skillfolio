import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import { images } from "@/constants";
import React, { useState } from "react";
import { FormStateSignUp } from "@/types";
import FormField from "@/components/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL } from "@/config";
import axios from "axios";

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
      const res = await axios.post(`${BASE_URL}/register/`, form);
      console.log(res.data);
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <View className="w-full min-h-[85vh] my-6 px-4 justify-center">
          <Image
            source={images.logo}
            className="w-16 h-16"
            resizeMode="contain"
          />
          <Text className="text-2xl font-psemibold mt-3 text-[#7a6a6a]">
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signup;
