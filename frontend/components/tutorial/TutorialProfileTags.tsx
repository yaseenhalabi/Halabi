import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useSelector as useSelectorRedux, useDispatch } from 'react-redux';
import CommonText from '../CommonText';
import getTheme from '../../utils/GetTheme';
import { setTutorialStep, setTutorialContact } from '../../redux/tutorialSlice';
import * as Haptics from 'expo-haptics';

export default function TutorialProfileTags() {
  const theme = getTheme();
  const dispatch = useDispatch();
  const tutorial = useSelectorRedux((state: any) => state.tutorial);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [tutorialTags, setTutorialTags] = useState<string[]>([]);
  const searchTagRef = useRef<TextInput>(null);
  const canAddTag = tutorial.currentStep >= 4;
  useEffect(() => {
    if (canAddTag) {
      setIsAddingTag(true);
    }
  }, [tutorial]);


  const openAddingTag = () => {
    if (!canAddTag) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsAddingTag(true);
    if (searchTagRef.current) {
      searchTagRef.current.focus();
    }
  };

  const addTag = () => {
    if (searchText.trim().length === 0) return;
    
    // Store the tag name before clearing searchText
    const tagToAdd = searchText.trim();
    
    // Haptic feedback first
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    const newTags = [...tutorialTags, searchText.trim()];
    setTutorialTags(newTags);
    setSearchText('');
    
    // Update tutorial state
    dispatch(setTutorialContact({
      name: tutorial.tutorialContact?.name || '',
      tags: newTags,
    }));
    
    // Use setTimeout to ensure focus happens after state updates
    setTimeout(() => {
      if (searchTagRef.current) {
        searchTagRef.current.focus();
      }
      
      // Progress tutorial if this is the first tag (after focus is set)
      if (tutorialTags.length === 0 && tutorial.currentStep === 4) {
        setTimeout(() => {
          dispatch(setTutorialStep(5));
        }, 300);
      }
    }, 50);
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tutorialTags.filter(tag => tag !== tagToRemove);
    setTutorialTags(newTags);
    
    dispatch(setTutorialContact({
      name: tutorial.tutorialContact?.name || '',
      tags: newTags,
    }));
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={styles.container}>
      {/* Display existing tags */}
      <View style={styles.tagsContainer}>
        {tutorialTags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => removeTag(tag)}
            delayLongPress={500}
            style={[styles.tag, { backgroundColor: theme.smallTag }]}
          >
            <CommonText size="small" weight="regular">
              {tag}
            </CommonText>
          </TouchableOpacity>
        ))}
      </View>

      {/* Add tag interface */}
      {isAddingTag ? (
        <View style={[styles.addTagContainer, { borderColor: theme.button }]}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            scrollEnabled={false}
            contentContainerStyle={styles.inputScrollContent}
          >
            <TextInput
              ref={searchTagRef}
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Enter tag name..."
              placeholderTextColor={theme.text.muted}
              autoFocus={true}
              style={[styles.input, { color: theme.text.full }]}
              returnKeyType="done"
              onSubmitEditing={addTag}
              keyboardAppearance={theme.name === "dark" ? "dark" : "light"}
              autoCapitalize="words"
            />
            
            {searchText.length > 0 && (
              <TouchableOpacity onPress={addTag} style={styles.addButton}>
                <CommonText size="small" weight="medium" color="full">
                  + Add "{searchText}"
                </CommonText>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.addTagButton, !canAddTag && { opacity: 0.3 }]}
          hitSlop={10}
          onPress={openAddingTag}
          disabled={!canAddTag}
        >
          <CommonText weight="regular" size="small" color="full">
            + Add Tag
          </CommonText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  inputScrollContent: {
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  tag: {
    borderRadius: 30,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  addTagContainer: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: -8,
    top: -7,
    zIndex: 1,
  },
  input: {
    paddingVertical: 10,
    fontSize: 16,
    width: '100%',
  },
  addButton: {
    paddingVertical: 5,
    marginTop: 5,
  },
  addTagButton: {
    paddingVertical: 5,
  },
}); 