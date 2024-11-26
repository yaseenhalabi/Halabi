import { StyleSheet } from 'react-native';
import PageContainer from '../../../../components/PageContainer';
import SearchBar from '../../../../components/SearchBar';
import { useEffect, useState } from 'react';
import addIcon from '../../../../assets/images/add-icon-white.png';
import editIcon from '../../../../assets/images/edit-icon-white.png';
import filterIcon from '../../../../assets/images/filter-icon-white.png';
import EditButton from '../../../../components/EditButton';
import EditButtonsContainer from '../../../../components/EditButtonsContainer';
import ListOfContacts from '../../../../components/contacts screen/ListOfContacts';
import { getFilteredContacts } from '../../../../utils/helpers';
import { useSelector } from 'react-redux';
import { Contact, Tag } from '../../../../utils/types';
import AddContactInput from '../../../../components/contacts screen/AddContactInput';

export default function MyContacts() {
  const [searchText, setSearchText] = useState('');
  const contacts: Contact[] = useSelector((state: any) => state.contacts);
  const filteredContacts: Contact[] = getFilteredContacts(contacts, searchText);
  const onSearchTextChange = (text: string) => {
    setSearchText(text);
  }

  const placeholderfunction = () => {
    console.log('placeholder function')
  }
  type modes = "default" | "edit" | "filter" | "add";
  const [editButtonsMode, setEditButtonsMode] = useState<modes>("default");

  const onAddNameConfirm = () => {
    setEditButtonsMode("default");
  }

  const onAddNameCancel = () => {
    setEditButtonsMode("default");
  }
  return (
    <PageContainer style={styles.container}>
      <SearchBar onChangeText={onSearchTextChange} value={searchText}/>
      {
        editButtonsMode === "default" &&
        <EditButtonsContainer 
          editButton1={<EditButton text="Add Contact" onPress={() => setEditButtonsMode("add")} source={addIcon}/>}
          editButton2={<EditButton text="Edit Contacts" onPress={placeholderfunction} source={editIcon}/>}
          editButton3={<EditButton text="Filter Contacts" onPress={placeholderfunction} source={filterIcon}/>}
        />
      }
      {
        editButtonsMode === "add" &&
        <AddContactInput onConfirm={onAddNameConfirm} onCancel={onAddNameCancel}/>
      }
      {
        // editButtonsMode === "filter" &&
      }
      {
        // editButtonsMode === "add" &&
      }
      <ListOfContacts contacts={filteredContacts}/>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
  }
});
