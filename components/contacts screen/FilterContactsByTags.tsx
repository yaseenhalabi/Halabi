import { View, StyleSheet, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Tag } from "../../utils/types";
import { setSelectedFilterTags } from "../../redux/filterContactsSlice";
import ProfileTag from "../profile screen/ProfileTag";
import { useMemo, useState } from "react";
import getTheme from "../../utils/GetTheme";

export default function FilterContactsByTags() {
  const dispatch = useDispatch();
  const theme = getTheme();
  const allTags = useSelector((state: any) => state.tags);
  const selectedTagIds = useSelector(
    (state: any) => state.filter.selectedTagIds
  );
  const [searchText, setSearchText] = useState("");

  const toggleTag = (tagId: string) => {
    const newSelectedTags = selectedTagIds.includes(tagId)
      ? selectedTagIds.filter((id: string) => id !== tagId)
      : [...selectedTagIds, tagId];
    dispatch(setSelectedFilterTags(newSelectedTags));
    setSearchText("");
  };

  const contacts = useSelector((state: any) => state.contacts);

  // Compute tag usage counts
  const tagUsageCount = useMemo(() => {
    const countMap: Record<string, number> = {};
    contacts.forEach((contact: any) => {
      contact.tags.forEach((tagId: string) => {
        countMap[tagId] = (countMap[tagId] || 0) + 1;
      });
    });
    return countMap;
  }, [contacts]);

  // Filter and sort tags by usage
  const filteredTags = allTags
    .filter(
      (tag: Tag) =>
        tag.name.toLowerCase().includes(searchText.toLowerCase()) &&
        !selectedTagIds.includes(tag.id)
    )
    .sort(
      (a: Tag, b: Tag) =>
        (tagUsageCount[b.id] || 0) - (tagUsageCount[a.id] || 0)
    )
    .slice(0, 5); // Limit to 5 tags

  return (
    <View style={styles.container}>
      {/* Selected Tags Section */}
      <View style={styles.selectedTagsContainer}>
        {allTags
          .filter((tag: Tag) => selectedTagIds.includes(tag.id))
          .map((tag: Tag) => (
            <ProfileTag
              key={tag.id}
              tagId={tag.id}
              onPress={() => toggleTag(tag.id)}
              contactId=""
              canDelete={false}
            />
          ))}
      </View>

      {/* Search Container with Border */}
      <View
        style={[
          styles.searchContainer,
          {
            borderColor: theme.button,
            marginTop: selectedTagIds.length > 0 ? 10 : 0,
          },
        ]}
      >
        {/* Search Input */}
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search tags"
          placeholderTextColor={theme.text.muted}
          style={[styles.searchInput, { color: theme.text.full }]}
          returnKeyType="done"
          keyboardAppearance="dark"
          autoCapitalize="words"
        />

        {/* Filtered Tags Section */}
        <View style={styles.filteredTagsContainer}>
          {filteredTags.map((tag: Tag) => (
            <View key={tag.id}>
              <ProfileTag
                tagId={tag.id}
                onPress={() => toggleTag(tag.id)}
                contactId=""
                canDelete={false}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  selectedTagsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  searchContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    gap: 5,
  },
  searchInput: {
    width: "100%",
    color: "white",
    paddingVertical: 5,
  },
  filteredTagsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});
