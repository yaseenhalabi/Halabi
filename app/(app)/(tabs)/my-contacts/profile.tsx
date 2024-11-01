import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { getContactById } from '../../../../utils/helpers';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateContact } from '../../../../redux/contactsSlice';
import { removeFormatting } from '../../../../utils/helpers';
import { Contact } from '../../../../utils/types';
import CommonText from '../../../../components/CommonText';
import PageContainer from '../../../../components/PageContainer';
import NameInput from '../../../../components/profile screen/NameInput';
import ProfileTags from '../../../../components/profile screen/ProfileTags';
import NotesInput from '../../../../components/profile screen/NotesInput';
import PhoneNumberInput from '../../../../components/profile screen/PhoneNumberInput';
import EmailInput from '../../../../components/profile screen/EmailInput';
import BirthdayInput from '../../../../components/profile screen/BirthdayInput';
import AddressInput from '../../../../components/profile screen/AddressInput';

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
      <BirthdayInput 
        birthday={contact.birthday}
        onChangeBirthday={(birthday) => {
          dispatch(updateContact({...contact, birthday}));
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
      <AddressInput
        address={contact.address || ''}
        onChangeAddress={ (address) => {
            dispatch(updateContact({...contact, address}));
          }
        }
      />
      {
      /* todo: add birthday input */
      /* todo: add phone number input */
      /* todo: add email number input */
      /* todo: add address input */
      /* todo: add social media input */
      /* todo: add contact buttons */
      }
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 300
  }
});
