import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import { useEffect, useRef } from "react";
import CommonText from "../CommonText";
import { LinearGradient } from "expo-linear-gradient";
import getTheme from "../../utils/GetTheme";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SWIPE_THRESHOLD_PERCENTAGE = 0.3;

type NewContactsPopupBannerProps = {
  newContactsCount: number;
  onAddPress: () => void;
  onDismiss: () => void;
  visible: boolean;
};

export default function NewContactsPopupBanner({
  newContactsCount,
  onAddPress,
  onDismiss,
  visible,
}: NewContactsPopupBannerProps) {
  const theme = getTheme();
  const insets = useSafeAreaInsets();
  const parentSlideInAnim = useRef(new Animated.Value(400)).current;
  const parentSlideDownAnim = useRef(new Animated.Value(0)).current;
  const childSwipeAnim = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get("window").width;

  if (visible) {
    childSwipeAnim.setValue(0);
    parentSlideDownAnim.setValue(0);
    parentSlideInAnim.setValue(400);

    setTimeout(() => {
      Animated.spring(parentSlideInAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }, 10);
  } else {
    parentSlideInAnim.stopAnimation();
    parentSlideDownAnim.stopAnimation();
    childSwipeAnim.stopAnimation();

    parentSlideInAnim.setValue(400);
    parentSlideDownAnim.setValue(0);
    childSwipeAnim.setValue(0);
  }

  const handleLocalAddPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onAddPress();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return (
          gestureState.dx > 10 && gestureState.dx > Math.abs(gestureState.dy)
        );
      },
      onPanResponderGrant: () => {
        childSwipeAnim.addListener(({ value }) => {});
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 0) {
          childSwipeAnim.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const swipeThreshold = screenWidth * SWIPE_THRESHOLD_PERCENTAGE;

        if (gestureState.dx > swipeThreshold) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

          Animated.timing(childSwipeAnim, {
            toValue: screenWidth,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            Animated.timing(parentSlideDownAnim, {
              toValue: 100,
              duration: 150,
              useNativeDriver: true,
            }).start(() => {
              setTimeout(() => {
                parentSlideInAnim.setValue(400);
                parentSlideDownAnim.setValue(0);
                childSwipeAnim.setValue(0);
              }, 50);
              onDismiss();
            });
          });
        } else {
          Animated.spring(childSwipeAnim, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }).start();
        }

        childSwipeAnim.removeAllListeners();
      },
    })
  ).current;

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.parentContainer,
        {
          backgroundColor: theme.text.error,
          bottom: insets.bottom,
        },
        {
          transform: [
            { translateX: parentSlideInAnim },
            { translateY: parentSlideDownAnim },
          ],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.childContainer,
          {
            backgroundColor: theme.backgroundSecondary,
            borderColor: theme.backgroundTertiary,
            transform: [{ translateX: childSwipeAnim }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <CommonText size="medium" weight="medium" color="full">
              {newContactsCount} new iOS contact
              {newContactsCount > 1 ? "s" : ""} detected
            </CommonText>
            <CommonText size="small" color="semi">
              Swipe right to add later in settings
            </CommonText>
          </View>

          <TouchableOpacity
            onPress={handleLocalAddPress}
            style={styles.buttonContainer}
          >
            <LinearGradient
              colors={["#4A90E2", "#8E44AD"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.addButton}
            >
              <CommonText
                size="medium"
                weight="medium"
                style={{ color: "white" }}
              >
                Add
              </CommonText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* "Later" text appearing behind the swiping banner */}
      <Animated.View
        style={[
          styles.laterTextContainer,
          {
            opacity: childSwipeAnim.interpolate({
              inputRange: [0, screenWidth * 0.1, screenWidth * 0.2],
              outputRange: [0, 0, 1],
              extrapolate: "clamp",
            }),
            transform: [
              {
                translateX: childSwipeAnim.interpolate({
                  inputRange: [0, screenWidth],
                  outputRange: [-screenWidth * 0.1, screenWidth * 0.35], // Move with swipe, ending further right
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <CommonText size="large" weight="bold" style={styles.laterText}>
          Later
        </CommonText>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 80,
    zIndex: 100,
  },
  childContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  buttonContainer: {
    marginLeft: 16,
  },
  addButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  laterTextContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "flex-start", // Align to the left to appear from behind
    paddingLeft: 30, // Increased indent
    zIndex: -1, // Behind the main swiping banner
  },
  laterText: {
    color: "white", // Assuming red background means white text would be visible
  },
});
