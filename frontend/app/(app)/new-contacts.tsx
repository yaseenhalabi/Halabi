import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CommonText from "../../components/CommonText";
import PageContainer from "../../components/PageContainer";
import getTheme from "../../utils/GetTheme";
import { router } from "expo-router";
import { getAppleContactById } from "../../utils/helpers";
import { Contact, Tag } from "../../utils/types";
import { addContact } from "../../redux/contactsSlice";
import { hideNewContactsBanner } from "../../redux/popupBannerSlice";
import { addTag } from "../../redux/tagsSlice";
import { v4 as uuidv4 } from "uuid";
import ProfileTag from "../../components/profile screen/ProfileTag";
import { getContactsWithTag } from "../../utils/helpers";

export default function NewContacts() {
  const theme = getTheme();
  const dispatch = useDispatch();

  const popupBanner = useSelector((state: any) => state.popupBanner);
  const allTags = useSelector((state: any) => state.tags);
  const contacts = useSelector((state: any) => state.contacts);

  const [currentContactIndex, setCurrentContactIndex] = useState(0);
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isAddingTag, setIsAddingTag] = useState(false);

  const searchTagRef = useRef<any>(null);

  const newContactIds = popupBanner.newContactIds;
  const isLastContact = currentContactIndex >= newContactIds.length - 1;

  useEffect(() => {
    if (
      newContactIds.length > 0 &&
      currentContactIndex < newContactIds.length
    ) {
      loadCurrentContact();
    }
  }, [currentContactIndex, newContactIds]);

  useEffect(() => {
    // Auto-focus keyboard when modal opens
    setTimeout(() => {
      setIsAddingTag(true);
      if (searchTagRef.current) {
        searchTagRef.current.focus();
      }
    }, 500);
  }, []);

  const loadCurrentContact = async () => {
    const contactId = newContactIds[currentContactIndex];
    const contact = await getAppleContactById(contactId);
    if (contact) {
      setCurrentContact(contact);
      setSelectedTagIds([]);
      setSearchText("");
    }
  };

  const handleSkip = () => {
    if (isLastContact) {
      // Last contact - close modal
      router.back();
    } else {
      // Skip - move to next contact
      setCurrentContactIndex(currentContactIndex + 1);
    }
  };

  const handleAdd = () => {
    if (currentContact) {
      // Create the contact with selected tags
      const contactWithTags = {
        ...currentContact,
        tags: selectedTagIds,
      };

      dispatch(addContact(contactWithTags));

      if (isLastContact) {
        // Last contact - close modal
        dispatch(hideNewContactsBanner());
        router.back();
      } else {
        // Move to next contact
        setCurrentContactIndex(currentContactIndex + 1);
      }
    }
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

    if (existingTag && !selectedTagIds.includes(existingTag.id)) {
      addTagToContact(existingTag.id);
      return;
    }

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
  filteredTags = filteredTags.slice(0, 10);

  if (!currentContact) {
    return (
      <PageContainer style={styles.container}>
        <CommonText size="small" color="error">
          ERROR: Could not load contact. Common causes are: The iOS contact is
          no longer in your contacts list, or the iOS contact is taking too long
          to load.
        </CommonText>
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
        <View style={styles.content}>
          {/* Contact name */}
          <CommonText size="large" weight="bold" style={styles.contactName}>
            {currentContact.name}
          </CommonText>

          {/* Progress indicator */}
          <CommonText size="small" color="semi" style={styles.progressText}>
            {currentContactIndex + 1} of {newContactIds.length}
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
            {isAddingTag ? (
              <View
                style={[styles.addTagContainer, { borderColor: theme.button }]}
              >
                <TouchableOpacity
                  hitSlop={5}
                  onPress={() => setIsAddingTag(false)}
                  style={styles.cancelTagButton}
                ></TouchableOpacity>
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
                      <CommonText
                        weight="regular"
                        size="small"
                        style={styles.suggestionItem}
                      >
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
            ) : (
              <TouchableOpacity
                style={styles.addTagButton}
                hitSlop={10}
                onPress={() => setIsAddingTag(true)}
              >
                <CommonText weight="regular" size="small">
                  + Add Tag
                </CommonText>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Bottom buttons - Always visible above keyboard */}
        <View style={styles.bottomContainer}>
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
    paddingTop: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    width: "100%",
  },
  contactName: {
    textAlign: "center",
    marginBottom: 10,
  },
  progressText: {
    textAlign: "center",
  },
  selectedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
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
  cancelTagButton: {
    position: "absolute",
    right: -25,
    zIndex: 1,
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
  },
  suggestionItem: {
    paddingVertical: 8,
  },
  suggestionTag: {
    borderRadius: 30,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 4,
    alignSelf: "flex-start",
  },
  addTagButton: {
    paddingVertical: 5,
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
});
