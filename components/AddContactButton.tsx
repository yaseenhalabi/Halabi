import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native";
import getTheme from "../utils/GetTheme";
import { Entypo } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
type EditButtonProps = {
  onPress: () => void;
  disabled: boolean;
};

export default function EditButton({ onPress, disabled }: EditButtonProps) {
  const theme = getTheme();
  const handlePress = () => {
    onPress();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={[
        { backgroundColor: theme.text.full, opacity: disabled ? 0 : 1 },
        styles.button,
      ]}
    >
      <Entypo name="plus" size={35} color={theme.background} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 70,
    width: 70,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 20,
    bottom: 100,
    zIndex: 50,
  },
});
