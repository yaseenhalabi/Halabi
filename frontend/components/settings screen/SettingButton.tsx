import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Alert,
  Easing,
} from "react-native";
import getTheme from "../../utils/GetTheme";
import CommonText from "../CommonText";
import { Ionicons } from "@expo/vector-icons";

type SettingButtonProps = {
  title: string;
  color?: string;
  onPress: () => Promise<boolean>;
  icon: React.ReactNode;
};

export default function SettingButton({
  title,
  onPress,
  color,
  icon,
}: SettingButtonProps) {
  const theme = getTheme();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity value

  const handlePress = async () => {
    setLoading(true);
    const success = await onPress();
    setLoading(false);
    setSuccess(success);
    if (success) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600, // Duration of the fade-out
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        setSuccess(false);
        fadeAnim.setValue(1); // Reset opacity for next success
      });
    } else {
      Alert.alert("Error", "An error occurred, please try again");
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundSecondary }]}
    >
      <TouchableOpacity
        onPress={handlePress}
        style={[styles.button, { backgroundColor: theme.backgroundTertiary }]}
      >
        {!loading && !success && (
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {icon}
            <CommonText style={{ color: color ? color : theme.text.full }}>
              {title}
            </CommonText>
          </View>
        )}
        {loading && <ActivityIndicator size="small" color={theme.text.full} />}
        {!loading && success && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={theme.text.success}
            />
          </Animated.View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
