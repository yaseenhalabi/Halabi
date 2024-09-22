import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import FontLoader from '../utils/FontLoader';
import ProviderAndPersistor from '../components/ProviderAndPersistor';
import { SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { Slot } from 'expo-router'
export default function Root() {
  const loaded = FontLoader();
  if (!loaded) return null;
  return (
    <ProviderAndPersistor>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <Slot/>
        </SafeAreaView>
      </SafeAreaProvider>
    </ProviderAndPersistor>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
