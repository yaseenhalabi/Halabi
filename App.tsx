import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CustomText from './components/CustomText';
import FontLoader from './utils/FontLoader';
export default function App() {
  const loaded = FontLoader();
  
  if (!loaded) return null;

  return (
    <View style={styles.container}>
      <CustomText size='large' style='bold'>Hello, world!</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
