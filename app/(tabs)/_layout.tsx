import React from "react";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#e159e3",
        tabBarInactiveTintColor: "#b9b9c9",
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="search" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="resume"
        options={{
          title: "Resume",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="address-book-o" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="users" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
