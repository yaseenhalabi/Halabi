import { StyleSheet } from 'react-native';
import PageContainer from '../../../../components/PageContainer';
import SearchBar from '../../../../components/SearchBar';
import { useEffect, useState } from 'react';
import addIcon from '../../../../assets/images/add-icon-white.png';
import editIcon from '../../../../assets/images/edit-icon-white.png';
import filterIcon from '../../../../assets/images/filter-icon-white.png';
import EditButton from '../../../../components/EditButton';
import EditButtons from '../../../../components/EditButtons';
import ListOfContacts from '../../../../components/ListOfContacts';
import { getFilteredContacts } from '../../../../utils/helpers';
import { useSelector } from 'react-redux';
import { Contact, Tag } from '../../../../utils/types';
export default function MyContacts() {
  const [searchText, setSearchText] = useState('');
  const contacts = useSelector((state: any) => state.contacts);
  console.log(contacts[0].tags);
  const filteredContacts = getFilteredContacts(contacts, searchText);
  const onSearchTextChange = (text: string) => {
    setSearchText(text);
  }

  const placeholderfunction = () => {
    console.log('placeholder function');
  }
  return (
    <PageContainer style={styles.container}>
      <SearchBar onChangeText={onSearchTextChange} value={searchText}/>
      <EditButtons 
        editButton1={<EditButton text="Add Contact" onPress={placeholderfunction} source={addIcon}/>}
        editButton2={<EditButton text="Edit Contacts" onPress={placeholderfunction} source={editIcon}/>}
        editButton3={<EditButton text="Filter Contacts" onPress={placeholderfunction} source={filterIcon}/>}
      />
      <ListOfContacts contacts={filteredContacts}/>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
  }
});
