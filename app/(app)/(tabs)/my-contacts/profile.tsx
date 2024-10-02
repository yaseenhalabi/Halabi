import { View, TextInput, StyleSheet } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import CommonText from '../../../../components/CommonText';
import PageContainer from '../../../../components/PageContainer';
import { getContactById } from '../../../../utils/helpers';
import { useSelector } from 'react-redux';
export default function MyContacts() {

  const { id } : { id: string } = useLocalSearchParams();
  const contacts = useSelector((state: any) => state.contacts);
  const contact = getContactById(id, contacts);
  if (!contact) {
    return <PageContainer><CommonText>Contact not found</CommonText></PageContainer>
  }
  return (
    <PageContainer>
      <CommonText>{contact.name}</CommonText>
    </PageContainer>
  );
}

const styles = StyleSheet.create({

});
