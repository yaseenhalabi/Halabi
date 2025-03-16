import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Tag } from "../../utils/types";
import CommonText from "../CommonText";
import { getContactById, getContactsWithTag } from "../../utils/helpers";
import { router } from "expo-router";
import { useState, useEffect, useRef } from "react";
import getTheme from "../../utils/GetTheme";
import { addTagToContact } from "../../redux/contactsSlice";
import cancelIcon from "../../assets/images/cancel-icon-white.png";
import blackCancelIcon from "../../assets/images/cancel-icon-black.png";
import { addTag } from "../../redux/tagsSlice";
import { v4 as uuidv4 } from "uuid";
import ProfileTag from "./ProfileTag";

type ProfileTagsProps = {
  tagIds: string[];
  contactId: string;
  setOverscrollHandler?: (handler: () => void) => void; // callback prop
};

export default function ProfileTags({
  tagIds,
  contactId,
  setOverscrollHandler,
}: ProfileTagsProps) {
  const theme = getTheme();
  const allTags = useSelector((state: any) => state.tags);
  const tags = allTags.filter((tag: Tag) => tagIds.includes(tag.id));
  const dispatch = useDispatch();
  const [addingTag, setAddingTag] = useState(false);
  const [searchText, setSearchText] = useState("");
  const searchTagRef = useRef<any>(null);
  const onTagPress = (tagId: string) => {
    router.push({ pathname: "/my-tags/tag", params: { id: tagId } });
  };

  const openAddingTag = () => {
    setAddingTag(true);
    if (searchTagRef.current) searchTagRef.current.focus();
  };

  const closeAddingTag = () => {
    setAddingTag(false);
    setSearchText("");
  };

  useEffect(() => {
    if (setOverscrollHandler) {
      setOverscrollHandler(() => {
        openAddingTag();
      });
    }
  }, [setOverscrollHandler]);

  const tagComponents = tags.map((tag: Tag) => (
    <ProfileTag
      key={tag.id}
      tagId={tag.id}
      onPress={() => onTagPress(tag.id)}
      contactId={contactId}
      canDelete
    />
  ));

  const contacts = useSelector((state: any) => state.contacts);

  let filteredTags = allTags.filter(
    (tag: Tag) =>
      tag.name.toLowerCase().includes(searchText.toLowerCase()) &&
      !tagIds.includes(tag.id)
  );

  filteredTags.sort((a: Tag, b: Tag) => {
    const aContactCount = getContactsWithTag(a, contacts).length;
    const bContactCount = getContactsWithTag(b, contacts).length;
    return bContactCount - aContactCount;
  });
  filteredTags = filteredTags.slice(0, 10);

  const addTagToContact_ = (tagId: string) => {
    dispatch(addTagToContact({ contactId, tagId }));
    setSearchText("");
  };

  const createNewTag = () => {
    if (searchText.length === 0) return;
    const existingTag = tags.find(
      (tag: any) => tag.name.toLowerCase() === searchText.toLowerCase()
    );
    if (existingTag && !tagIds.includes(existingTag.id)) {
      addTagToContact_(existingTag.id);
      return;
    }
    const newTag = { id: uuidv4(), name: searchText };
    dispatch(addTag(newTag));
    addTagToContact_(newTag.id);
  };
  const addFirstTagToContact = () => {
    if (!searchText) return;
    if (filteredTags.length == 0) {
      createNewTag();
      return;
    }
    dispatch(addTagToContact({ contactId, tagId: filteredTags[0].id }));
    setSearchText("");
  };
  return (
    <View style={styles.container}>
      {tagComponents}
      {addingTag ? (
        <View style={[styles.addTagContainer, { borderColor: theme.button }]}>
          <TouchableOpacity hitSlop={5} onPress={closeAddingTag}>
            <Image
              source={theme.name === "dark" ? cancelIcon : blackCancelIcon}
              style={styles.cancelIcon}
            />
          </TouchableOpacity>
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
            keyboardAppearance="dark"
            autoCapitalize="words"
            submitBehavior="submit"
          />
          <ListOfProfileTags
            filteredTags={filteredTags}
            searchText={searchText}
            contactId={contactId}
            closeAddingTag={closeAddingTag}
            setSearchText={setSearchText}
            createNewTag={createNewTag}
            addTagToContact_={addTagToContact_}
          />
        </View>
      ) : (
        <TouchableOpacity
          style={{ paddingVertical: 5 }}
          hitSlop={10}
          onPress={openAddingTag}
        >
          <CommonText weight="regular" size="small">
            + Add Tag
          </CommonText>
        </TouchableOpacity>
      )}
    </View>
  );
}

type ListOfProfileTagsProps = {
  filteredTags: Tag[];
  searchText: string;
  contactId: string;
  closeAddingTag: () => void;
  createNewTag: () => void;
  addTagToContact_: (tagId: string) => void;
  setSearchText: (text: string) => void;
};

function ListOfProfileTags({
  filteredTags,
  searchText,
  contactId,
  addTagToContact_,
  createNewTag,
}: ListOfProfileTagsProps) {
  return (
    <View style={{ width: "100%", position: "relative" }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        style={{ paddingVertical: 5 }}
      >
        {searchText.length === 0 && filteredTags.length === 0 && (
          <CommonText weight="light" size="small" color="muted">
            No tags found
          </CommonText>
        )}
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
            <ProfileTag
              key={tag.id}
              tagId={tag.id}
              onPress={() => addTagToContact_(tag.id)}
              isHighlighted={filteredTags.length !== 0 && isFirstItem}
              contactId={contactId}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    gap: 8,
  },
  input: {
    width: "100%",
    paddingVertical: 10,
  },
  addTagContainer: {
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  cancelIcon: {
    width: 20,
    height: 20,
    position: "absolute",
    right: -25,
    top: -20,
  },
});
