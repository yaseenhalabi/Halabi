import {
  View,
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import ContactItem from "./ContactItem";
import { Contact } from "../../utils/types";
import getTheme from "../../utils/GetTheme";
import { useDispatch, useSelector } from "react-redux";
import { applyFilters, createNewContactWithName } from "../../utils/helpers";
import { addContact } from "../../redux/contactsSlice";
import CommonText from "../CommonText";
import { router } from "expo-router";
type ListOfContactsProps = {
  contacts: Contact[];
  onOverScrollTop: () => void;
  onOverScrollBottom: () => void;
  isSearching?: boolean;
  searchQuery?: string;
};

export default function ListOfContacts({
  contacts,
  onOverScrollTop,
  onOverScrollBottom,
  isSearching,
  searchQuery,
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

  const dispatch = useDispatch();

  const noContactFound = filteredAndSortedContacts.length === 0;

  const addThisContact = (name: string) => {
    const new_contact = createNewContactWithName(name);
    dispatch(addContact(new_contact));
    router.push({
      pathname: "/my-contacts/profile",
      params: { id: new_contact.id },
    });
  };

  if (noContactFound) {
    return (
      <>
        {searchQuery && (
          <TouchableOpacity
            onPress={() => addThisContact(searchQuery)}
            style={{ width: "100%" }}
          >
            <View
              style={[
                styles.addNewContactButton,
                { backgroundColor: theme.backgroundSecondary },
              ]}
            >
              <CommonText>Add new contact "{searchQuery}"</CommonText>
            </View>
          </TouchableOpacity>
        )}
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
      </>
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
    <View style={styles.container}>
      <FlashList
        data={filteredAndSortedContacts}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }: { item: Contact }) => (
          <ContactItem
            contact={item}
            isSelected={selectedContacts.indexOf(item.id) !== -1}
            isHighlighted={
              isSearching && item.id == filteredAndSortedContacts[0].id
            }
          />
        )}
        keyExtractor={(item: Contact) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        onScrollEndDrag={(event: NativeSyntheticEvent<NativeScrollEvent>) => onScrollEndDrag(event)}
        estimatedItemSize={70}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  noContactsFoundContainer: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addNewContactButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    marginTop: 10,
  },
});
