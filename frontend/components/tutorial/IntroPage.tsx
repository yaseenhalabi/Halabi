import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import CommonText from "../CommonText";
import { SafeAreaView } from "react-native-safe-area-context";
import HalabiBanner from "./HalabiBanner";
const dimensions = Dimensions.get("window");

type IntroPageProps = {
  onComplete: () => void;
};

export default function IntroPage({ onComplete }: IntroPageProps) {
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const fadeAnim4 = useRef(new Animated.Value(0)).current;

  const STAGGER_DURATION = 20;
  const ANIMATION_DURATION = 1000;
  useEffect(() => {
    Animated.stagger(STAGGER_DURATION, [
      Animated.timing(fadeAnim1, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim3, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim4, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim1, fadeAnim2, fadeAnim3, fadeAnim4]);

  return (
    <SafeAreaView style={styles.tutorialContainer}>
      <View style={{ width: "100%", alignItems: "flex-start" }}>
        <Animated.View style={{ opacity: fadeAnim1 }}>
          <CommonText style={{ fontSize: 40, color: "#4E4E4E" }} weight="bold">
            Welcome
          </CommonText>
        </Animated.View>
        <Animated.View style={{ opacity: fadeAnim2, marginTop: 10 }}>
          <CommonText
            style={{ fontSize: 28, color: "#4E4E4E" }}
            weight="semiBold"
          >
            Thank you for downloading Halabi!
          </CommonText>
        </Animated.View>
      </View>
      {/* SVG BANNER */}
      <Animated.View style={{ opacity: fadeAnim3 }}>
        <HalabiBanner />
      </Animated.View>
      {/* GET STARTED BUTTON */}
      <Animated.View
        style={{ width: "100%", alignItems: "center", opacity: fadeAnim4 }}
      >
        <TouchableOpacity style={styles.getStartedButton} onPress={onComplete}>
          <CommonText style={{ fontSize: 20, color: "#4E4E4E" }}>
            Get Started
          </CommonText>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tutorialContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: dimensions.width,
    height: dimensions.height,
    backgroundColor: "#F9F9F9",
    zIndex: 1,
    paddingHorizontal: 16,
    justifyContent: "space-around",
    paddingBottom: 50,
    alignItems: "center",
  },
  getStartedButton: {
    backgroundColor: "white",
    boxShadow: "0 0 10px 2px gray",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
});
