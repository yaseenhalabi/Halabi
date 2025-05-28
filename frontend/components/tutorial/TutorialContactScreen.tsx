import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CommonText from '../CommonText';
import getTheme from '../../utils/GetTheme';
import TutorialProfileTags from './TutorialProfileTags';
import { setTutorialStep } from '../../redux/tutorialSlice';
import * as Haptics from 'expo-haptics';

type TutorialContactScreenProps = {
  contactName: string;
  isVisible: boolean;
};

export default function TutorialContactScreen({ contactName, isVisible }: TutorialContactScreenProps) {
  const theme = getTheme();
  const dispatch = useDispatch();
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const tutorial = useSelector((state: any) => state.tutorial);

  // Arrow animation for swipe instruction
  const arrowAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 8,
      }).start();
    } else {
      slideAnim.setValue(Dimensions.get('window').width);
    }
  }, [isVisible, slideAnim]);

  useEffect(() => {
    if (tutorial.currentStep === 3) {
      arrowAnim.setValue(0);
      fadeAnim.setValue(1);
      const loopAnim = Animated.loop(
        Animated.sequence([
          // Start position (up)
          Animated.parallel([
            Animated.timing(arrowAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ]),
          // Swipe down
          Animated.parallel([
            Animated.timing(arrowAnim, {
              toValue: 90,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 800,
              useNativeDriver: true,
            }),
          ]),
          // Reset to start position
          Animated.parallel([
            Animated.timing(arrowAnim, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ]),
          // Pause before repeating
          Animated.parallel([
            Animated.timing(arrowAnim, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
        ])
      );
      loopAnim.start();

      // Clean up on step change
      return () => {
        loopAnim.stop();
      };
    }
  }, [tutorial.currentStep, arrowAnim, fadeAnim]);

  const onScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (tutorial.currentStep === 3 && offsetY < -20) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      dispatch(setTutorialStep(4));
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <ScrollView
        style={styles.content}
        keyboardShouldPersistTaps="handled"
        onScrollEndDrag={onScrollEndDrag}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.nameContainer}>
          <CommonText size="large" weight="bold" style={styles.nameText}>
            {contactName}
          </CommonText>
        </View>
        
      
        <TutorialProfileTags />
        
      </ScrollView>

      {/* Overlay swipe instruction in center of screen */}
      {tutorial.currentStep === 3 && (
        <View style={styles.centerOverlay}>
          <Animated.View
            style={{
              transform: [{ translateY: arrowAnim }],
              opacity: fadeAnim,
            }}
          >
            <Text style={styles.centerSwipeEmoji}>👆</Text>
          </Animated.View>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  nameContainer: {
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
  },
  nameText: {
    textAlign: 'center',
  },

  centerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none', // Don't block touches
  },
  centerSwipeEmoji: {
    fontSize: 48,
    textAlign: 'center',
  },
  swipeInstructionContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  swipeEmoji: {
    fontSize: 24,
    textAlign: 'center',
  },
}); 