import { View, TextInput, StyleSheet } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import CommonText from '../../../../components/CommonText';
import PageContainer from '../../../../components/PageContainer';
import { getContactById } from '../../../../utils/helpers';
import { useSelector } from 'react-redux';
import NameInput from '../../../../components/profile screen/NameInput';
import { useDispatch } from 'react-redux';
import { updateContact } from '../../../../redux/contactsSlice';
import ProfileTags from '../../../../components/profile screen/ProfileTags';
import { Contact } from '../../../../utils/types';
import NotesInput from '../../../../components/profile screen/NotesInput';
import PhoneNumberInput from '../../../../components/profile screen/PhoneNumberInput';
import { removeFormatting } from '../../../../utils/helpers';
import EmailInput from '../../../../components/profile screen/EmailInput';
export default function Profile() {
  const dispatch = useDispatch();
  const { id } : { id: string } = useLocalSearchParams();
  const contacts: Contact[] = useSelector((state: any) => state.contacts);
  const contact: Contact | undefined = getContactById(id, contacts);

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
      <NotesInput 
        value={contact.notes || ''} 
        onChangeText={(text) => {
          dispatch(updateContact({...contact, notes: text}));
        }} 
      />
      <PhoneNumberInput 
        countryCode={contact.phone?.countryCode || ''}
        onChangeCountryCode={(countryCode) => {
          dispatch(updateContact({...contact, phone: {id: contact.phone?.id || '', countryCode, number: contact.phone?.number || ''}}));
        }}
        value={contact.phone?.number || ''} 
        onChangeText={(text) => {
          dispatch(updateContact({...contact, phone: {id: contact.phone?.id || '', countryCode: contact.phone?.countryCode || '', number: removeFormatting(text)} }));
        }} 
      />
      <EmailInput 
        value={contact.email || ''} 
        onChangeText={(text) => {
          dispatch(updateContact({...contact, email: text}));
        }}
      />
      {
      /* TODO: Add birthday input */
      /* TODO: Add phone number input */
      /* TODO: Add email number input */
      /* TODO: Add address input */
      /* TODO: Add social media input */
      /* TODO: Add contact buttons */
      }
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  }
});