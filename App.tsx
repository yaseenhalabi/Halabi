import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import CommonText from './components/CommonText';
import FontLoader from './utils/FontLoader';
import ProviderAndPersistor from './redux/ProviderAndPersistor';
import Onboarding from './components/Onboarding';
import { SafeAreaProvider} from 'react-native-safe-area-context';
export default function App() {
  const loaded = FontLoader();
  if (!loaded) return null;
  
  const firstLaunch = false;
  if (firstLaunch) return <Onboarding />;
  return (
    <ProviderAndPersistor>
      <SafeAreaProvider>
        <View style={styles.container}>
        </View>
      </SafeAreaProvider>
    </ProviderAndPersistor>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
