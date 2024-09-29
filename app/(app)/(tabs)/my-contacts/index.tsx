import { View, Text, Button, StyleSheet } from 'react-native';
import CommonText from '../../../../components/CommonText';
import PageContainer from '../../../../components/PageContainer';
import { useNavigation } from 'expo-router';
export default function MyContacts() {
  const navigation = useNavigation();
  return (
    <PageContainer>
      <CommonText>CONTACTS</CommonText>
      <Button onPress={() => navigation.navigate('contact' as never)} title="Go to contact" />
    </PageContainer>
  );
}

const styles = StyleSheet.create({

});
