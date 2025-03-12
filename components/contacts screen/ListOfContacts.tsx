import {
  View,
  Text,
  FlatList,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import ContactItem from "./ContactItem";
import { Contact } from "../../utils/types";
import getTheme from "../../utils/GetTheme";
import { useSelector } from "react-redux";
import { applyFilters } from "../../utils/helpers";
import CommonText from "../CommonText";
type ListOfContactsProps = {
  contacts: Contact[];
  onOverScrollTop: () => void;
  onOverScrollBottom: () => void;
  isSearching?: boolean;
};

export default function ListOfContacts({
  contacts,
  onOverScrollTop,
  onOverScrollBottom,
  isSearching,
}: ListOfContactsProps) {
  const theme = getTheme();
  const selectedContacts = useSelector(
    (state: any) => state.selection.selectedContacts
  );
  const selectedTagIds = useSelector(
    (state: any) => state.filter.selectedTagIds
  );
  const sortBy = useSelector((state: any) => state.filter.sortBy);

  // Apply filters and sorting
  const filteredAndSortedContacts = applyFilters(
    contacts,
    selectedTagIds,
    sortBy
  );
  if (filteredAndSortedContacts.length === 0) {
    return (
      <View
        style={{
          ...styles.noContactsFoundContainer,
          backgroundColor: theme.background,
        }}
      >
        <CommonText
          weight="light"
          size="medium"
          style={{ color: theme.text.muted, textAlign: "center" }}
        >
          No Contacts Found
        </CommonText>
      </View>
    );
  }

  // Opening search bar with scroll detection
  const onScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (event.nativeEvent.contentOffset.y < -10) {
      onOverScrollTop();
    }
    if (event.nativeEvent.contentOffset.y > 10) {
      onOverScrollBottom();
    }
  };

  return (
    <FlatList
      data={filteredAndSortedContacts}
      keyboardShouldPersistTaps="handled"
      style={{ ...styles.container, backgroundColor: theme.background }}
      renderItem={({ item }) => (
        <ContactItem
          contact={item}
          isSelected={selectedContacts.indexOf(item.id) !== -1}
          isHighlighted={
            isSearching && item.id == filteredAndSortedContacts[0].id
          }
        />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 5, paddingBottom: 100 }}
      onScrollEndDrag={(event) => onScrollEndDrag(event)}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "10%",
  },
  noContactsFoundContainer: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
