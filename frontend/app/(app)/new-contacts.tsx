import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useSelector, useDispatch } from "react-redux";
import CommonText from "../../components/CommonText";
import PageContainer from "../../components/PageContainer";
import getTheme from "../../utils/GetTheme";
import { router, useLocalSearchParams } from "expo-router";
import { getAppleContactById } from "../../utils/helpers";
import { Contact, Tag } from "../../utils/types";
import { addContact } from "../../redux/contactsSlice";
import {
  setAwaitingReviewIds,
  setAwaitingBannerIds,
  addReviewedId,
  finishReviewingId,
  skipAllContacts,
} from "../../redux/newContactReviewSlice";
import { addTag } from "../../redux/tagsSlice";
import { v4 as uuidv4 } from "uuid";
import ProfileTag from "../../components/profile screen/ProfileTag";
import { getContactsWithTag } from "../../utils/helpers";

export default function NewContacts() {
  const theme = getTheme();
  const dispatch = useDispatch();
  const { openedfrombanner } = useLocalSearchParams();

  const newContactReview = useSelector((state: any) => state.newContactReview);
  const allTags = useSelector((state: any) => state.tags);
  const contacts = useSelector((state: any) => state.contacts);

  const [currentContactIndex, setCurrentContactIndex] = useState(0);
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);
  const [numberOfContacts, setNumberOfContacts] = useState(0);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  const searchTagRef = useRef<any>(null);

  // Determine which contact IDs to use based on the openedfrombanner parameter
  const contactIds =
    openedfrombanner === "true"
      ? newContactReview.awaitingBannerIds
      : newContactReview.awaitingReviewIds;

  const isLastContact = contactIds.length <= 1; // If there's 1 or 0 contacts left, this is the last one

  useEffect(() => {
    if (contactIds.length > 0) {
      loadCurrentContact();
    }
  }, [contactIds]);

  useEffect(() => {
    if (contactIds.length > 0 && currentContactIndex < contactIds.length) {
      loadCurrentContact();
    }
  }, [currentContactIndex]);

  useEffect(() => {
    // Auto-focus keyboard when modal opens
    setNumberOfContacts(contactIds.length);
    setTimeout(() => {
      if (searchTagRef.current) {
        searchTagRef.current.focus();
      }
    }, 500);
  }, []);

  const loadCurrentContact = async () => {
    // Check if currentContactIndex is within bounds
    if (currentContactIndex >= contactIds.length) {
      // If we've gone past the available contacts, close the modal
      router.back();
      return;
    }

    const contactId = contactIds[currentContactIndex];
    const contact = await getAppleContactById(contactId);
    if (contact) {
      setCurrentContact(contact);
      setSelectedTagIds([]);
      setSearchText("");
    }
  };

  const handleSkip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (currentContact) {
      // Use finishReviewingId to handle all the state updates
      dispatch(finishReviewingId(currentContact.id));
    }

    if (isLastContact) {
      // Last contact - close modal
      router.back();
    }
    // Note: We don't increment currentContactIndex because when we remove
    // a contact from the array, the next contact moves to the current index
  };

  const handleAdd = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (currentContact) {
      // Create the contact with selected tags
      const contactWithTags = {
        ...currentContact,
        tags: selectedTagIds,
      };

      dispatch(addContact(contactWithTags));

      // Add the contact ID to reviewedIds
      dispatch(addReviewedId(currentContact.id));

      // Remove from the appropriate array
      if (openedfrombanner === "true") {
        const updatedBannerIds = newContactReview.awaitingBannerIds.filter(
          (id: string) => id !== currentContact.id
        );
        dispatch(setAwaitingBannerIds(updatedBannerIds));
      } else {
        const updatedReviewIds = newContactReview.awaitingReviewIds.filter(
          (id: string) => id !== currentContact.id
        );
        dispatch(setAwaitingReviewIds(updatedReviewIds));
      }

      if (isLastContact) {
        // Last contact - close modal
        router.back();
      }
      // Note: We don't increment currentContactIndex because when we remove
      // a contact from the array, the next contact moves to the current index
    }
  };

  const handleSkipAll = () => {
    Alert.alert(
      "Skip All Contacts",
      "Are you sure you want to skip all remaining contacts? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Skip All",
          style: "destructive",
          onPress: () => {
            dispatch(skipAllContacts());
            router.back();
          },
        },
      ]
    );
  };

  const addTagToContact = (tagId: string) => {
    if (!selectedTagIds.includes(tagId)) {
      setSelectedTagIds([...selectedTagIds, tagId]);
    }
    setSearchText("");
  };

  const removeTagFromContact = (tagId: string) => {
    setSelectedTagIds(selectedTagIds.filter((id) => id !== tagId));
  };

  const createNewTag = () => {
    if (searchText.length === 0) return;

    const existingTag = allTags.find(
      (tag: Tag) => tag.name.toLowerCase() === searchText.toLowerCase()
    );
    if (existingTag) {
      // If tag exists and is not already selected, add it
      if (!selectedTagIds.includes(existingTag.id)) {
        addTagToContact(existingTag.id);
      }
      // If tag exists and is already selected, do nothing (don't create duplicate)
      return;
    }

    // Only create new tag if no existing tag with this name exists
    const newTag = { id: uuidv4(), name: searchText };
    dispatch(addTag(newTag));
    addTagToContact(newTag.id);
  };

  const addFirstTagToContact = () => {
    if (!searchText) return;
    if (filteredTags.length === 0) {
      createNewTag();
      return;
    }
    addTagToContact(filteredTags[0].id);
  };

  let filteredTags = allTags.filter(
    (tag: Tag) =>
      tag.name.toLowerCase().includes(searchText.toLowerCase()) &&
      !selectedTagIds.includes(tag.id)
  );

  filteredTags.sort((a: Tag, b: Tag) => {
    const aContactCount = getContactsWithTag(a, contacts).length;
    const bContactCount = getContactsWithTag(b, contacts).length;
    return bContactCount - aContactCount;
  });
  filteredTags = filteredTags.slice(0, 6);

  if (!currentContact) {
    return (
      <PageContainer style={styles.container}>
        <View style={{ ...styles.line, backgroundColor: theme.text.semi }} />
        <View style={styles.content}>
          <CommonText size="medium" weight="medium" style={styles.contactName}>
            Contact Error
          </CommonText>
          <CommonText size="small" color="semi" style={styles.errorText}>
            ERROR: Could not load contact. Common causes are: The iOS contact is
            no longer in your contacts list, or the iOS contact is taking too
            long to load.
          </CommonText>
        </View>

        {/* Bottom buttons for error case */}
        <View style={styles.bottomContainer}>
          {/* Progress indicator */}
          <TouchableOpacity
            style={styles.skipAllButton}
            onPress={handleSkipAll}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <CommonText size="small" color="muted">
              Skip All
            </CommonText>
          </TouchableOpacity>
          <CommonText
            size="small"
            color="semi-full"
            style={styles.progressText}
          >
            {numberOfContacts - contactIds.length + 1} of {numberOfContacts}
          </CommonText>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: theme.backgroundSecondary },
              ]}
              onPress={handleSkip}
            >
              <CommonText size="medium" weight="medium">
                {isLastContact ? "Skip" : "Skip"}
              </CommonText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: theme.backgroundSecondary, opacity: 0.5 },
              ]}
              disabled={true}
            >
              <CommonText size="medium" weight="medium" color="semi">
                Add
              </CommonText>
            </TouchableOpacity>
          </View>
        </View>
      </PageContainer>
    );
  }

  const selectedTags = allTags.filter((tag: Tag) =>
    selectedTagIds.includes(tag.id)
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardContainer}
    >
      <PageContainer style={styles.container}>
        <View style={{ ...styles.line, backgroundColor: theme.text.semi }} />
        <View style={styles.content}>
          {/* Contact name */}
          <CommonText size="large" weight="medium" style={styles.contactName}>
            {currentContact.name}
          </CommonText>

          {/* Selected tags */}
          <View style={styles.selectedTagsContainer}>
            {selectedTags.map((tag: Tag) => (
              <ProfileTag
                key={tag.id}
                tagId={tag.id}
                onPress={() => removeTagFromContact(tag.id)}
                contactId={currentContact.id}
                canDelete={true}
              />
            ))}
          </View>

          {/* Tag input */}
          <View style={styles.tagInputContainer}>
            <View
              style={[styles.addTagContainer, { borderColor: theme.button }]}
            >
              <TextInput
                ref={searchTagRef}
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search for a tag"
                placeholderTextColor={theme.text.muted}
                autoFocus={true}
                style={{ ...styles.input, color: theme.text.full }}
                returnKeyType="done"
                onSubmitEditing={addFirstTagToContact}
                keyboardAppearance={theme.name === "dark" ? "dark" : "light"}
                autoCapitalize="words"
                submitBehavior="submit"
              />

              {/* Tag suggestions */}
              <ScrollView
                keyboardShouldPersistTaps="handled"
                style={styles.suggestionsList}
                contentContainerStyle={styles.suggestionsContainer}
              >
                {searchText.length > 0 && (
                  <TouchableOpacity hitSlop={10} onPress={createNewTag}>
                    <CommonText weight="regular" size="small">
                      + New tag "{searchText}"
                    </CommonText>
                  </TouchableOpacity>
                )}
                {filteredTags.map((tag: Tag) => {
                  const isFirstItem =
                    filteredTags.length > 0 &&
                    tag.id === filteredTags[0].id &&
                    searchText.length > 0;
                  return (
                    <TouchableOpacity
                      key={tag.id}
                      hitSlop={10}
                      onPress={() => addTagToContact(tag.id)}
                    >
                      <View
                        style={[
                          styles.suggestionTag,
                          {
                            backgroundColor: theme.smallTag,
                            borderWidth: isFirstItem ? 0.5 : 0,
                            borderColor: "grey",
                          },
                        ]}
                      >
                        <CommonText weight="regular" size="small">
                          {tag.name}
                        </CommonText>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>

        {/* Bottom buttons - Always visible above keyboard */}
        <View style={styles.bottomContainer}>
          {/* Progress indicator */}
          <TouchableOpacity
            style={styles.skipAllButton}
            onPress={handleSkipAll}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <CommonText size="small" color="muted">
              Skip All
            </CommonText>
          </TouchableOpacity>
          <CommonText
            size="small"
            color="semi-full"
            style={styles.progressText}
          >
            {numberOfContacts - contactIds.length + 1} of {numberOfContacts}
          </CommonText>

          {/* Skip All button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: theme.backgroundSecondary },
              ]}
              onPress={handleSkip}
            >
              <CommonText size="medium" weight="medium">
                {isLastContact ? "Skip" : "Skip"}
              </CommonText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: theme.backgroundSecondary },
              ]}
              onPress={handleAdd}
            >
              <CommonText size="medium" weight="medium">
                Add
              </CommonText>
            </TouchableOpacity>
          </View>
        </View>
      </PageContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    width: "100%",
  },
  contactName: {
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 28,
  },
  progressText: {
    textAlign: "center",
  },
  selectedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  tagInputContainer: {
    marginBottom: 20,
  },
  addTagContainer: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  input: {
    paddingVertical: 10,
    fontSize: 16,
    width: "100%",
  },
  suggestionsList: {
    maxHeight: 200,
    marginTop: 10,
  },
  suggestionsContainer: {
    gap: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  suggestionTag: {
    borderRadius: 30,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    alignSelf: "flex-start",
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    backgroundColor: "transparent",
    gap: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  button: {
    width: "48%", // Each button takes exactly 48% (with 4% gap between them)
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  line: {
    marginTop: 10,
    height: 2,
    opacity: 0.5,
    borderRadius: 3,
    width: "10%",
  },
  skipAllButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    textAlign: "center",
    marginBottom: 20,
  },
});
