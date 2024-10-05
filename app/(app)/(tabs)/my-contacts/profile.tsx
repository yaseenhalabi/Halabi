import { View, TextInput, StyleSheet } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import CommonText from '../../../../components/CommonText';
import PageContainer from '../../../../components/PageContainer';
import { getContactById } from '../../../../utils/helpers';
import { useSelector } from 'react-redux';
import NameInput from '../../../../components/profile/NameInput';
import { useDispatch } from 'react-redux';
import { updateContact } from '../../../../redux/contactsSlice';
import ProfileTags from '../../../../components/profile/ProfileTags';
export default function MyContacts() {
  const dispatch = useDispatch();

  const { id } : { id: string } = useLocalSearchParams();
  const contacts = useSelector((state: any) => state.contacts);
  const contact = getContactById(id, contacts);
  if (!contact) {
    return <PageContainer><CommonText>Contact not found</CommonText></PageContainer>
  }
  
  return (
    <PageContainer style={styles.container} scrollEnabled>
      <NameInput 
        onChangeText={(text) => {
          dispatch(updateContact({...contact, name: text}));
        }} 
        value={contact.name} 
      />

      <ProfileTags tagIds={contact.tags} contactId={contact.id} />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    gap: 5,
  }
});