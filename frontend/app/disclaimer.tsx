import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import CommonText from "../components/CommonText";
import { setHasSeenDisclaimer, setTutorialStep } from "../redux/tutorialSlice";
import getTheme from "../utils/GetTheme";
import * as Haptics from "expo-haptics";

export default function Disclaimer() {
  const dispatch = useDispatch();
  const theme = getTheme();

  const handleContinue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    dispatch(setHasSeenDisclaimer(true));
    dispatch(setTutorialStep(1)); // Start tutorial at step 1
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <TouchableOpacity style={styles.container} onPress={handleContinue}>
        <View style={styles.content}>
          <CommonText style={styles.title}>Disclaimer</CommonText>
          <CommonText style={styles.disclaimerText}>
            Halabi does not store your data on the cloud. All your information
            is kept locally on your device.
          </CommonText>
          <CommonText
            weight="regular"
            size="small"
            color="semi"
            style={{ marginVertical: "auto" }}
          >
            Tap anywhere to continue
          </CommonText>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
    gap: 20,
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  disclaimerText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
});
