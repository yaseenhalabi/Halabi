import { Alert, StyleSheet } from "react-native";
import PageContainer from "../../../../components/PageContainer";
import SearchBar from "../../../../components/SearchBar";
import { useEffect, useState, useRef, useCallback } from "react";
import addIcon from "../../../../assets/images/add-icon-white.png";
import blackAddIcon from "../../../../assets/images/add-icon-black.png";
import editIcon from "../../../../assets/images/edit-icon-white.png";
import blackEditIcon from "../../../../assets/images/edit-icon-black.png";
import filterIcon from "../../../../assets/images/filter-icon-white.png";
import blackFilterIcon from "../../../../assets/images/filter-icon-black.png";
import EditButton from "../../../../components/EditButton";
import EditButtonsContainer from "../../../../components/EditButtonsContainer";
import ListOfContacts from "../../../../components/contacts screen/ListOfContacts";
import { getFilteredContacts } from "../../../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { Contact, Tag } from "../../../../utils/types";
import AddContactInput from "../../../../components/contacts screen/AddContactInput";
import EditContact from "../../../../components/contacts screen/EditContacts";
import FilterContacts from "../../../../components/contacts screen/FilterContacts";
import AddContactButton from "../../../../components/AddContactButton";
import getTheme from "../../../../utils/GetTheme";

export default function MyContacts() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const contacts: Contact[] = useSelector((state: any) => state.contacts);
  const filteredContacts: Contact[] = getFilteredContacts(contacts, searchText);
  const inEditMode: boolean = useSelector(
    (state: any) => state.selection.contactsSelectionMode
  );

  useEffect(() => {
    if (inEditMode) {
      setEditButtonsMode("edit");
    }
  }, [inEditMode]);

  const selectedContacts: string[] = useSelector(
    (state: any) => state.selection.selectedContacts
  );

  type modes = "default" | "edit" | "filter" | "add";
  const [editButtonsMode, setEditButtonsMode] = useState<modes>("default");

  const endEditing = () => {
    setEditButtonsMode("default");
    dispatch({ type: "selection/resetSelectedContacts" });
  };

  const onEditContacts = () => {
    setEditButtonsMode("edit");
    dispatch({ type: "selection/setContactsSelectionMode", payload: true });
  };

  // because edit mode can be set by an individual contact

  const trashContacts = () => {
    Alert.alert(
      "Confirm", // Message of the alert
      `Are you sure you want to delete ${selectedContacts.length} contact${
        selectedContacts.length > 1 ? "s" : ""
      }?`, // Title of the alert
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel", // iOS-specific style for cancel button
        },
        {
          text: "Yes",
          onPress: () => {
            dispatch({
              type: "contacts/deleteSelectedContacts",
              payload: selectedContacts,
            });
            dispatch({ type: "selection/resetSelectedContacts" });
            setEditButtonsMode("default");
          },
        },
      ],
      { cancelable: true } // Dismiss the alert by tapping outside
    );
  };

  const onFilterContacts = () => {
    setEditButtonsMode("filter");
  };

  const selectedTagIds = useSelector(
    (state: any) => state.filter.selectedTagIds
  );
  const sortBy = useSelector((state: any) => state.filter.sortBy);
  const filterCount = selectedTagIds.length + (sortBy ? 1 : 0);

  const theme = getTheme();

  // Search bar ref logic
  const searchBarRef = useRef<any>(null);

  const onSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  // Example of focusing from the parent
  const focusSearchInput = () => {
    // The parent can call focus on the child's TextInput
    searchBarRef.current?.focus();
  };
  const blurSearchInput = () => {
    // The parent can call focus on the child's TextInput
    searchBarRef.current?.blur();
  };

  return (
    <PageContainer style={styles.container}>
      <AddContactButton
        onPress={() => setEditButtonsMode("add")}
        disabled={editButtonsMode !== "default"}
      />
      <SearchBar
        onChangeText={onSearchTextChange}
        value={searchText}
        selectedItemRoutingInfo={
          searchText && filteredContacts[0]
            ? {
                pathName: "my-contacts/profile",
                id: filteredContacts[0]?.id || "",
              }
            : undefined
        }
        ref={searchBarRef}
      />
      {editButtonsMode === "default" && (
        <EditButtonsContainer
          editButton1={
            <EditButton
              text="Add Contact"
              onPress={() => setEditButtonsMode("add")}
              source={theme.name === "dark" ? addIcon : blackAddIcon}
            />
          }
          editButton2={
            <EditButton
              text="Edit Contacts"
              onPress={onEditContacts}
              source={theme.name === "dark" ? editIcon : blackEditIcon}
            />
          }
          editButton3={
            <EditButton
              text="Filter Contacts"
              onPress={onFilterContacts}
              source={theme.name === "dark" ? filterIcon : blackFilterIcon}
              badgeCount={filterCount}
            />
          }
        />
      )}
      {editButtonsMode === "add" && <AddContactInput endEditing={endEditing} />}
      {editButtonsMode === "filter" && (
        <FilterContacts endEditing={endEditing} />
      )}
      {editButtonsMode === "edit" && (
        <EditContact endEditing={endEditing} trashContacts={trashContacts} />
      )}
      <ListOfContacts
        contacts={filteredContacts}
        onOverScrollTop={focusSearchInput}
        onOverScrollBottom={blurSearchInput}
        isSearching={searchText.length > 0}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
});
