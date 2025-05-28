import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PageContainer from '../components/PageContainer';
import TutorialOverlay from '../components/tutorial/TutorialOverlay';
import TutorialContactScreen from '../components/tutorial/TutorialContactScreen';
import TutorialAddContactInput from '../components/tutorial/TutorialAddContactInput';
import AddContactButton from '../components/AddContactButton';
import getTheme from '../utils/GetTheme';
import { setTutorialStep } from '../redux/tutorialSlice';

export default function Tutorial() {
  const theme = getTheme();
  const dispatch = useDispatch();
  const tutorial = useSelector((state: any) => state.tutorial);
  const [showAddInput, setShowAddInput] = useState(false);

  const { currentStep, tutorialContact } = tutorial;

  const handleAddContactPress = () => {
    if (currentStep === 1) {
      setShowAddInput(true);
      dispatch(setTutorialStep(2));
    }
  };

  const handleEndEditing = () => {
    setShowAddInput(false);
  };

  const shouldShowContactScreen = currentStep >= 3 && tutorialContact;
  const shouldShowAddButton = currentStep === 1 || (currentStep === 2 && !showAddInput);

  return (
    <TutorialOverlay>
      <PageContainer style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Add Contact Button - only visible during step 1 */}
        {shouldShowAddButton && (
          <AddContactButton
            onPress={handleAddContactPress}
            disabled={currentStep !== 1}
          />
        )}

        {/* Add Contact Input - only visible during step 2 */}
        {showAddInput && currentStep === 2 && (
          <View style={styles.inputContainer}>
            <TutorialAddContactInput endEditing={handleEndEditing} />
          </View>
        )}

        {/* Minimal background content */}
        <View style={styles.backgroundContent}>
          {currentStep === 1 && (
            <View style={styles.emptyState}>
              {/* Empty state - just the add button will be visible */}
            </View>
          )}
        </View>

        {/* Tutorial Contact Screen - slides in from right */}
        {shouldShowContactScreen && (
          <TutorialContactScreen
            contactName={tutorialContact.name}
            isVisible={shouldShowContactScreen}
          />
        )}
      </PageContainer>
    </TutorialOverlay>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  inputContainer: {
    position: 'absolute',
    top: 150,
    left: 20,
    right: 20,
    zIndex: 100,
  },
  backgroundContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    width: '100%',
  },
}); 