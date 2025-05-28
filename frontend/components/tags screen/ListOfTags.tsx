import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import { Tag } from "../../utils/types";
import getTheme from "../../utils/GetTheme";
import TagItem from "./TagItem";
import { getContactsWithTag } from "../../utils/helpers";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import CommonText from "../CommonText";

type ListOfTagsProps = {
  tags: Tag[];
  onOverScrollTop: () => void;
  onOverScrollBottom?: () => void; // <-- New optional prop
  isSearching?: boolean; // <-- New optional prop
};

const SCROLL_THRESHOLD = 1;
export default function ListOfTags({
  tags,
  onOverScrollTop,
  onOverScrollBottom,
  isSearching,
}: ListOfTagsProps) {
  const contacts = useSelector((state: any) => state.contacts);
  const theme = getTheme();
  const router = useRouter();

  const handleTagPress = (tagId: string) => {
    router.push({ pathname: "/my-tags/tag", params: { id: tagId } });
  };

  if (tags.length === 0) {
    return (
      <View
        style={{
          ...styles.noTagsFoundContainer,
          backgroundColor: theme.background,
        }}
      >
        <CommonText
          weight="light"
          size="medium"
          style={{ color: theme.text.muted, textAlign: "center" }}
        >
          No Tags Found
        </CommonText>
      </View>
    );
  }

  // Over-scroll detection for top & bottom
  const onScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY < -SCROLL_THRESHOLD) {
      onOverScrollTop();
    }
    if (onOverScrollBottom && offsetY > SCROLL_THRESHOLD) {
      onOverScrollBottom();
    }
  };

  return (
    <FlatList
      data={tags}
      style={{ ...styles.container, backgroundColor: theme.background }}
      renderItem={({ item }) => {
        // highlight first item if searching & it's the top item:
        const isFirstItem = tags.length > 0 && item.id === tags[0].id;
        return (
          <TagItem
            tag={item}
            contactsWithTag={getContactsWithTag(item, contacts)}
            onPress={() => handleTagPress(item.id)}
            isHighlighted={isSearching && isFirstItem}
          />
        );
      }}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 5, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
      onScrollEndDrag={onScrollEndDrag}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: "10%",
    width: "100%",
  },
  noTagsFoundContainer: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
