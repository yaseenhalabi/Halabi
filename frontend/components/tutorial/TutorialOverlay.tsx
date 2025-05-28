import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CommonText from "../CommonText";
import {
  setTutorialStep,
  setTutorialCompleted,
} from "../../redux/tutorialSlice";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

type TutorialOverlayProps = {
  children: React.ReactNode;
};

export default function TutorialOverlay({ children }: TutorialOverlayProps) {
  const dispatch = useDispatch();
  const tutorial = useSelector((state: any) => state.tutorial);
  const { currentStep, isCompleted } = tutorial;

  const handleNextStep = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    dispatch(setTutorialStep(currentStep + 1));
  };

  const handleFinishTutorial = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Create the actual contact and tags from tutorial data
    if (tutorial.tutorialContact) {
      const newContact = {
        id: require("uuid").v4(),
        name: tutorial.tutorialContact.name,
        phone: { number: "", countryCode: "1", id: require("uuid").v4() },
        email: "",
        tags: [],
        birthday: { month: "", day: "" },
        photo: { url: "", blurHash: "" },
        notes: "",
        createdAt: new Date().toISOString(),
      };

      // Create tags and add them to the contact
      const tagIds: string[] = [];
      tutorial.tutorialContact.tags.forEach((tagName: string) => {
        const tagId = require("uuid").v4();
        // Import the actions dynamically to avoid circular imports
        const { addTag } = require("../../redux/tagsSlice");
        dispatch(addTag({ id: tagId, name: tagName }));
        tagIds.push(tagId);
      });

      // Add contact with tags
      const contactWithTags = { ...newContact, tags: tagIds };
      const { addContact } = require("../../redux/contactsSlice");
      dispatch(addContact(contactWithTags));
    }

    dispatch(setTutorialCompleted(true));
  };

  // Determine if overlay should be visible
  const overlayVisible = !(isCompleted || currentStep === 0);

  // Helper to get tutorial content for the current step
  const getTutorialContent = () => {
    if (!overlayVisible) return null;
    switch (currentStep) {
      case 1:
        return {
          text: "Tap the + button to create your first contact",
          position: "top" as const,
          showNext: false,
          isFinish: false,
        };
      case 2:
        return {
          text: "Type your full name into the text field",
          position: "bottom" as const,
          showNext: false,
          isFinish: false,
        };
      case 3:
        return {
          text: "Great! Now swipe down on the screen to add tags to your contact",
          position: "bottom" as const,
          showNext: false,
          isFinish: false,
        };
      case 4:
        return {
          text: "Perfect! Now try adding a tag that describes you, like the college you went to, or the city you live in",
          position: "bottom" as const,
          showNext: tutorial.tutorialContact?.tags?.length > 0,
          isFinish: true,
        };
      case 5:
        return {
          text: "Congrats on the first tag! Feel free to add some more. You have completed the tutorial. ",
          position: "bottom" as const,
          showNext: true,
          isFinish: true,
        };
      default:
        return null;
    }
  };

  const tutorialContent = getTutorialContent();

  const PopupComponent =
    tutorialContent?.position === "bottom"
      ? KeyboardAvoidingView
      : KeyboardAvoidingView;
  const popupProps =
    tutorialContent?.position === "bottom"
      ? {
          behavior: (Platform.OS === "ios" ? "padding" : "height") as
            | "padding"
            | "height",
          keyboardVerticalOffset: 100,
        }
      : ({ behavior: undefined } as any);

  return (
    <View style={styles.container}>
      {children}

      {overlayVisible && tutorialContent && (
        <PopupComponent
          style={[
            styles.popup,
            tutorialContent.position === "top"
              ? styles.topPopup
              : styles.bottomPopup,
          ]}
          {...popupProps}
        >
          <LinearGradient
            colors={["#4A90E2", "#8E44AD"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBackground}
          >
            <View style={styles.popupContent}>
              <CommonText size="small" weight="medium" style={styles.stepText}>
                Step {currentStep} of 5
              </CommonText>
              <CommonText
                size="medium"
                weight="regular"
                style={styles.instructionText}
              >
                {tutorialContent.text}
              </CommonText>

              {tutorialContent.showNext && (
                <TouchableOpacity
                  onPress={
                    tutorialContent.isFinish
                      ? handleFinishTutorial
                      : handleNextStep
                  }
                  style={styles.nextButton}
                >
                  <View
                    style={[
                      styles.nextButtonContent,
                      { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                    ]}
                  >
                    <CommonText
                      size="medium"
                      weight="medium"
                      style={{ color: "white" }}
                    >
                      {tutorialContent.isFinish ? "Finish Tutorial" : "Next"}
                    </CommonText>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </LinearGradient>
        </PopupComponent>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  popup: {
    position: "absolute",
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  topPopup: {
    top: 100,
  },
  bottomPopup: {
    bottom: 40,
  },
  gradientBackground: {
    borderRadius: 12,
    padding: 16,
  },
  popupContent: {
    alignItems: "center",
    gap: 8,
  },
  stepText: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  instructionText: {
    color: "white",
    textAlign: "center",
    lineHeight: 20,
  },
  nextButton: {
    marginTop: 8,
  },
  nextButtonContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
});
