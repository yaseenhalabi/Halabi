import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import CommonText from '../components/CommonText';
import HalabiBanner from '../components/HalabiBanner';
import getTheme from '../utils/GetTheme';
import { setTutorialStep } from '../redux/tutorialSlice';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

export default function Welcome() {
  const theme = getTheme();
  const dispatch = useDispatch();

  const handleStartTutorial = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    dispatch(setTutorialStep(1));
    router.replace("/(app)");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <CommonText size="large" weight="bold" style={styles.welcomeText}>
          Welcome to
        </CommonText>
        
        <View style={styles.bannerContainer}>
          <HalabiBanner />
        </View>
        
        <TouchableOpacity onPress={handleStartTutorial} style={styles.buttonContainer}>
          <View style={[styles.button, { backgroundColor: theme.backgroundTertiary }]}>
            <CommonText
              size="large"
              weight="medium"
            >
              Get Started
            </CommonText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  welcomeText: {
    textAlign: 'center',
    marginBottom: 40,
  },
  bannerContainer: {
    marginBottom: 60,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 