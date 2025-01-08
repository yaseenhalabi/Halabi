import { View, Text, StyleSheet, Alert } from 'react-native';
import PageContainer from '../../../../components/PageContainer';
import SearchBar from '../../../../components/SearchBar';
import { useEffect, useState } from 'react';
import addIcon from '../../../../assets/images/add-icon-white.png';
import blackAddIcon from '../../../../assets/images/add-icon-black.png';
import editIcon from '../../../../assets/images/edit-icon-white.png';
import blackEditIcon from '../../../../assets/images/edit-icon-black.png';
import filterIcon from '../../../../assets/images/filter-icon-white.png';
import blackFilterIcon from '../../../../assets/images/filter-icon-black.png';
import EditButton from '../../../../components/EditButton';
import EditButtonsContainer from '../../../../components/EditButtonsContainer';
import ListOfTags from '../../../../components/tags screen/ListOfTags';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredTags } from '../../../../utils/helpers';
import AddTagInput from '../../../../components/tags screen/AddTagInput';
import EditTags from '../../../../components/tags screen/EditTags';
import FilterTags from '../../../../components/tags screen/FilterTags';
import { deleteSelectedTags } from '../../../../redux/tagsSlice';
import { resetSelectedTags, setTagsSelectionMode } from '../../../../redux/selectTagsSlice';
import getTheme from '../../../../utils/GetTheme';
import { deleteSelectedTagsFromContacts } from '../../../../redux/contactsSlice';

export default function MyTags() {
  const [searchText, setSearchText] = useState('');
  const tags = useSelector((state: any) => state.tags);
  const contacts = useSelector((state: any) => state.contacts);
  const sortBy = useSelector((state: any) => state.filterTags.sortBy);
  const isReversed = useSelector((state: any) => state.filterTags.reverse);
  const filteredTags = getFilteredTags(tags, contacts, searchText, sortBy, isReversed);
  const inTagSelectionMode = useSelector((state: any) => state.tagSelection.tagsSelectionMode);

  const dispatch = useDispatch();
  type modes = "default" | "edit" | "filter" | "add";
  const [editButtonsMode, setEditButtonsMode] = useState<modes>("default");
  useEffect(() => {
    if (inTagSelectionMode) {
      setEditButtonsMode("edit");
    }
  }, [inTagSelectionMode]);
  const onSearchTextChange = (text: string) => {
    setSearchText(text);
  }

  const endEditing = () => {
    setEditButtonsMode("default");
    dispatch(resetSelectedTags());
    dispatch(setTagsSelectionMode(false));
  }

  const onAddTag = () => {
    setEditButtonsMode("add");
  }

  const onEditTags = () => {
    setEditButtonsMode("edit");
    dispatch(setTagsSelectionMode(true)); 
  }

  const onFilterTags = () => {
    setEditButtonsMode("filter");
  }

  const selectedTagIds = useSelector((state: any) => state.tagSelection.selectedTags);
  const trashTags = () => {
    const numberOfSelectedTags = selectedTagIds.length;
    Alert.alert(
      'Delete Tags',
      `Are you sure you want to delete ${numberOfSelectedTags} tags?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
            dispatch(deleteSelectedTags(selectedTagIds));
            dispatch(deleteSelectedTagsFromContacts(selectedTagIds));
            dispatch(resetSelectedTags());
            endEditing();
          }
        },
      ],
      { cancelable: true }
    );
  };

  const activeFiltersCount = (sortBy ? 1 : 0) + (isReversed ? 1 : 0);
  const theme = getTheme();

  return (
    <PageContainer style={styles.container}>
      <SearchBar onChangeText={onSearchTextChange} value={searchText} />
      {editButtonsMode === "default" && (
        <EditButtonsContainer 
          editButton1={<EditButton text="Add Tag" onPress={onAddTag} source={theme.name === "dark" ? addIcon : blackAddIcon}/>} 
          editButton2={<EditButton text="Edit Tags" onPress={onEditTags} source={theme.name === "dark" ? editIcon : blackEditIcon}/>} 
          editButton3={<EditButton text="Filter Tags" onPress={onFilterTags} source={theme.name === "dark" ? filterIcon : blackFilterIcon} badgeCount={activeFiltersCount}/>} 
        />
      )}
      {editButtonsMode === "add" && <AddTagInput endEditing={endEditing} />}
      {editButtonsMode === "edit" && <EditTags endEditing={endEditing} trashTags={trashTags} />}
      {editButtonsMode === "filter" && <FilterTags endEditing={endEditing} />}
      <ListOfTags tags={filteredTags} />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
  }
});
