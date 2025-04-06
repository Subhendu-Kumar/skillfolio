import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const JobDetailsPage = () => {
  const { job_id } = useLocalSearchParams();
  console.log("job id: ", job_id);
  return (
    <View>
      <Text>JobDetailsPage</Text>
    </View>
  );
};

export default JobDetailsPage;
