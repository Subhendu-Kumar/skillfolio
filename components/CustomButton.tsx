import { CustomButtonProps } from "@/types";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  uploading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`bg-purple-400 rounded-xl min-h-[60px] justify-center items-center p-2 ${containerStyles} ${
        isLoading ? "opacity-50" : "opacity-100"
      }`}
      disabled={isLoading}
      onPress={handlePress}
    >
      {uploading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text
          className={`text-white text-center font-psemibold text-lg ${textStyles}`}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
