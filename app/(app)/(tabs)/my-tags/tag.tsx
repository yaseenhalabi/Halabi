import { View, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { updateTag } from '../../../../redux/tagsSlice';
import { getTagById, getContactsWithTag } from '../../../../utils/helpers';
import { Tag, Contact } from '../../../../utils/types';
import CommonText from '../../../../components/CommonText';
import PageContainer from '../../../../components/PageContainer';
import NameInput from '../../../../components/profile screen/NameInput';
import ListOfContacts from '../../../../components/contacts screen/ListOfContacts';
import ContactItem from '../../../../components/contacts screen/ContactItem';

export default function TagScreen() {
  const dispatch = useDispatch();
  const { id }: { id: string } = useLocalSearchParams();
  const tags: Tag[] = useSelector((state: any) => state.tags);
  const contacts: Contact[] = useSelector((state: any) => state.contacts);
  const tag: Tag | undefined = getTagById(id, tags);

  if (!tag) {
    return <PageContainer><CommonText>Tag not found</CommonText></PageContainer>
  }

  const contactsWithTag = getContactsWithTag(tag, contacts);

  return (
    <PageContainer style={styles.container}>
      <NameInput 
        onChangeText={(text) => {
          dispatch(updateTag({ ...tag, name: text }));
        }} 
        value={tag.name} 
      />
      <View style={{width: '100%'}}>
        <CommonText color='semi'>{contactsWithTag.length > 0 ? "Contacts with this tag:" : "No contacts with this tag"}</CommonText>
      </View>

      <FlatList
        style={{ width: '100%' }}
        data={contactsWithTag}
        renderItem={({ item }) => <ContactItem contact={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 5, paddingBottom: 100 }}
      />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    width: '100%',
    height: '10%',
    gap: 10,
    
  }
}); 