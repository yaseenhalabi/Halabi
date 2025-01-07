import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

import CommonText from "../CommonText";
import Typewriter from "react-native-typewriter";

type WalkthroughPageProps = {
  stage: number;
  onComplete: () => void;
};

export default function WalkthroughPage({ stage, onComplete }: WalkthroughPageProps) {
  const insets = useSafeAreaInsets();
  const windowHeight = Dimensions.get("window").height;

  // Sample captions for demonstration
  const captions = [
    "Welcome to Halabi!",
    "You can add contacts and more using these buttons",
    "These are your contacts, you can view or edit them by tapping on them",
    "Here you can add a contact's name, tags, and notes. Highly recommended!",
    "The birthday field is great for remembering birthdays",
    "Edit the phone number",
    "Edit the email",
    "Edit the address",
    "This is the tags page, here you can add, edit, or delete tags",
    "These are your tags, you can view or edit them by tapping on them",
    "Here you can edit the name of the tag, as well as see the contacts that have this tag",
    "Thats all there is to it, enjoy!",
  ];

  const [caption, setCaption] = useState(captions[stage - 1]);
  useEffect(() => {
    setCaption(captions[stage - 1]);
  }, [stage]);

  // Using Reanimated shared values for top & height of the “transparent hole”
  const highlightedContainerTop = useSharedValue(0);
  const highlightedContainerHeight = useSharedValue(50);

  // Animate them based on the stage:
  useEffect(() => {
    switch (stage) {
      case 2: // add contact
        highlightedContainerTop.value = withTiming(90, { duration: 500 });
        highlightedContainerHeight.value = withTiming(80, { duration: 500 });
        break;
      case 3: // your contacts
        highlightedContainerTop.value = withTiming(150, { duration: 500 });
        highlightedContainerHeight.value = withTiming(530, { duration: 500 });
        break;
      case 4: // edit contact
        highlightedContainerTop.value = withTiming(50, { duration: 500 });
        highlightedContainerHeight.value = withTiming(200, { duration: 500 });
        break;
      case 5: // edit birthday
        highlightedContainerTop.value = withTiming(245, { duration: 500 });
        highlightedContainerHeight.value = withTiming(75, { duration: 500 });
        break;
      case 6: // edit phone number
        highlightedContainerTop.value = withTiming(315, { duration: 500 });
        break;
      case 7: // edit email
        highlightedContainerTop.value = withTiming(390, { duration: 500 });
        break;
      case 8: // edit address
        highlightedContainerTop.value = withTiming(465, { duration: 500 });
        break;
      case 9: // tags page
        highlightedContainerTop.value = withTiming(10, { duration: 500 });
        highlightedContainerHeight.value = withTiming(150, { duration: 500 });
        break;
      case 10: // tags
        highlightedContainerTop.value = withTiming(160, { duration: 500 });
        highlightedContainerHeight.value = withTiming(530, { duration: 500 });
        break;
      case 11: // tag
        highlightedContainerTop.value = withTiming(10, { duration: 500 });
        highlightedContainerHeight.value = withTiming(450, { duration: 500 });
        break;
      case 12: // my contacts
        highlightedContainerTop.value = withTiming(-100, { duration: 500 });
        highlightedContainerHeight.value = withTiming(1200, { duration: 500 });
        break;
      default:
        highlightedContainerTop.value = withTiming(0, { duration: 500 });
        highlightedContainerHeight.value = withTiming(50, { duration: 500 });
        break;
    }
  }, [stage]);

  /**
   * Overlays:
   *  - top overlay starts at top=0, ends at [highlightedContainerTop + insets.top]
   *  - bottom overlay starts at [highlightedContainerTop + highlightedContainerHeight + insets.top]
   *  - Because the container is absolute, we also subtract insets.bottom from the height below the cutout
   */

  // Animated style for the top overlay
  const topOverlayStyle = useAnimatedStyle(() => {
    return {
      top: 0,
      height: highlightedContainerTop.value + insets.top,
    };
  });

  // Animated style for the bottom overlay
  const bottomOverlayStyle = useAnimatedStyle(() => {
    // Where the transparent hole ends
    const holeBottom = highlightedContainerTop.value + highlightedContainerHeight.value + insets.top;
    return {
      top: holeBottom,
      // Subtract insets.bottom to ensure it covers just to the safe area bottom
      height: windowHeight - holeBottom,
    };
  });

  const [isCooldown, setIsCooldown] = useState(false);

  const handlePress = () => {
    if (!isCooldown) {
      onComplete();
      setIsCooldown(true);
      setTimeout(() => setIsCooldown(false), 500);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <SafeAreaView style={styles.container}>
        {/* Top dark overlay */}
        <Animated.View style={[styles.overlay, topOverlayStyle]} />

        {/* Bottom dark overlay */}
        <Animated.View style={[styles.overlay, bottomOverlayStyle]} />

        {/* Captions or other UI elements */}
        <View style={styles.captionsContainer}>
          <CommonText style={styles.captionText} weight="medium" size="large">
            <Typewriter typing={1} maxDelay={10} minDelay={10}>
              {caption}
            </Typewriter>
          </CommonText>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    /**
     * Position absolute so it can float above the entire screen.
     * Still uses SafeAreaView to respect top/bottom insets for other children,
     * but the overlays themselves add insets manually.
     */
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  /**
   * Two overlays for the "darkening" effect.
   * The region between them is left transparent (the "hole").
   */
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 2,
  },
  captionsContainer: {
    position: "absolute",
    bottom: "15%",
    maxWidth: "80%",
    zIndex: 3,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 8,
  },
  captionText: {
    color: "white",
  },
});
