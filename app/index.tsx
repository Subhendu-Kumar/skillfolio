import { images } from "../constants";
import { StatusBar } from "expo-status-bar";
// import { Redirect, router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full min-h-[80vh] justify-center mt-6 items-center px-4">
          <Image
            source={images.skillfolio}
            className="w-60 h-10"
            resizeMode="contain"
          />
          {/* <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          /> */}
          <View className="relative mt-5">
            <Text className="text-3xl font-bold text-center text-[#a7a1a1]">
              Discover endless possibilities with{" "}
              <Text className="text-purple-300">skillfolio</Text>
            </Text>
          </View>
          <Text className="text-sm font-pregular text-center text-[#7a6a6a] mt-7">
            Where passion meets purpose, and skills shape your story. Skillfolio
            is your gateway to discovering endless career possibilities.
          </Text>
          <TouchableOpacity className="w-full bg-purple-400 mt-6 rounded-lg justify-center items-center p-2">
            <Text className="text-white text-center font-psemibold text-lg">
              Get Strated
            </Text>{" "}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#c9c8c5" />
    </SafeAreaView>
  );
};

export default Home;
