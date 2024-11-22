import { View, Text, StyleSheet } from 'react-native';
import PageContainer from '../../../../components/PageContainer';
import SearchBar from '../../../../components/SearchBar';
import { useState } from 'react';
import addIcon from '../../../../assets/images/add-icon-white.png';
import editIcon from '../../../../assets/images/edit-icon-white.png';
import filterIcon from '../../../../assets/images/filter-icon-white.png';
import EditButton from '../../../../components/EditButton';
import EditButtonsContainer from '../../../../components/EditButtonsContainer';
import ListOfTags from '../../../../components/tags screen/ListOfTags';
import { useSelector } from 'react-redux';
import { getFilteredTags } from '../../../../utils/helpers';
export default function MyTags() {
  const [searchText, setSearchText] = useState('');
  const tags = useSelector((state: any) => state.tags);
  const contacts = useSelector((state: any) => state.contacts);
  const filteredTags = getFilteredTags(tags, contacts, searchText);

  const onSearchTextChange = (text: string) => {
    setSearchText(text);
  }

  const placeholderfunction = () => {
    console.log('placeholder function');
  }

  return (
    <PageContainer style={styles.container}>
      <SearchBar onChangeText={onSearchTextChange} value={searchText} />
      <EditButtonsContainer 
        editButton1={<EditButton text="Add Tag" onPress={placeholderfunction} source={addIcon}/>}
        editButton2={<EditButton text="Edit Tags" onPress={placeholderfunction} source={editIcon}/>}
        editButton3={<EditButton text="Filter Tags" onPress={placeholderfunction} source={filterIcon}/>}
      />
      <ListOfTags tags={filteredTags} />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
  }
});
