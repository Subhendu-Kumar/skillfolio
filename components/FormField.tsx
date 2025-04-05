import { useState } from "react";
import { FormFieldProps } from "@/types";
import { View, Text, TextInput } from "react-native";

const FormField = ({
  title,
  value,
  placeholder,
  otherStyles,
  keyBoardType,
  handleChangeText,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-lg text-gray-600 font-pmedium">{title}</Text>
      <View
        className="w-full h-16 px-4 rounded-lg items-center flex-row"
        style={{ borderWidth: 2, borderColor: "#eab5e5" }}
      >
        <TextInput
          className="flex-1 font-psemibold text-base w-full h-full"
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />
      </View>
    </View>
  );
};

export default FormField;
