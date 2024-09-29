import { View, Text, Button, StyleSheet } from 'react-native';
import CommonText from '../../../../components/CommonText';
import PageContainer from '../../../../components/PageContainer';
import { useNavigation } from 'expo-router';
import SearchBar from '../../../../components/SearchBar';
import { useState } from 'react';

export default function MyContacts() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const onSearchTextChange = (text: string) => {
    setSearchText(text);
  }
  return (
    <PageContainer style={styles.container}>
      <SearchBar onChangeText={onSearchTextChange} value={searchText}/>
      <Button onPress={() => navigation.navigate('contact' as never)} title="Go to contact" />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
  }
});
