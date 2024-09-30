import { View, Text, Button, StyleSheet } from 'react-native';
import CommonText from '../../../../components/CommonText';
import PageContainer from '../../../../components/PageContainer';
import { useNavigation } from 'expo-router';
import SearchBar from '../../../../components/SearchBar';
import { useState } from 'react';
import addIcon from '../../../../assets/images/add-icon-white.png';
import editIcon from '../../../../assets/images/edit-icon-white.png';
import filterIcon from '../../../../assets/images/filter-icon-white.png';
import EditButton from '../../../../components/EditButton';
import EditButtons from '../../../../components/EditButtons';
export default function MyContacts() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

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
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
  }
});
