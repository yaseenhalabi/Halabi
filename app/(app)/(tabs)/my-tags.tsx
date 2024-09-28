import { View, Text, StyleSheet } from 'react-native';
import PageContainer from '../../../components/PageContainer';
export default function MyTags() {
  return (
    <PageContainer>
      <Text style={{color: "white"}}>TAGS</Text>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
