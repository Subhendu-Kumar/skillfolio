import "../global.css";
import "react-native-reanimated";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/context/provider";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="jobdetails/[job_id]"
          options={{
            headerShown: true,
            headerTitle: "Job Details",
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "semibold",
              color: "#1f2937",
            },
          }}
        />
        <Stack.Screen
          name="atschecker/upload"
          options={{
            headerShown: true,
            headerTitle: "ATS Resume Checker",
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "semibold",
              color: "#1f2937",
            },
          }}
        />
        <Stack.Screen
          name="atschecker/result"
          options={{
            headerShown: true,
            headerTitle: "ATS Result",
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "semibold",
              color: "#1f2937",
            },
          }}
        />
        <Stack.Screen
          name="enhance/getresume"
          options={{
            headerShown: true,
            headerTitle: "Enhance Resume",
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "semibold",
              color: "#1f2937",
            },
          }}
        />
        <Stack.Screen
          name="group/join"
          options={{
            headerShown: true,
            headerTitle: "Explore Communities",
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "semibold",
              color: "#1f2937",
            },
          }}
        />
        <Stack.Screen
          name="chatroom/[group_id]"
          options={{
            headerShown: true,
            headerTitle: "Job Details",
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "semibold",
              color: "#1f2937",
            },
          }}
        />
        <Stack.Screen
          name="group/create"
          options={{
            headerShown: true,
            headerTitle: "Create Group",
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "semibold",
              color: "#1f2937",
            },
          }}
        />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </AuthProvider>
  );
};

export default RootLayout;
